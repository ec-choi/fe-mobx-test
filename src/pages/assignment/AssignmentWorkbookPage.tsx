import { Fragment, useEffect, useState } from 'react'
import { ANSWER_OPTIONS } from '../../constants/assignmentConstant'
import { useNavigate } from 'react-router-dom'
import { observer } from 'mobx-react'
import { UserAssignment, assignmentStore } from '../../store/assignmentViewModel'

const AssignmentWorkbook = () => {
  const store = assignmentStore
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [assignment, setAssignment] = useState<UserAssignment>()
  const [answerChecked, setAnswerChecked] = useState<(typeof ANSWER_OPTIONS)[number]['value'][]>([])
  // 이전문제
  const onPrevAssignment = () => {
    if (step <= 0) return
    setAnswerChecked([])
    setStep((prev) => prev - 1)
  }
  // 다음문제
  const onNextAssignment = () => {
    if (step >= store.assignments.length - 1) return
    setAnswerChecked([])
    setStep((prev) => prev + 1)
  }

  const setDefaultAnswer = () => {
    console.log(assignment?.selectedAnswer)
    if (!assignment?.selectedAnswer) {
      setAnswerChecked([])
    } else {
      setAnswerChecked([...assignment?.selectedAnswer])
    }
  }

  const onAnswerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value, checked },
    } = e
    if (checked) {
      // 이미 선택된 답의 갯수와 정답 갯수 비교
      if (answerChecked.length >= (assignment?.answerLegth as UserAssignment['answerLegth'])) return
      setAnswerChecked((prev) => [...prev, value as (typeof ANSWER_OPTIONS)[number]['value']])
    } else {
      setAnswerChecked((prev) => prev.filter((answer) => answer !== value))
    }
  }

  useEffect(() => {
    store.setThisAssignmentAnswer(step, answerChecked)
  }, [answerChecked, step, store])

  // 개별 문제
  useEffect(() => {
    if (!store.assignments.length) return
    setAssignment(store.getThisAssignment(step))
    console.log(store.assignments)
  }, [step, store])

  // 제출하고 채점하기
  const onCheckAssignment = async () => {
    await store.fetchAnsSetAssignmentsAnswer()
    navigate('/assignment/result')
  }
  return (
    <main>
      <nav>
        <button
          onClick={() => {
            navigate(-1)
          }}
        >
          뒤로가기
        </button>
        <h1>{store.assignmentInfo.title}</h1>
      </nav>
      <section>
        <p>
          {assignment?.id}번 문제 / 총 {store.assignmentInfo.totalCount}문제
        </p>
        <article>
          <img
            src={assignment?.problemImage}
            alt={`${assignment?.id}번 문제 이미지`}
            referrerPolicy="no-referrer"
          />
        </article>
      </section>
      <section>
        <p>정답 {assignment?.answerLegth}개</p>
        {ANSWER_OPTIONS.map(({ label, value }) => {
          return (
            <Fragment key={step + ' ' + value}>
              <input
                type="checkbox"
                value={value}
                name="answer"
                id={`answer${value}`}
                onChange={onAnswerChange}
                // defaultChecked={
                // checked={
                //   assignment?.selectedAnswer
                //     ? Boolean(
                //          assignment?.selectedAnswer.filter((v) => v === value)[0] === 'number'
                //       )
                //     : false
                checked={
                  answerChecked.length
                    ? Boolean(answerChecked.filter((v) => v === value)[0])
                    : false
                }
              />
              <label htmlFor={`answer${value}`}>{label}</label>
            </Fragment>
          )
        })}

        <nav>
          <button onClick={onPrevAssignment} style={{ opacity: `${step <= 0 ? 0 : 1}` }}>
            이전 문제
          </button>
          <button
            type="submit"
            onClick={onNextAssignment}
            style={{ opacity: `${step >= store.assignmentInfo.totalCount - 1 ? 0 : 1}` }}
          >
            다음 문제
          </button>
        </nav>
      </section>
      <button disabled={store.isSubmitPossible} onClick={onCheckAssignment}>
        제출하기
      </button>
    </main>
  )
}

export const AssignmentWorkbookPage = observer(AssignmentWorkbook)
