import {expect} from 'vitest'
import { CreateQuestionUseCase } from './create-question'
import { InMemoryQuestionRepository } from 'test/repositories/in-memory-question-repository'

let inMemoryQuestionRepository: InMemoryQuestionRepository
let sut: CreateQuestionUseCase

describe("create question", () =>{

beforeEach(() =>{
inMemoryQuestionRepository =  new InMemoryQuestionRepository()
sut =  new CreateQuestionUseCase(inMemoryQuestionRepository)
})

    it('should be able to create a question', async () =>{    
        const {question} = await sut.execute({
          authorId: '1',
          title: 'new question',
        content: 'conteudo da pergunta'
        })
    
        expect(question.id).toBeTruthy()
    })
})

