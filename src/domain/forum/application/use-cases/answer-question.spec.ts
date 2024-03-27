import {expect} from 'vitest'
import { CreateQuestionUseCase } from './create-question'
import { InMemoryQuestionRepository } from 'test/repositories/in-memory-question-repository'
import { InMemoryAnswerRepository } from 'test/repositories/in-memory-answer-repository'
import { AnswerQuestionUseCase } from './answer-question'

let inMemoryAnswerRepository: InMemoryAnswerRepository
let sut: AnswerQuestionUseCase

describe("create answer", () =>{

beforeEach(() =>{
inMemoryAnswerRepository =  new InMemoryAnswerRepository()
sut =  new AnswerQuestionUseCase(inMemoryAnswerRepository)
})

    it('should be able to create a answer', async () =>{    
        const {answer} = await sut.execute({
          questionId: '1',
          instructorId: '1',
        content: 'conteudo da resposta'
        })
    
        expect(answer.id).toBeTruthy()
        expect(inMemoryAnswerRepository.items[0].id).toEqual(answer.id)
    })
})