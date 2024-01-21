// 문제 최대 사이즈
export const ASSIGN_MAX_SIZE: number = 30

// 문제 레벨
export const LEVELS = [
  { label: '하', value: 1 },
  { label: '중하', value: 2 },
  { label: '중', value: 3 },
  { label: '중상', value: 4 },
  { label: '상', value: 5 },
] as const

// 학교
export const SCHOOLS = [
  { label: '초', value: 'ELEMENTARY' },
  { label: '중', value: 'MIDDLE' },
  { label: '고', value: 'HIGH' },
] as const

// SCHOOL 값에 의존, ELEMENTARY일 경우 ELEMENTARY_GRADE, 나머지 BASE_GRADE
export const BASE_GRADES = [
  { label: '1학년', value: 1 },
  { label: '2학년', value: 2 },
  { label: '3학년', value: 3 },
] as const

export const ELEMENTARY_GRADES = [
  ...BASE_GRADES,
  { label: '4학년', value: 4 },
  { label: '5학년', value: 5 },
  { label: '6학년', value: 6 },
] as const

// 학기
export const SEMESTERS = [
  { label: '1학기', value: 1 },
  { label: '2학기', value: 2 },
] as const

// 모름 체크 플래그
export const UNKNOWN_FLAG = 0 as const
// export const UNKNOWN_FLAG = "unknown" as const
// 객관식 문제의 보기
export const ANSWER_OPTIONS = [
  { label: 1, value: '1' },
  { label: 2, value: '2' },
  { label: 3, value: '3' },
  { label: 4, value: '4' },
  { label: 5, value: '5' },
  { label: '모름', value: '0' },
] as const
