import {expect} from 'vitest'
import { InMemoryQuestionRepository } from 'test/repositories/in-memory-question-repository'
import { makeQuestion } from 'test/factores/make-question'
import { EditQuestionUseCase } from './edit-question'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

let inMemoryQuestionRepository: InMemoryQuestionRepository
let sut: EditQuestionUseCase

describe("Edit question", () =>{

beforeEach(() =>{
inMemoryQuestionRepository = new InMemoryQuestionRepository()
sut = new EditQuestionUseCase(inMemoryQuestionRepository)
})

    it('should be able to edit a question', async () =>{   

        const newQuestion = makeQuestion({
            authorId: new UniqueEntityID('author-1')
        }, new UniqueEntityID('question-1'))
        
        inMemoryQuestionRepository.create(newQuestion)
        
           await sut.execute({
            questionId: newQuestion.id.toValue(),
         authorId: 'author-1',
         title: 'pergunta teste',
         content: 'conteudo teste'
        })
    
        expect(inMemoryQuestionRepository.items[0]).toMatchObject({
            title: 'pergunta teste',
         content: 'conteudo teste'
        })
    })

    it('should not be able to edit a question from another use', async () =>{   

        const newQuestion = makeQuestion({
            authorId: new UniqueEntityID('author-1')
        }, new UniqueEntityID('question-1'))
        
        inMemoryQuestionRepository.create(newQuestion)
        
        expect(() => {
            return  sut.execute({
                questionId: newQuestion.id.toValue(),
         authorId: 'author-2',
         title: 'pergunta teste',
         content: 'conteudo teste'
               })
        }).rejects.toBeInstanceOf(Error)
    
    })
})

