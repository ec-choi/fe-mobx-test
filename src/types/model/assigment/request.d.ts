declare namespace Request {
  // ** 문제 조회 요청
  type AssignmentContent = {
    school: 'ELEMENTARY' | 'MIDDLE' | 'HIGH'
    grade: number
    semester: number
    level: string
    size: number
  }
  // ** 문제 해답 요청
  // type AssignmentAnswerContent = Response.AssignmentContent['id'][]
  type AssignmentAnswerContent = number[]
}
