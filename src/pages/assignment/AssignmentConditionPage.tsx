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
import { observer, useLocalObservable } from 'mobx-react'
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
import Dropdown from '../../components/dropdown/Dropdown'
import DropdownItem from '../../components/dropdown/DropdownItem'
// 문제 유형 선택
const AssignmentCondition = () => {
  const store = assignmentStore
  const navigate = useNavigate()

  // 학교.학년.학기 선택
  const dropdownStore = useLocalObservable(() => ({
    uiSchool: SCHOOLS[0].value as (typeof SCHOOLS)[number]['value'],
    uiGrade: BASE_GRADES[0].value as
      | (typeof BASE_GRADES)[number]['value']
      | (typeof ELEMENTARY_GRADES)[number]['value'],
    uiSemester: SEMESTERS[0].value as (typeof SEMESTERS)[number]['value'],
    setSchool: (schoolValue: (typeof SCHOOLS)[number]['value']) => {
      dropdownStore.uiSchool = schoolValue
      dropdownStore.uiGrade = BASE_GRADES[0].value
    },
    setGrade: (gradeValue: (typeof BASE_GRADES)[number]['value']) => {
      dropdownStore.uiGrade = gradeValue
    },
    setSemester: (semesterValue: (typeof SEMESTERS)[number]['value']) => {
      dropdownStore.uiSemester = semesterValue
    },
  }))

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Request.AssignmentContent>({
    defaultValues: {
      level: String(LEVELS[2].value),
      size: 3,
    },
  })

  const onStartAssignment: SubmitHandler<Request.AssignmentContent> = async (conditionData) => {
    // 문제리스트 불러오기
    await store.fetchAndSetAssignments({
      school: dropdownStore.uiSchool,
      grade: dropdownStore.uiGrade,
      semester: dropdownStore.uiSemester,
      level: conditionData.level,
      size: conditionData.size,
    })
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
            <FlexBox gap="lg">
              {/* 학교 */}
              <Dropdown
                width={80}
                value={dropdownStore.uiSchool}
                onChange={(value) => {
                  dropdownStore.setSchool(value)
                }}
              >
                {SCHOOLS?.map(({ label, value }) => (
                  <DropdownItem key={value} value={value} data-mathflat-unique-id={value}>
                    {label}
                  </DropdownItem>
                ))}
              </Dropdown>

              {/* 학년 */}
              <Dropdown
                width={80}
                value={dropdownStore.uiGrade}
                onChange={(value) => {
                  dropdownStore.setGrade(value)
                }}
              >
                <>
                  {dropdownStore.uiSchool === SCHOOLS[0].value ? (
                    <>
                      {ELEMENTARY_GRADES.map(({ value, label }) => {
                        return (
                          <DropdownItem key={value} value={value} data-mathflat-unique-id={value}>
                            {label}
                          </DropdownItem>
                        )
                      })}
                    </>
                  ) : (
                    <>
                      {BASE_GRADES.map(({ value, label }) => {
                        return (
                          <DropdownItem key={value} value={value} data-mathflat-unique-id={value}>
                            {label}
                          </DropdownItem>
                        )
                      })}
                    </>
                  )}
                </>
              </Dropdown>

              {/* 학기 */}
              <Dropdown
                width={80}
                value={dropdownStore.uiSemester}
                onChange={(value) => {
                  dropdownStore.setSemester(value)
                }}
              >
                {SEMESTERS?.map(({ label, value }) => (
                  <DropdownItem key={value} value={value} data-mathflat-unique-id={value}>
                    {label}
                  </DropdownItem>
                ))}
              </Dropdown>
            </FlexBox>
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
