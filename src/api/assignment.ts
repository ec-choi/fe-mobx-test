import { getData } from '../utils/axios'

const ASSIGNMENTS_PREFIX = '/api/assignment'

export const assignmentApi = {
  // 문제 불러오기
  getAssignments: async (assignmentCondition: Request.AssignmentContent) => {
    const {
      data: { content },
    } = await getData<Response.AssignmentContents>(`${ASSIGNMENTS_PREFIX}/problem`, {
      params: assignmentCondition,
    })
    return content
  },
  // 문제의 답안 불러오기
  getAssignmentsAnswer: async (problemIds: number[]) => {
    const {
      data: { content },
    } = await getData<{ problemAnswers: Response.AssignmentAnswerContents }>(
      `${ASSIGNMENTS_PREFIX}/answer`,
      {
        params: { problemIds: JSON.stringify(problemIds) },
      }
    )
    return content.problemAnswers
  },
}
