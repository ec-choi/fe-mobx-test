declare namespace Store {
  type UserAssignment = Response.AssignmentContent & {
    selectedAnswer: Array<(typeof ANSWER_OPTIONS)[number]['value']> | [] // '1', '2,4', '0', ''
  }

  type CheckedUserAssignment = Response.AssignmentAnswerContent & {
    isCorrect: boolean // 정답을 맞추었는지
    isUnknown: boolean // 모르는 문제인지
    selectedAnswer: string // '1', '2,4', '모름', ''
    isShowCommentary: boolean // 해설 보는지
  }

  type AssignmentInfo = {
    totalCount: number
    title: string
  }

  type CheckedAssignmentInfo = {
    score: number
    unCorrectCount: number
  }
}
