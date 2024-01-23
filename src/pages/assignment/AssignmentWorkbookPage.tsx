/** @jsxImportSource @emotion/react */
import { ChangeEvent, Fragment } from 'react'
import { ANSWER_OPTIONS } from '../../constants/assignmentConstant'
import { useNavigate } from 'react-router-dom'
import { observer } from 'mobx-react'
import { assignmentStore } from '../../store/assignmentStore'
import { useFunnel } from '../../hooks/useFunnel'
import { Main } from '../../components/layout/Main'
import { Header } from '../../components/layout/Header'
import Typography from '../../components/typography/Typography'
import { css } from '@emotion/react'
import { color, rounded, shadow, spacing } from '../../styles/style'
import Button from '../../components/button/Button'

const AssignmentWorkbook = () => {
  const store = assignmentStore
  const navigate = useNavigate()

  const { currentStep, isFirstStep, isLastStep, onNextStep, onPrevStep } = useFunnel({
    baseStep: 0,
    maxStep: store.assignmentInfo.totalCount - 1,
  })
  // step 단계별 현재 문제
  const currentAssignment = store.getThisAssignment(currentStep)

  // 답안지 업데이트
  const onAnswerChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value, checked },
    } = e
    let checkedAnswersState = [...currentAssignment.selectedAnswer]
    if (checked) {
      // 이미 선택된 답의 갯수와 정답 갯수 비교해서 리턴
      if (checkedAnswersState.length >= currentAssignment?.answerLength) return
      checkedAnswersState.push(value as (typeof ANSWER_OPTIONS)[number]['value'])
    } else {
      checkedAnswersState = checkedAnswersState.filter((answer) => answer !== value)
    }
    // 정답 업데이트
    store.setThisAssignmentAnswer(currentAssignment.id, checkedAnswersState)
  }

  // 제출하고 채점하기로 넘어가기
  const onCheckAssignment = async () => {
    await store.fetchAnsSetAssignmentsAnswer()
    navigate('/assignment/result')
  }

  return (
    <Main css={AssignmentWorkbookStyle}>
      <Header
        title={store.assignmentInfo.title}
        leftButton={
          <button
            onClick={() => {
              navigate(-1)
            }}
          >
            뒤로
          </button>
        }
      />
      <div className="workbook_content">
        <Typography as="p" typoType="body1">
          <Typography as="strong" typoType="caption1">
            {currentStep + 1}번 문제&nbsp;
          </Typography>
          / 총 {store.assignmentInfo.totalCount}문제
        </Typography>

        <section className="section_content">
          <article className="assignment_img_wrap">
            <img
              src={currentAssignment.problemImage}
              alt={`${currentAssignment.id}번 문제 이미지`}
              referrerPolicy="no-referrer"
            />
          </article>
        </section>
        <section className="section_content">
          <Typography typoType="body2">정답 {currentAssignment.answerLength}개</Typography>

          <div className="answer_sheet">
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
                      currentAssignment.selectedAnswer.length
                        ? Boolean(currentAssignment.selectedAnswer.filter((v) => v === value)[0])
                        : false
                    }
                  />
                  <label htmlFor={`answer${value}`}>{label}</label>
                </Fragment>
              )
            })}

            <nav css={[buttonGroup]}>
              <button onClick={onPrevStep} style={{ opacity: `${isFirstStep ? 0 : 1}` }}>
                이전 문제
              </button>
              <button
                type="submit"
                onClick={onNextStep}
                style={{ opacity: `${isLastStep ? 0 : 1}` }}
              >
                다음 문제
              </button>
            </nav>
          </div>

          <Button
            disabled={store.isSubmitPossible}
            onClick={onCheckAssignment}
            className="assignment_check_btn"
          >
            제출하기
          </Button>
        </section>
      </div>
    </Main>
  )
}

export const AssignmentWorkbookPage = observer(AssignmentWorkbook)

const AssignmentWorkbookStyle = css`
  .workbook_content {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    flex: 1;
    padding: ${spacing.lg};
    padding-bottom: 0px;
  }
  .section_content {
    width: 100%;
  }
  .assignment_img_wrap {
    width: 100%%;
    padding: ${spacing.lg};
    border-radius: ${rounded.lg};
    border: 1px solid ${color.gray200};
    background: ${color.white};
    img {
      width: 100%;
    }
  }
  .answer_sheet {
    margin: ${spacing.xs} 0 ${spacing.md} 0;
    border-radius: ${rounded.lg};
    box-shadow: ${shadow.md};
    background: ${color.white};
  }

  .assignment_check_btn {
    width: calc(100% + ${spacing.lg}*2);
    margin: 0 -${spacing.lg};
  }
`
const buttonGroup = css`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: ${spacing.lg};
  border-top: 1px solid ${color.gray200};
`
