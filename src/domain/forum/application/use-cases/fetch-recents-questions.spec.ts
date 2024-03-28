import {expect} from 'vitest'
import { InMemoryQuestionRepository } from 'test/repositories/in-memory-question-repository'
import { makeQuestion } from 'test/factores/make-question'
import { FetchRecentsQuestionsUseCase } from './fetch-recents-questions'

let inMemoryQuestionRepository: InMemoryQuestionRepository
let sut: FetchRecentsQuestionsUseCase

describe("Fetch recents question", () =>{

beforeEach(() =>{
inMemoryQuestionRepository =  new InMemoryQuestionRepository()
sut =  new FetchRecentsQuestionsUseCase(inMemoryQuestionRepository)
})

    it('should be able to fetch recents question', async () =>{   
      await inMemoryQuestionRepository.create(makeQuestion({createdAt: new Date(2022, 0 , 20)}),)
      await inMemoryQuestionRepository.create(makeQuestion({createdAt: new Date(2022, 0 , 18)}),)
      await inMemoryQuestionRepository.create(makeQuestion({createdAt: new Date(2022, 0 , 23)}),)

      const {questions} =  await sut.execute({
        page: 1
      })

      expect(questions).toEqual([
        expect.objectContaining({createdAt: new Date(2022, 0 , 23)}),
        expect.objectContaining({createdAt: new Date(2022, 0 , 20)}),
        expect.objectContaining({createdAt: new Date(2022, 0 , 18)})


      ])

    })
})

