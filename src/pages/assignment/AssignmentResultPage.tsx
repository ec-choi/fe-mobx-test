/** @jsxImportSource @emotion/react */
import { observer } from 'mobx-react'
import { useNavigate } from 'react-router-dom'
import { assignmentStore } from '../../store/assignmentStore'
import { ChangeEvent, Fragment, useState } from 'react'
import { Toggle } from '../../components/toggle/Toggle'
import { Main } from '../../components/layout/Main'
import { css } from '@emotion/react'
import { spacing, color, rounded } from '../../styles/style'
import { Header } from '../../components/layout/Header'
import Typography from '../../components/typography/Typography'
import FlexBox from '../../components/layout/FlexBox'

const AssignmentResult = () => {
  const store = assignmentStore
  const navigate = useNavigate()

  const [filterAssignments, setFilterAssignments] = useState<boolean>(false)
  const [viewAssignmentImage, setViewAssignmentImage] = useState<boolean>(false)

  const [assignId, setAssignId] = useState<number | null>(null)

  const onChangeCometary = (e: ChangeEvent<HTMLInputElement>, id: number) => {
    if (e.target.checked) {
      setAssignId(id)
    } else {
      setAssignId(null)
    }
  }
  const onAssignmentCondition = () => {
    navigate('/', { replace: true })
  }

  return (
    <Main css={AssignmentResultStyle}>
      <Header
        title={`총 ${store.assignmentInfo.totalCount}문제`}
        rightButton={<button onClick={onAssignmentCondition}>완료하기</button>}
      />
      <section className="section_content">
        <FlexBox>
          <FlexBox>
            <label htmlFor="filterAssignments">
              <Typography typoType="body2">오답/모르는 문제만 보기</Typography>
            </label>
            <input
              css={css`
                display: none;
              `}
              type="checkbox"
              name="filterAssignments"
              id="filterAssignments"
              onChange={() => setFilterAssignments((prev) => !prev)}
            />
            <Toggle
              checked={filterAssignments}
              onClick={() => setFilterAssignments((prev) => !prev)}
            />
          </FlexBox>
          <FlexBox>
            <label htmlFor="viewAssignmentImage">
              <Typography typoType="body2">문제 같이 보기</Typography>
            </label>
            <input
              css={css`
                display: none;
              `}
              type="checkbox"
              name="viewAssignmentImage"
              id="viewAssignmentImage"
              checked={viewAssignmentImage}
              onChange={() => setViewAssignmentImage((prev) => !prev)}
            />
            <Toggle
              checked={viewAssignmentImage}
              onClick={() => setViewAssignmentImage((prev) => !prev)}
            />
          </FlexBox>
        </FlexBox>
        <article css={checkedResult}>
          <div className="checked_result">
            <Typography as="p" typoType="body3" color="gray600" align="center">
              채점결과
            </Typography>
            <Typography as="p" typoType="caption1" color="gray900" align="center">
              {store.assignmentInfo.score}점
            </Typography>
          </div>
          <div className="divider"></div>
          <div className="checked_result">
            <Typography as="p" typoType="body3" color="gray600" align="center">
              채점한 {store.assignmentInfo.totalCount}문제 중
            </Typography>
            <Typography as="p" typoType="caption1" color="accent" align="center">
              {store.assignmentInfo.unCorrectCount}문제&nbsp;
              <Typography typoType="body1" color="gray600" align="center">
                오답
              </Typography>
            </Typography>
          </div>
        </article>
      </section>
      <ul css={checkedAssignmentsStyle}>
        {[...store.assignments.values()].map(
          ({ id, isCorrect, answer, problemImage, answerImage, explanationImage }, index) => {
            if (filterAssignments && isCorrect) return <Fragment key={id}></Fragment>
            return (
              <li key={id}>
                <div className="answer_status">
                  <Typography as="p" typoType="caption2">
                    {index + 1}번&nbsp;&nbsp;&nbsp;
                    <Typography typoType="caption2" color={isCorrect ? 'primary' : 'accent'}>
                      {isCorrect ? '정답' : '오답'}
                    </Typography>
                  </Typography>
                </div>
                <div className="answer_status">
                  <img src={answerImage} alt={`정답 :${answer}`} className="answer_img" />

                  <label htmlFor={`viewCommentary${id}`}>
                    <input
                      css={css`
                        display: none;
                      `}
                      type="checkbox"
                      name={`viewCommentary${id}`}
                      id={`viewCommentary${id}`}
                      onChange={(e) => onChangeCometary(e, id)}
                    />
                    <Typography typoType="caption2">해설보기</Typography>
                  </label>
                </div>
                {assignId === id && (
                  <div className="answer_commentary">
                    {viewAssignmentImage && (
                      <div className="assignment_img_wrap">
                        <img src={problemImage} alt="문제 이미지" />
                      </div>
                    )}
                    <img src={explanationImage} alt="해설 이미지" />
                    <label htmlFor={`viewCommentary${id}`}>
                      <Typography as="p" typoType="caption2" align="center">
                        ▲ 해설접기
                      </Typography>
                    </label>
                  </div>
                )}
              </li>
            )
          }
        )}
      </ul>
    </Main>
  )
}

export const AssignmentResultPage = observer(AssignmentResult)

const AssignmentResultStyle = css`
  .section_content {
    width: 100%;
    padding: ${spacing.sm} ${spacing.lg};
  }
`

const checkedResult = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${spacing.xs};
  border: 1px solid ${color.gray200};
  background: ${color.white};
  border-radius: ${rounded.lg};
  margin-top: ${spacing.sm};
  .checked_result {
    width: 50%;
  }
  .divider {
    width: 1px;
    height: 24px;
    background: ${color.gray400};
  }
`

const checkedAssignmentsStyle = css`
  width: 100%;
  li {
    background: ${color.white};
    & + li {
      margin-top: ${spacing.sm};
    }
  }

  .answer_status {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: ${spacing.lg};
    border-bottom: 1px solid ${color.gray100};
    .answer_img {
      height: 16px;
      width: auto;
      margin: 0;
    }
  }
  .answer_commentary {
    padding: ${spacing.lg};
    .assignment_img_wrap {
      border-bottom: 1px solid ${color.gray200};
    }

    img {
      display: block;
      width: 90%;
      margin: ${spacing.lg} auto;
    }
  }
`
