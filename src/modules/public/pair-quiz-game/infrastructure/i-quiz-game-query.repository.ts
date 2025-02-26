import { ViewGame } from '../api/view/view-game';
import { CheckAnswerProgressDb } from "./sql/pojo/checkAnswerProgressDb";
import {PlayerIdDb} from "./sql/pojo/player-id.db";
import {GetCorrectAnswerDb} from "./sql/pojo/get-correct-answer.db";

export interface IQuizGameQueryRepository {
  getMyCurrentGame(gameId: string): Promise<ViewGame>;
  getGameById(gameId: string): Promise<ViewGame>;
  getPlayerByGameId(gameId: string): Promise<PlayerIdDb[]>
  getCorrectAnswers(userId: string, questionNumber: number): Promise<GetCorrectAnswerDb>
  checkUserCurrentGame(userId: string): Promise<string | null>;
  checkOpenGame(): Promise<string | null>;
  checkUserAnswerProgress(userId: string): Promise<CheckAnswerProgressDb[]>;
}

export const IQuizGameQueryRepository = 'IQuizGameQueryRepository';
