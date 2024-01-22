import { Fragment, useEffect, useState } from 'react'
import { ANSWER_OPTIONS } from '../../constants/assignmentConstant'
import { useNavigate } from 'react-router-dom'
import { observer } from 'mobx-react'
import { assignmentStore } from '../../store/assignmentStore'
import { useFunnel } from '../../hooks/useFunnel'

const AssignmentWorkbook = () => {
  const store = assignmentStore
  const navigate = useNavigate()

  const { currentStep, isFirstStep, isLastStep, onNextStep, onPrevStep } = useFunnel({
    baseStep: 0,
    maxStep: store.assignmentInfo.totalCount - 1,
  })

  const [assignment, setAssignment] = useState<Store.UserAssignment>()
  const [checkedAnswers, setCheckedAnswers] = useState<(typeof ANSWER_OPTIONS)[number]['value'][]>(
    []
  )

  // 답안지 업데이트
  const onAnswerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value, checked },
    } = e
    let checkedAnswersState = [...checkedAnswers]
    if (checked) {
      // 이미 선택된 답의 갯수와 정답 갯수 비교
      if (checkedAnswers.length >= (assignment?.answerLegth as Store.UserAssignment['answerLegth']))
        return
      checkedAnswersState.push(value as (typeof ANSWER_OPTIONS)[number]['value'])
    } else {
      checkedAnswersState = checkedAnswersState.filter((answer) => answer !== value)
    }
    // 정답 업데이트
    setCheckedAnswers(checkedAnswersState)
    store.setThisAssignmentAnswer(currentStep, checkedAnswersState)
  }

  // funnel step별로 개별 문제 가져오기
  useEffect(() => {
    if (!store.assignments.length) return
    const thisAssignment = store.getThisAssignment(currentStep)
    setAssignment(thisAssignment)
    // 화면의 정답 체크박스 state 업데이트
    if (!thisAssignment?.selectedAnswer) {
      setCheckedAnswers([])
    } else {
      setCheckedAnswers([...thisAssignment?.selectedAnswer])
    }
  }, [currentStep, store])

  // 제출하고 채점하기로 넘어가기
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
          {currentStep + 1}번 문제 / 총 {store.assignmentInfo.totalCount}문제
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
            <Fragment key={currentStep + ' ' + value}>
              <input
                type="checkbox"
                value={value}
                name="answer"
                id={`answer${value}`}
                onChange={onAnswerChange}
                checked={
                  checkedAnswers.length
                    ? Boolean(checkedAnswers.filter((v) => v === value)[0])
                    : false
                }
              />
              <label htmlFor={`answer${value}`}>{label}</label>
            </Fragment>
          )
        })}

        <nav>
          <button onClick={onPrevStep} style={{ opacity: `${isFirstStep ? 0 : 1}` }}>
            이전 문제
          </button>
          <button type="submit" onClick={onNextStep} style={{ opacity: `${isLastStep ? 0 : 1}` }}>
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
