import {
  ASSIGN_MAX_SIZE,
  BASE_GRADES,
  ELEMENTARY_GRADES,
  LEVELS,
  SCHOOLS,
  SEMESTERS,
} from '../../constants/assignmentConstant'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { REG_EXP } from '../../constants/regExp'
import { useNavigate } from 'react-router-dom'
import { observer } from 'mobx-react'
import { assignmentStore } from '../../store/assignmentStore'
import { Main } from '../../components/layout/Main'
import logo from '../../assets/image/logo.png'
import Typography from '../../components/typography/Typography'
import { css } from '@emotion/react'
import { color, spacing } from '../../styles/style'
import Button from '../../components/button/Button'
import Input from '../../components/input/Input'
import FlexBox from '../../components/layout/FlexBox'
import { ChangeInputWithRoundLabel } from '../../components/input/ChangeInputWithRoundLabel'
// 문제 유형 선택
const AssignmentCondition = () => {
  const store = assignmentStore
  const navigate = useNavigate()
  const {
    register,
    control,
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
  }

  return (
    <Main css={AssignmentConditionStyle}>
      <img src={logo} alt="매쓰플랫]" className="logo_image" />
      <Typography as="p" typoType="body1" align="center" color="gray800" className="description">
        문제 유형을 선택해주세요.
      </Typography>
      <form onSubmit={handleSubmit(onStartAssignment)} className="condition_form">
        <div>
          <section className="section_content">
            <Typography as="h2" typoType="body1">
              학교 ・ 학년 ・ 학기 선택
            </Typography>
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
          <section className="section_content">
            <Typography as="h2" typoType="body1">
              난이도 선택
            </Typography>
            <FlexBox justify="flex-start" gap="lg">
              <Controller
                name="level"
                control={control}
                render={({ field }) => (
                  <>
                    {LEVELS.map(({ value, label }) => (
                      <ChangeInputWithRoundLabel
                        key={value}
                        type="radio"
                        id={`level${value}`}
                        {...field}
                        defaultChecked={LEVELS[2].value === value}
                        labelText={label}
                      />
                    ))}
                  </>
                )}
              />
            </FlexBox>
          </section>

          <section className="section_content">
            <Typography as="h2" typoType="body1">
              원하는 문제 수
            </Typography>
            <FlexBox justify="flex-start">
              <Input
                type="text"
                id="size"
                isError={Boolean(errors.size)}
                {...register('size', {
                  min: 1,
                  max: ASSIGN_MAX_SIZE,
                  pattern: REG_EXP.NUMBER,
                  required: true,
                })}
              />
              <Typography typoType="body1" color="black">
                개 / 30개
              </Typography>
            </FlexBox>

            {errors.size && (
              <Typography as="p" typoType="body1" color="accent">
                숫자만 입력가능합니다
                <br /> 최대 30문제까지 가능합니다
              </Typography>
            )}
          </section>
        </div>
        <section>
          <Button type="submit" rounded="sm" size="sm" className="assignment_start_btn">
            시작하기
          </Button>
        </section>
      </form>
    </Main>
  )
}

export const AssignmentConditionPage = observer(AssignmentCondition)

const AssignmentConditionStyle = css`
  .logo_image {
    margin: ${spacing.xxxl};
    width: 120px;
  }
  .description {
    width: calc(100% - ${spacing.xxxl});
    padding: ${spacing.lg};
    margin-bottom: ${spacing.xxl};
    background: ${color.white};
  }
  .condition_form {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    padding: ${spacing.xxxl};
  }
  .section_content {
    width: 100%;
    margin-bottom: ${spacing.xxxl};
    h2 {
      margin-bottom: ${spacing.md};
    }
  }
  .assignment_start_btn {
    display: block;
    margin: 0 auto;
  }
`
