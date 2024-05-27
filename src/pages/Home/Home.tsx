import { FC, useEffect, useState } from 'react'
import Page from '../../layouts/Page'
import Section from '../../layouts/Section'
import Modal from './Modal'
import FirstNameLastNameForm from './FirstNameLastNameForm'
import AgeForm from './AgeForm'
import ReviewForm from './ReviewForm'

const Home: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [isNextDisabled, setIsNextDisabled] = useState(true)
  const [age, setAge] = useState('')

  const validateForm = () => {
    switch (currentStep) {
      case 1:
        setIsNextDisabled(!(firstName.trim() && lastName.trim()))
        break
      case 2:
        setIsNextDisabled(!(age.trim() && !Number.isNaN(Number(age)) && Number(age) > 0))
        break
      case 3:
        setIsNextDisabled(false)
        break
      default:
        setIsNextDisabled(true)
    }
  }

  useEffect(() => {
    validateForm()
  }, [firstName, lastName, age, currentStep])

  const handleNextStep = () => {
    if (!isNextDisabled) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBackStep = () => {
    setCurrentStep(currentStep - 1)
  }

  const handleFinish = () => {
    console.log('Data Submitted:', { firstName, lastName, age })
    setCurrentStep(1)
    setFirstName('')
    setLastName('')
    setAge('')
    setIsModalOpen(false)
  }

  const updateFirstName = (name: string) => {
    setFirstName(name)
    validateForm()
  }

  const updateLastName = (name: string) => {
    setLastName(name)
    validateForm()
  }

  return (
    <Page>
      <Section className='max-w-max'>
        <Modal
          onClose={handleFinish}
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
            />
          )}
          {currentStep === 2 && <AgeForm age={age} setAge={setAge} />}
          {currentStep === 3 && <ReviewForm firstName={firstName} lastName={lastName} age={age} />}
        </Modal>
      </Section>
    </Page>
  )
}

export default Home
