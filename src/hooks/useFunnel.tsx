import { useState } from 'react'

type useFunnelProps = {
  baseStep: number
  maxStep: number
}

export const useFunnel = ({ baseStep = 0, maxStep }: useFunnelProps) => {
  const [step, setStep] = useState(baseStep)

  const isFirstStep: boolean = Boolean(step <= 0)
  const isLastStep: boolean = Boolean(step && maxStep && step >= maxStep)

  const onNextStep = () => {
    if (isLastStep) return
    setStep((prev) => prev + 1)
  }

  const onPrevStep = () => {
    if (isFirstStep) return
    setStep((prev) => prev - 1)
  }

  return {
    currentStep: step,
    isFirstStep,
    isLastStep,
    onNextStep,
    onPrevStep,
  }
}
