import { ANSWER_OPTIONS } from '../../../constants/assignmentConstant'
declare namespace Store {
  type UserAssignment = Response.AssignmentContent &
    Pick<Response.AssignmentAnswerContent, 'answer' | 'answerImage' | 'explanationImage'> & {
      selectedAnswer: Array<(typeof ANSWER_OPTIONS)[number]['value']> | [] // '1', '2,4', '0', ''
      isCorrect: boolean // 정답을 맞추었는지
      isUnknown: boolean // 모르는 문제인지
    }

  type AssignmentInfo = {
    totalCount: number
    title: string
    score: number
    unCorrectCount: number
  }
}
