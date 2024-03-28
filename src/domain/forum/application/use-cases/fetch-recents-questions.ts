import { UniqueEntityID } from "@/core/entities/unique-entity-id"
import { Question } from "../../enterprise/entities/question"
import { QuestionRepository } from "../repositories/question-repository"

interface FetchRecentsQuestionsUseCaseRequest{
    page: number
}

interface FetchRecentsQuestionsUseCaseResponse{
questions: Question[]
}

export class FetchRecentsQuestionsUseCase{

    constructor(private questionRepository: QuestionRepository){}

    async execute({
        page
    }: FetchRecentsQuestionsUseCaseRequest):Promise<FetchRecentsQuestionsUseCaseResponse>{
      const questions = await this.questionRepository.findManyRecent({page})
     
      return{
        questions
      }
    }
}