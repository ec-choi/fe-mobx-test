import { observer } from 'mobx-react'
import { useNavigate } from 'react-router-dom'
import { assignmentStore } from '../../store/assignmentViewModel'
import { useEffect, useState } from 'react'

const AssignmentResult = () => {
  const store = assignmentStore
  const navigate = useNavigate()
  const [checkedAssignments, setCheckedAssignments] = useState(store.checkedAssignments)

  const [filterUnCorrectAssignments, setFilterUnCorrectAssignments] = useState<boolean>(false)

  const [viewAssignmentImage, setViewAssignmentImage] = useState<boolean>(false)

  const onAssignmentCondition = () => {
    navigate('/', { replace: true })
  }

  // 오답 & 모르는문제 필터링
  // REVIEW: store로? businessLogic?
  useEffect(() => {
    if (filterUnCorrectAssignments) {
      setCheckedAssignments(store.filterUnCorrectAssignments)
    } else {
      setCheckedAssignments(store.checkedAssignments)
    }
  }, [filterUnCorrectAssignments, store.checkedAssignments, store.filterUnCorrectAssignments])

  return (
    <main>
      <nav>
        <p>총 {store.assignmentInfo.totalCount}문제</p>
        <button onClick={onAssignmentCondition}>완료하기</button>
      </nav>
      <section>
        <article>
          <input
            type="checkbox"
            name="filterUnCorrectAssignments"
            id="filterUnCorrectAssignments"
            onChange={() => setFilterUnCorrectAssignments((prev) => !prev)}
          />
          <label htmlFor="filterUnCorrectAssignments">오답/모르는 문제만 보기</label>
          <input
            type="checkbox"
            name="viewAssignmentImage"
            id="viewAssignmentImage"
            checked={viewAssignmentImage}
            onChange={() => setViewAssignmentImage((prev) => !prev)}
          />
          <label htmlFor="viewAssignmentImage">문제 같이 보기</label>
        </article>
        <article>
          <div>
            <p>
              채점결과
              <br />
              <strong>{store.checkedAssignmentInfo.score}점</strong>
            </p>
          </div>
          <div>
            <p>
              채점한 {store.assignmentInfo.totalCount}문제 중<br />
              <strong>{store.checkedAssignmentInfo.unCorrectCount}문제</strong>
              <span>오답</span>
            </p>
          </div>
        </article>
      </section>
      <ul>
        {checkedAssignments.map(
          ({
            id,
            isCorrect,
            selectedAnswer,
            answer,
            problemImage,
            answerImage,
            explanationImage,
            isShowCommentary,
          }) => {
            return (
              <li key={id}>
                <div>
                  <p>
                    {id}번{isCorrect ? <span>정답</span> : <span>오답</span>}
                  </p>
                  <p>제출한 답 : {selectedAnswer !== '0' ? selectedAnswer : '모름'} </p>
                </div>
                <div>
                  <div>
                    <img src={answerImage} alt={`정답 :${answer}`} />
                    <input
                      type="checkbox"
                      name={`viewCommentary${id}`}
                      id={`viewCommentary${id}`}
                      onChange={(e) => store.setIsShowCommentary(id, e.target.checked)}
                    />
                    <label htmlFor={`viewCommentary${id}`}>해설보기</label>
                  </div>
                  {viewAssignmentImage && <img src={problemImage} alt="문제 이미지" />}
                  {isShowCommentary && (
                    <div>
                      <img src={explanationImage} alt="해설 이미지" />
                      <label htmlFor={`viewCommentary${id}`}>해설접기</label>
                    </div>
                  )}
                </div>
              </li>
            )
          }
        )}
      </ul>
    </main>
  )
}

export const AssignmentResultPage = observer(AssignmentResult)
