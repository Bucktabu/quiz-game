import { CreatedQuestions } from "../../src/modules/questions/api/view/created-questions";
import { CreateQuestionDto } from "../../src/modules/questions/api/dto/create-question.dto";
import { faker } from "@faker-js/faker";
import { Questions } from "./request/questions";
import { preparedSuperUser } from "./prepeared-data/prepared-super-user";
import {preparedQuestions} from "./prepeared-data/prepared-questions";
import {HttpStatus} from "@nestjs/common";

export class QuestionsFactories {
  constructor(private questions: Questions) {}

  getErrorsMessage(fields: string[]) {
    const errorsMessages = [];

    for (let i = 0, length = fields.length; i < length; i++) {
      errorsMessages.push({
        message: expect.any(String),
        field: fields[i],
      });
    }

    return errorsMessages;
  }

  async createQuestions(questionsCount: number): Promise<CreatedQuestions[]> {
    const result = [];
    for (let i = 0; i < questionsCount; i++) {
      const inputData: CreateQuestionDto = {
        body:  `${i}${faker.random.alpha(9)}`,
        correctAnswers: [
          `${1}${faker.random.alpha(3)}`,
          `${2}${faker.random.alpha(3)}`,
          `${3}${faker.random.alpha(3)}`
        ]
      };

      const response = await this.questions.createQuestion(preparedSuperUser.valid, inputData)

      result.push(response.body)
    }

    return result
  }

  async createQuestionsAndSetPublishStatus(questionsCount: number): Promise<CreatedQuestions[]> {
    const createdQuestions: CreatedQuestions[] = await this.createQuestions(questionsCount)

    const result = [];
    for (let i = 0; i < questionsCount; i++) {
      const response = await this.questions.updateQuestionStatus(
          preparedSuperUser.valid,
          createdQuestions[i].id,
          preparedQuestions.publishStatus.true
      )
      expect(response.status).toBe(HttpStatus.NO_CONTENT)

      result.push({
        id: createdQuestions[i].id,
        body: createdQuestions[i].body,
        correctAnswers: createdQuestions[i].correctAnswers,
        published: true,
        createdAt: createdQuestions[i].createdAt,
        updatedAt: createdQuestions[i].updatedAt,
      })
    }

    return result
  }
}
