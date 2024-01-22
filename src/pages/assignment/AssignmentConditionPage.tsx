import { Fragment } from 'react'
import {
  ASSIGN_MAX_SIZE,
  BASE_GRADES,
  ELEMENTARY_GRADES,
  LEVELS,
  SCHOOLS,
  SEMESTERS,
} from '../../constants/assignmentConstant'
import { useForm, SubmitHandler } from 'react-hook-form'
import { REG_EXP } from '../../constants/regExp'
import { useNavigate } from 'react-router-dom'
import { observer } from 'mobx-react'
import { assignmentStore } from '../../store/assignmentStore'

// 문제 유형 선택
const AssignmentCondition = () => {
  const store = assignmentStore
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Request.AssignmentContent>({
    defaultValues: {
      school: SCHOOLS[0].value,
      grade: BASE_GRADES[0].value,
      semester: SEMESTERS[0].value,
      level: String(LEVELS[2].value),
      size: 5,
    },
  })

  const schoolValue = watch('school')

  const onStartAssignment: SubmitHandler<Request.AssignmentContent> = async (conditionData) => {
    // 문제리스트 불러오기
    await store.fetchAndSetAssignments(conditionData)
    navigate(`/assignment/workbook`)
    // navigate(`/assignment/workbook?${qsUtils.convertObjectToQs(conditionData)}`)
  }

  return (
    <main>
      <img src="" alt="매쓰플랫" />
      <p>문제 유형을 선택해주세요.</p>
      <form onSubmit={handleSubmit(onStartAssignment)}>
        <section>
          <h2>학교・학년・학기 선택</h2>
          {/* 학교 */}
          <select id="school" {...register('school', { required: true })}>
            {SCHOOLS.map(({ label, value }) => (
              <option value={value} key={value}>
                {label}
              </option>
            ))}
          </select>
          {/* 학년 */}
          {schoolValue === SCHOOLS[0].value ? (
            <select id="grade" {...register('grade', { required: true })}>
              {ELEMENTARY_GRADES.map(({ label, value }) => (
                <option value={value} key={value}>
                  {label}
                </option>
              ))}
            </select>
          ) : (
            <select id="grade" {...register('grade', { required: true })}>
              {BASE_GRADES.map(({ label, value }) => (
                <option value={value} key={value}>
                  {label}
                </option>
              ))}
            </select>
          )}
          {/* 학기 */}
          <select id="semester" {...register('semester', { required: true })}>
            {SEMESTERS.map(({ label, value }) => (
              <option value={value} key={value}>
                {label}
              </option>
            ))}
          </select>
        </section>
        <section>
          <h2>난이도 선택</h2>
          {LEVELS.map(({ label, value }) => {
            return (
              <Fragment key={value}>
                <input type="radio" id={`level${value}`} value={value} {...register('level')} />
                <label htmlFor={`level${value}`}>{label}</label>
              </Fragment>
            )
          })}
        </section>

        <section>
          <h2>원하는 문제 수</h2>
          <input
            type="text"
            id="size"
            {...register('size', {
              min: 1,
              max: ASSIGN_MAX_SIZE,
              pattern: REG_EXP.NUMBER,
              required: true,
            })}
          />
          개 / 30개
          {errors.size && <p>숫자만 입력가능합니다 최대 30문제까지 가능합니다</p>}
        </section>

        <section>
          <button type="submit">시작하기</button>
        </section>
      </form>
    </main>
  )
}

export const AssignmentConditionPage = observer(AssignmentCondition)
