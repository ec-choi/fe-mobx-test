/** @jsxImportSource @emotion/react */
import { ChangeEvent } from 'react'
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
import { ChangeInputWithRoundLabel } from '../../components/input/ChangeInputWithRoundLabel'
import FlexBox from '../../components/layout/FlexBox'

const AssignmentWorkbook = () => {
  const store = assignmentStore
  const navigate = useNavigate()

  const { currentStep, isFirstStep, isLastStep, onNextStep, onPrevStep } = useFunnel({
    baseStep: 0,
    maxStep: store.assignmentInfo.totalCount - 1,
  })

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

        <AssignmentContent currentStep={currentStep} />
        <section>
          <FlexBox css={[buttonGroup]}>
            <button onClick={onPrevStep} style={{ opacity: `${isFirstStep ? 0 : 1}` }}>
              이전 문제
            </button>
            <button type="submit" onClick={onNextStep} style={{ opacity: `${isLastStep ? 0 : 1}` }}>
              다음 문제
            </button>
          </FlexBox>
          <AssignmentSubmitButton />
        </section>
      </div>
    </Main>
  )
}

const AssignmentContent = observer(({ currentStep }: { currentStep: number }) => {
  const store = assignmentStore

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

  return (
    <section className="section_content" css={[sectionContent]}>
      <div className="assignment_content">
        <article className="assignment_img_wrap">
          <img
            src={currentAssignment.problemImage}
            alt={`${currentAssignment.id}번 문제 이미지`}
            referrerPolicy="no-referrer"
          />
        </article>
      </div>

      <Typography typoType="body2" className="answer_count">
        정답 {currentAssignment.answerLength}개
      </Typography>
      <div className="answer_sheet">
        <FlexBox className="answer_sheet_checkbox">
          {ANSWER_OPTIONS.map(({ label, value }) => {
            return (
              <ChangeInputWithRoundLabel
                key={currentStep + ' ' + value}
                type="checkbox"
                value={value}
                name="answer"
                labelText={label}
                id={`answer${value}`}
                onChange={onAnswerChange}
                checked={
                  currentAssignment.selectedAnswer.length
                    ? Boolean(currentAssignment.selectedAnswer.filter((v) => v === value)[0])
                    : false
                }
              />
            )
          })}
        </FlexBox>
      </div>
    </section>
  )
})

const AssignmentSubmitButton = observer(() => {
  const store = assignmentStore
  const navigate = useNavigate()

  // 제출하고 채점하기로 넘어가기
  const onCheckAssignment = async () => {
    await store.fetchAnsSetAssignmentsAnswer()
    navigate('/assignment/result')
  }
  return (
    <Button
      disabled={store.isSubmitPossible}
      onClick={onCheckAssignment}
      className="assignment_check_btn"
    >
      제출하기
    </Button>
  )
})
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
  .assignment_check_btn {
    width: calc(100% + ${spacing.lg}*2);
    margin: 0 -${spacing.lg};
  }
`

const sectionContent = css`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .assignment_content {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }
  .assignment_img_wrap {
    padding: ${spacing.lg};
    border-radius: ${rounded.lg};
    border: 1px solid ${color.gray200};
    background: ${color.white};
    img {
      width: 100%;
    }
  }
  .answer_count {
    width: 100%;
    margin-bottom: ${spacing.lg};
  }
  .answer_sheet {
    width: 100%;
    border-radius: ${rounded.lg} ${rounded.lg} 0 0;
    box-shadow: ${shadow.md};
    background: ${color.white};
  }
  .answer_sheet_checkbox {
    padding: ${spacing.lg};
  }
`
const buttonGroup = css`
  margin: 0 0 ${spacing.md};
  padding: ${spacing.lg};
  border-radius: 0 0 ${rounded.lg} ${rounded.lg};
  border-top: 1px solid ${color.gray200};
  box-shadow: ${shadow.md};
  background: ${color.white};
`
