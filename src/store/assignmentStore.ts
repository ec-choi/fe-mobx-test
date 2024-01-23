import { action, computed, makeObservable, observable, runInAction } from 'mobx'
import {
  ELEMENTARY_GRADES,
  SCHOOLS,
  SEMESTERS,
  UNKNOWN_FLAG,
} from '../constants/assignmentConstant'
import { assignmentApi } from '../api/assignment'
import { scoreUtils } from '../utils/scoreUtils'
import { Store } from '../types/store/assignment/interface'

export class AssignmentStore {
  // 문제 + 사용자의 답변 + 채점 정보
  assignments: Map<Store.UserAssignment['id'], Store.UserAssignment> = new Map()
  // fetch한 문제 리스트의 정보 (총갯수, 학교, 학년, 학기) & 채점한 문제의 정보(점수, 오답수)
  assignmentInfo: Store.AssignmentInfo = {
    totalCount: 0,
    title: '',
    score: 0,
    unCorrectCount: 0,
  }

  constructor() {
    makeObservable(this, {
      // 문제 리스트(fetch) + 사용자 입력 답 + 정답 & 해설정보(fetch)
      assignments: observable,
      // fetch한 문제 리스트의 정보 (총갯수, 학교, 학년, 학기) & 채점한 문제의 정보(점수, 오답수) FIXME: computed 변경하면 검색조건을 저장해야함... 비슷한 것 같아서 둠
      assignmentInfo: observable,
      // 문제 리스트 fetch
      fetchAndSetAssignments: action,
      //===
      // 현재 문제(step 별로)
      getThisAssignment: observable,
      // 현재 문제에 정답 입력
      setThisAssignmentAnswer: action,
      // 문제를 다 풀어서 정답을 호출 할 수 있는 상태인지 체크하는 boolean 값
      isSubmitPossible: computed,
      // 문제 리스트의 정답 fetch
      fetchAnsSetAssignmentsAnswer: action,
    })
  }
  // 문제 리스트 api 요청 + 초기값 설정
  async fetchAndSetAssignments(conditionData: Request.AssignmentContent) {
    this.assignments = new Map()
    const assignments = await assignmentApi.getAssignments(conditionData)
    runInAction(() => {
      assignments.forEach((assignment) => {
        this.assignments.set(assignment.id, {
          ...assignment,
          selectedAnswer: [],
          isCorrect: false,
          isUnknown: false,
          answer: '',
          answerImage: '',
          explanationImage: '',
        })
      })
      this.#setAssignmentInfo(conditionData)
    })
  }
  // 문제 리스트의 정보
  #setAssignmentInfo(conditionData: Request.AssignmentContent) {
    this.assignmentInfo.totalCount = this.assignments.size
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
    const problemIds = [...this.assignments.keys()]
    const problemAnswers = await assignmentApi.getAssignmentsAnswer(problemIds)
    runInAction(() => {
      let unCorrectCount = 0
      problemAnswers.forEach((problemAnswer) => {
        // 사용자가 푼 문제와 답안 문제의 답을 비교하여 상태 업데이트
        const thisAssignment = this.assignments.get(problemAnswer.id)
        if (thisAssignment) {
          const { selectedAnswer } = thisAssignment
          const isCorrect = selectedAnswer.join('') === problemAnswer.answer
          if (!isCorrect) {
            unCorrectCount++
          }

          Object.assign(thisAssignment, {
            isCorrect: isCorrect,
            isUnknown: !isCorrect && selectedAnswer.join(',').indexOf(String(UNKNOWN_FLAG)) > -1,
            answerImage: problemAnswer.answerImage,
            answer: problemAnswer.answer,
            explanationImage: problemAnswer.explanationImage,
          })
        }
      })
      this.#setCheckedAssignmentInfo(unCorrectCount)
    })
  }
  // 채점 된 문제의 정보
  #setCheckedAssignmentInfo(unCorrectCount: number) {
    this.assignmentInfo.score = scoreUtils.scoreToPercentage(
      this.assignmentInfo.totalCount,
      this.assignmentInfo.totalCount - unCorrectCount
    )
    this.assignmentInfo.unCorrectCount = unCorrectCount
  }
  // 현재 문제
  getThisAssignment(index: number) {
    return [...this.assignments.values()][index]
  }
  // 문제의 답변 입력
  setThisAssignmentAnswer(
    id: Store.UserAssignment['id'],
    selectedAnswer: Store.UserAssignment['selectedAnswer']
  ) {
    return (this.assignments.get(id)!.selectedAnswer = selectedAnswer)
  }
  // 문제 답안 제출이 가능한지 판별
  get isSubmitPossible(): boolean {
    // 문제의 사용자 입력 정답값이 []인게 하나라도 있으면 false
    return Boolean(
      [...this.assignments.values()].filter((assignment) => assignment.selectedAnswer.length === 0)
        .length > 0
    )
  }
}

export const assignmentStore = new AssignmentStore()
