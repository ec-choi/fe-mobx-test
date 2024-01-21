declare namespace Store {
  // 문제 도메인 스토어 중 문제
  type AssignmentContent = Response.AssignmentAnswerContent & {
    selectedAnswer: string // '1', '2,4', '모름', '(가) ~~'
  }

  // 문제 도메인 스토어
  type AssignmentStore = {
    totalAssignment: number
    assignments: AssignmentContent[]
  }
}

declare namespace Response {
  // ** 문제 해답 요청
  export type Tores = number[]
}
