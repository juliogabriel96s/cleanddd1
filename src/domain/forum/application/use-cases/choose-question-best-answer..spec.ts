import {expect} from 'vitest'
import { InMemoryAnswerRepository } from 'test/repositories/in-memory-answer-repository'
import { makeAnswer } from 'test/factores/make-answer'
import { DeleteAnswerUseCase } from './delete-answer'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { InMemoryQuestionRepository } from 'test/repositories/in-memory-question-repository'
import { ChooseQuestionBestAnswerUseCase } from './choose-question-best-answer'
import { makeQuestion } from 'test/factores/make-question'

let inMemoryQuestionRepository: InMemoryQuestionRepository
let inMemoryAnswerRepository: InMemoryAnswerRepository
let sut: ChooseQuestionBestAnswerUseCase

describe("Choose question best answer", () =>{

beforeEach(() =>{
inMemoryQuestionRepository = new InMemoryQuestionRepository()
inMemoryAnswerRepository =  new InMemoryAnswerRepository()
sut =  new ChooseQuestionBestAnswerUseCase(inMemoryQuestionRepository, inMemoryAnswerRepository)
})

    it('should be able to choose the question best answer', async () =>{   
const question = makeQuestion()
const answer = makeAnswer({
    questionId: question.id
})
      
        await inMemoryQuestionRepository.create(question)
       await inMemoryAnswerRepository.create(answer)
        
           await sut.execute({
         answerId: answer.id.toString(),
         authorId: question.authorId.toString()
        })
    
        expect(inMemoryQuestionRepository.items[0].bestAnswerId).toEqual(answer.id)
    })

    it('should not be able to choose another user question best answer', async () =>{   

        const question = makeQuestion({
            authorId: new UniqueEntityID('author-1')
        })
const answer = makeAnswer({
    questionId: question.id
})
      
        await inMemoryQuestionRepository.create(question)
       await inMemoryAnswerRepository.create(answer)
        
    
        expect(() => {
            return  sut.execute({
                answerId: answer.id.toString(),
                authorId: 'author-2'
               })
        }).rejects.toBeInstanceOf(Error)
    
    })
})

