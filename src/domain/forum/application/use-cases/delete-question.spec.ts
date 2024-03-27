import {expect} from 'vitest'
import { InMemoryQuestionRepository } from 'test/repositories/in-memory-question-repository'
import { GetQuestionBySlugUseCase } from './get-question-by-slug'
import { makeQuestion } from 'test/factores/make-question'
import { Slug } from '../../enterprise/entities/value-objects/slug'
import { DeleteQuestionUseCase } from './delete-question'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

let inMemoryQuestionRepository: InMemoryQuestionRepository
let sut: DeleteQuestionUseCase

describe("Delete question", () =>{

beforeEach(() =>{
inMemoryQuestionRepository =  new InMemoryQuestionRepository()
sut =  new DeleteQuestionUseCase(inMemoryQuestionRepository)
})

    it('should be able to delete a question', async () =>{   

        const newQuestion = makeQuestion({
            authorId: new UniqueEntityID('author-1')
        }, new UniqueEntityID('question-1'))
        
        inMemoryQuestionRepository.create(newQuestion)
        
           await sut.execute({
         questionId: 'question-1',
         authorId: 'author-1'
        })
    
        expect(inMemoryQuestionRepository.items).toHaveLength(0)
    })

    it('should not be able to delete a question from another use', async () =>{   

        const newQuestion = makeQuestion({
            authorId: new UniqueEntityID('author-1')
        }, new UniqueEntityID('question-1'))
        
        inMemoryQuestionRepository.create(newQuestion)
        
        expect(() => {
            return  sut.execute({
                questionId: 'question-1',
                authorId: 'author-2'
               })
        }).rejects.toBeInstanceOf(Error)
    
    })
})

