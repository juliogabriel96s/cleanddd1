import {expect} from 'vitest'
import { InMemoryAnswerRepository } from 'test/repositories/in-memory-answer-repository'
import { makeAnswer } from 'test/factores/make-answer'
import { EditAnswerUseCase } from './edit-answer'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

let inMemoryAnswerRepository: InMemoryAnswerRepository
let sut: EditAnswerUseCase

describe("Edit answer", () =>{

beforeEach(() =>{
inMemoryAnswerRepository = new InMemoryAnswerRepository()
sut = new EditAnswerUseCase(inMemoryAnswerRepository)
})

    it('should be able to edit a answer', async () =>{   

        const newAnswer = makeAnswer({
            authorId: new UniqueEntityID('author-1')
        }, new UniqueEntityID('answer-1'))
        
        inMemoryAnswerRepository.create(newAnswer)
        
           await sut.execute({
            answerId: newAnswer.id.toValue(),
         authorId: 'author-1',
         content: 'conteudo teste'
        })
    
        expect(inMemoryAnswerRepository.items[0]).toMatchObject({
         content: 'conteudo teste'
        })
    })

    it('should not be able to edit a answer from another use', async () =>{   

        const newAnswer = makeAnswer({
            authorId: new UniqueEntityID('author-1')
        }, new UniqueEntityID('answer-1'))
        
        inMemoryAnswerRepository.create(newAnswer)
        
        expect(() => {
            return  sut.execute({
                answerId: newAnswer.id.toValue(),
         authorId: 'author-2',
         content: 'conteudo teste'
               })
        }).rejects.toBeInstanceOf(Error)
    
    })
})

