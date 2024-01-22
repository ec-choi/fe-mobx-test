declare namespace Response {
  type assignImage = string
  // ** 문제 조회 응답
  // 문제 값
  type AssignmentContent = {
    id: number
    type: 'SINGLE_CHOICE' | 'MULTIPLE_CHOICE'
    problemImage: assignImage
    answerLength: number // MULTIPLE_CHOICE의 경우 2 ~
  }
  // 문제 리스트
  type AssignmentContents = AssignmentContent[]

  // ** 문제 해답 조회
  // 문제 해답
  type AssignmentAnswerContent = {
    id: number
    answer: string // "1,4",
    problemImage: assignImage
    answerImage: assignImage
    explanationImage: assignImage
  }
  // 문제 해답 리스트
  type AssignmentAnswerContents = AssignmentAnswerContent[]
}
