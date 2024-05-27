import { FC, useState } from 'react'

import Page from '../../layouts/Page'
import Section from '../../layouts/Section'
import Modal from './Modal'
import FirstNameLastNameForm from './FirstNameLastNameForm'
import AgeForm from './AgeForm'
import ReviewForm from './ReviewForm'
import LocalStorage from '../../utils/localStorage'

const Home: FC = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [isNextDisabled, setIsNextDisabled] = useState(true)
  const [age, setAge] = useState('')
  const [showToast, setShowToast] = useState(false)

  const userDataStorage = new LocalStorage('userData', '{}')

  const handleNextStep = () => {
    if (!isNextDisabled) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBackStep = () => {
    setCurrentStep(currentStep - 1)
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

  const updateFirstName = (name: string) => {
    setFirstName(name)
  }

  const updateLastName = (name: string) => {
    setLastName(name)
  }

  const handleValidationChange = (isValid: boolean) => {
    setIsNextDisabled(!isValid)
  }

  return (
    <Page>
      <Section className='max-w-max'>
        <Modal
          currentStep={currentStep}
          handleNextStep={handleNextStep}
          handleBackStep={handleBackStep}
          handleFinish={handleFinish}
          isNextDisabled={isNextDisabled}
        >
          {currentStep === 1 && (
            <FirstNameLastNameForm
              firstName={firstName}
              lastName={lastName}
              setFirstName={updateFirstName}
              setLastName={updateLastName}
              onValidationChange={handleValidationChange}
            />
          )}
          {currentStep === 2 && (
            <AgeForm age={age} setAge={setAge} onValidationChange={handleValidationChange} />
          )}
          {currentStep === 3 && <ReviewForm firstName={firstName} lastName={lastName} age={age} />}
        </Modal>
      </Section>

      {showToast && (
        <div className='toast toast-top toast-center'>
          <div className='alert alert-success'>
            <span>Profile data saved successfully.</span>
          </div>
        </div>
      )}
    </Page>
  )
}

export default Home
