import { UniqueEntityID } from "@/core/entities/unique-entity-id"
import { Answer } from "../../enterprise/entities/answer"
import { AnswerRepository } from "../repositories/answer-repository"
import { Question } from "../../enterprise/entities/question"
import { QuestionRepository } from "../repositories/question-repository"

interface ChooseQuestionBestAnswerUseCaseRequest{
    authorId: string
    answerId: string
}

interface ChooseQuestionBestAnswerUseCaseResponse{
question: Question}

export class ChooseQuestionBestAnswerUseCase{

    constructor(
        private questionRepository: QuestionRepository,
        private answerRepository: AnswerRepository
        ){}

    async execute({
        authorId,
        answerId,
    }: ChooseQuestionBestAnswerUseCaseRequest): Promise<ChooseQuestionBestAnswerUseCaseResponse>{

        const answer =  await this.answerRepository.findById(answerId)

        if(!answer){
            throw new Error('Answer not found')
        }

        const question = await this.questionRepository.findById(answer.questionId.toValue())

        if(!question){
            throw new Error('Question not found')
        }

        if(authorId !== question.authorId.toString()){
            throw new Error('Not allowed')
        }

        question.bestAnswerId = answer.id

        await this.questionRepository.save(question)

        return{
            question
        }

    }
}