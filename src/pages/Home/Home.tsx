import { FC, useState } from 'react'

import Page from '../../layouts/Page'
import Section from '../../layouts/Section'
import Modal from './Modal'
import FirstNameLastNameForm, { FirstNameLastNameFormProps } from './FirstNameLastNameForm'
import AgeForm, { AgeFormProps } from './AgeForm'
import ReviewForm, { ReviewFormProps } from './ReviewForm'
import LocalStorage from '../../utils/localStorage'
import { FormContextProvider } from '../../context/FormContextProvider'
import Toast from '../../components/ui/Toast'

interface State {
  firstName: string
  lastName: string
  age: string
}

interface Handlers {
  setFirstName: (name: string) => void
  setLastName: (name: string) => void
  setAge: (age: string) => void
  handleValidationChange: (isValid: boolean) => void
}

export const STEPS = [
  {
    id: 1,
    Component: (props: FirstNameLastNameFormProps) => <FirstNameLastNameForm {...props} />,
    getProps: (state: State, handlers: Handlers): FirstNameLastNameFormProps => ({
      firstName: state.firstName,
      lastName: state.lastName,
      setFirstName: handlers.setFirstName,
      setLastName: handlers.setLastName,
      onValidationChange: handlers.handleValidationChange,
    }),
  },
  {
    id: 2,
    Component: (props: AgeFormProps) => <AgeForm {...props} />,
    getProps: (state: State, handlers: Handlers): AgeFormProps => ({
      age: state.age,
      setAge: handlers.setAge,
      onValidationChange: handlers.handleValidationChange,
    }),
  },
  {
    id: 3,
    Component: (props: ReviewFormProps) => <ReviewForm {...props} />,
    getProps: (state: State): ReviewFormProps => ({
      firstName: state.firstName,
      lastName: state.lastName,
      age: state.age,
    }),
  },
] as const

const Home: FC = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [isNextDisabled, setIsNextDisabled] = useState(true)
  const [age, setAge] = useState('')
  const [showToast, setShowToast] = useState(false)

  const userDataStorage = new LocalStorage('userData', '{}')

  const handleNextStep = () => {
    if (!isNextDisabled && currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBackStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleFinish = () => {
    console.info('Data Submitted:', { firstName, lastName, age })

    userDataStorage.save({ firstName, lastName, age })

    setCurrentStep(1)
    setFirstName('')
    setLastName('')
    setAge('')

    setShowToast(true)
    setTimeout(() => setShowToast(false), 3000)
  }

  const handleValidationChange = (isValid: boolean) => {
    setIsNextDisabled(!isValid)
  }

  const state = {
    firstName,
    lastName,
    age,
  }

  const handlers = {
    setFirstName,
    setLastName,
    setAge,
    handleValidationChange,
  }

  return (
    <Page>
      <FormContextProvider>
        <Section className='max-w-max'>
          <Modal
            currentStep={currentStep}
            handleNextStep={handleNextStep}
            handleBackStep={handleBackStep}
            handleFinish={handleFinish}
            isNextDisabled={isNextDisabled}
          >
            {STEPS.map(step => {
              if (currentStep === step.id) {
                const StepComponent = step.Component as FC
                const stepProps = step.getProps(state, handlers)
                return <StepComponent key={step.id} {...stepProps} />
              }
              return null
            })}
          </Modal>
        </Section>
        <Toast message='Profile data saved to local storage' isVisible={showToast} />
      </FormContextProvider>
    </Page>
  )
}

export default Home
