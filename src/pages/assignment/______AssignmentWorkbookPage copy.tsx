// import { Fragment, useEffect, useState } from 'react'
// import { ANSWER_OPTIONS } from '../../constants/assignmentConstant'
// import { useNavigate } from 'react-router-dom'
// import { observer } from 'mobx-react'
// import { UserAssignment, assignmentStore } from '../../store/assignmentViewModel'
// import { useForm } from 'react-hook-form'
const _AssignmentWorkbook = () => {
  return <></>
}
// const _AssignmentWorkbook = () => {
//   const store = assignmentStore
//   const navigate = useNavigate()
//   const [step, setStep] = useState(0)
//   const [assignment, setAssignment] = useState<UserAssignment>()
//   const [values, setValues] = useState<UserAssignment['selectedAnswer']>([])

//   const { register, handleSubmit } = useForm()

//   const onPrevAssignment = () => {
//     if (step <= 0) return
//     setStep((prev) => prev - 1)
//   }

//   const onNextAssignment = () => {
//     handleSubmit(onSubmit)
//     if (step >= store.assignments.length - 1) return
//     setStep((prev) => prev + 1)
//   }

//   // const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//   //   console.log('change', event.target.value)
//   // }
//   const onSubmit = (data: any) => {
//     console.log([...data.answer.filter((v: boolean) => v !== false)])
//   }

//   const onAnswerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     console.log('change', event.target.value)
//     console.log(event.target.checked)
//     // if (event.target.checked) {
//     //   setValues((prev) => [
//     //     ...new Set([
//     //       ...prev,
//     //       Number(event.target.value) as (typeof ANSWER_OPTIONS)[number]['value'],
//     //     ]),
//     //   ])
//     // } else {

//     // }
//     store.setThisAssignmentAnswer(step, [
//       Number(event.target.value) as (typeof ANSWER_OPTIONS)[number]['value'],
//     ])
//   }
//   useEffect(() => {
//     console.log(values)
//   }, [values])
//   // 개별 문제
//   useEffect(() => {
//     if (!store.assignments.length) return
//     setAssignment(store.getThisAssignment(step))
//     console.log(store.assignments)
//   }, [step, store])

//   return (
//     <main>
//       <nav>
//         <button
//           onClick={() => {
//             navigate(-1)
//           }}
//         >
//           뒤로가기
//         </button>
//         <h1>{store.assignmentInfo.title}</h1>
//       </nav>
//       <section>
//         <p>
//           {step + 1}번 문제 / 총 {store.assignmentInfo.totalCount}문제
//         </p>
//         <article>
//           <img
//             src={assignment?.problemImage}
//             alt={`${step + 1}번 문제 이미지`}
//             referrerPolicy="no-referrer"
//           />
//         </article>
//       </section>
//       <section>
//         <p>정답 {assignment?.answerLegth}개</p>
//         {ANSWER_OPTIONS.map(({ label, value }) => {
//           return (
//             <Fragment key={step + ' ' + value}>
//               <input
//                 type="checkbox"
//                 value={value}
//                 id={`answer${value}`}
//                 // onChange={onChange}
//                 {...register(`answer.${value}`)}
//                 defaultChecked={
//                   assignment?.selectedAnswer
//                     ? Boolean(assignment?.selectedAnswer.filter((v) => v === value)[0])
//                     : false
//                 }
//                 // onChange={onAnswerChange}
//                 // ref={register}
//               />
//               <label htmlFor={`answer${value}`}>{label}</label>
//             </Fragment>
//           )
//         })}

//         <nav>
//           <button onClick={onPrevAssignment} style={{ opacity: `${step <= 0 ? 0 : 1}` }}>
//             이전 문제
//           </button>
//           <button
//             type="submit"
//             onClick={onNextAssignment}
//             style={{ opacity: `${step >= store.assignmentInfo.totalCount - 1 ? 0 : 1}` }}
//           >
//             다음 문제
//           </button>
//         </nav>
//       </section>
//       <button disabled={store.isSubmitPossible} onClick={() => navigate('/assignment/result')}>
//         제출하기
//       </button>
//     </main>
//   )
// }

// export const _AssignmentWorkbookPage = observer(_AssignmentWorkbook)
