import { action, computed, makeObservable, observable, runInAction } from 'mobx'
import {
  ELEMENTARY_GRADES,
  SCHOOLS,
  SEMESTERS,
  UNKNOWN_FLAG,
} from '../constants/assignmentConstant'
import { assignmentApi } from '../api/assigmnent'
import { scoreUtils } from '../utils/scoreUtils'

export class AssignmentStore {
  // 문제 + 사용자의 답변
  assignments: Store.UserAssignment[] = []
  // fetch 한 문제 리스트의 정보
  assignmentInfo: Store.AssignmentInfo = {
    totalCount: 0,
    title: '',
  }
  // 채점 된 문제 (문제의 답변 + 오답여부)
  checkedAssignments: Store.CheckedUserAssignment[] = []
  checkedAssignmentInfo: Store.CheckedAssignmentInfo = {
    score: 0,
    unCorrectCount: 0,
  }

  // 총 틀린,모르는 문제 갯수
  constructor() {
    makeObservable(this, {
      // 문제 리스트
      assignments: observable,
      // fetch한 문제 리스트의 정보 (총갯수, 학교, 학년, 학기)
      assignmentInfo: observable,

      // 현재 문제(step 별로)
      getThisAssignment: observable,
      // 현재 문제에 정답 입력
      setThisAssignmentAnswer: action,
      // 문제 리스트 fetch
      fetchAndSetAssignments: action,
      // 문제 리스트의 정답 fetch
      fetchAnsSetAssignmentsAnswer: action,
      // 문제를 다 풀어서 정답을 호출 할 수 있는 상태인지 체크하는 boolean 값
      isSubmitPossible: computed,

      // 채점한 문제
      checkedAssignments: observable,
      // 채점한 문제의 정보(점수, 오답수)
      checkedAssignmentInfo: observable,
      // 오답 & 모르는 문제만
      filterUnCorrectAssignments: computed,
      // 각 문제의 해설을 보는지
      setIsShowCommentary: action,
    })
  }
  // 문제 리스트 api 요청
  async fetchAndSetAssignments(conditionData: Request.AssignmentContent) {
    const assignments = await assignmentApi.getAssignments(conditionData)
    runInAction(() => {
      this.assignments = assignments.map((assignment) => {
        return {
          ...assignment,
          selectedAnswer: [],
        }
      })
      this.#setAssignmentInfo(conditionData)
    })
  }
  // 문제 리스트의 정보
  #setAssignmentInfo(conditionData: Request.AssignmentContent) {
    this.assignmentInfo.totalCount = this.assignments.length
    // 초등/1학년/1학기
    this.assignmentInfo.title =
      SCHOOLS.filter(({ value }) => value === conditionData.school)[0].label +
      '등 / ' +
      ELEMENTARY_GRADES.filter(({ value }) => String(value) === String(conditionData.grade))[0]
        .label +
      ' / ' +
      SEMESTERS.filter(({ value }) => String(value) === String(conditionData.semester))[0].label
  }
  // 문제 정답 api 요청
  async fetchAnsSetAssignmentsAnswer() {
    const problemIds = this.assignments.map(({ id }) => id)
    const problemAnswers = await assignmentApi.getAssignmentsAnswer(problemIds)
    runInAction(() => {
      let unCorrectCount = 0
      this.checkedAssignments = problemAnswers.map((problemAnswer) => {
        // 사용자가 푼 문제와 답안 문제의 답을 비교하여 상태 업데이트
        let result = {
          ...problemAnswer,
          isCorrect: false,
          selectedAnswer: '',
          isUnknown: false,
          isShowCommentary: false,
        }
        if (this.assignments.filter(({ id }) => id === problemAnswer.id).length) {
          // 오답 case
          const userAssignment = this.assignments.filter(({ id }) => id === problemAnswer.id)[0]
          if (userAssignment.selectedAnswer.join(',') !== problemAnswer.answer) {
            unCorrectCount++
            result = {
              ...result,
              isCorrect: false,
              isUnknown: userAssignment.selectedAnswer.join(',').indexOf(String(UNKNOWN_FLAG)) > -1,
              selectedAnswer: userAssignment.selectedAnswer.join(','),
            }
          } else {
            // 정답 case
            result = {
              ...result,
              isCorrect: true,
              isUnknown: false,
              selectedAnswer: userAssignment.selectedAnswer.join(','),
            }
          }
        }
        return result
      })
      this.#setCheckedAssignmentInfo(unCorrectCount)
    })
  }
  // 채점 된 문제의 정보
  #setCheckedAssignmentInfo(unCorrectCount: number) {
    this.checkedAssignmentInfo.score = scoreUtils.scoreToPercentage(
      this.assignmentInfo.totalCount,
      this.assignmentInfo.totalCount - unCorrectCount
    )
    this.checkedAssignmentInfo.unCorrectCount = unCorrectCount
  }
  // 오답 & 모르는 문제만 보기 : REVIEW 호출할때마다 연산? => checkedAssignmentInfo 처럼 observable로?
  get filterUnCorrectAssignments() {
    return this.checkedAssignments.filter(({ isCorrect }) => !isCorrect)
  }
  // 해설보기
  setIsShowCommentary(assignmentId: number, isShowFlag: boolean) {
    this.checkedAssignments.forEach((assignment) => {
      if (assignment.id === assignmentId) {
        assignment.isShowCommentary = isShowFlag
      }
    })
  }
  // 현재 문제
  getThisAssignment(index: number) {
    return this.assignments[index]
  }
  // 문제의 답변 입력
  setThisAssignmentAnswer(index: number, selectedAnswer: Store.UserAssignment['selectedAnswer']) {
    return (this.assignments[index].selectedAnswer = selectedAnswer)
  }
  // 문제 답안 제출이 가능한지 판별
  get isSubmitPossible(): boolean {
    // 문제의 사용자 입력 정답값이 []인게 하나라도 있으면 false
    return Boolean(
      this.assignments.filter((assignment) => assignment.selectedAnswer.length === 0).length > 0
    )
  }
}

export const assignmentStore = new AssignmentStore()
