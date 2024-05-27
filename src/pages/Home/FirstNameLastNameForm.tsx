import React, { useCallback, useEffect, useState } from 'react'
import * as yup from 'yup'
import debounce from '../../utils/debounce'
import Title from '../../components/ui/Title'
import FormLayout from '../../layouts/FormLayout'
import ERROR_MESSAGES from '../../utils/constants'

export interface FirstNameLastNameFormProps {
  firstName: string
  lastName: string
  setFirstName: (name: string) => void
  setLastName: (name: string) => void
  onValidationChange: (isValid: boolean) => void
}

const nameSchema = yup.object().shape({
  name: yup
    .string()
    .matches(
      // Matches alphabetic EN and HE characters and single spaces
      /^[A-Za-z\u0590-\u05FF\uFB1D-\uFB4F]+(?:\s[A-Za-z\u0590-\u05FF\uFB1D-\uFB4F]+)*$/,
      ERROR_MESSAGES.NAME_PATTERN
    )
    .required(ERROR_MESSAGES.NAME_REQUIRED),
})

const FirstNameLastNameForm: React.FC<FirstNameLastNameFormProps> = ({
  firstName,
  lastName,
  setFirstName,
  setLastName,
  onValidationChange,
}) => {
  const [firstNameError, setFirstNameError] = useState('')
  const [lastNameError, setLastNameError] = useState('')
  const [touchedFirstName, setTouchedFirstName] = useState(false)
  const [touchedLastName, setTouchedLastName] = useState(false)

  useEffect(() => {
    onValidationChange(
      !firstNameError && !lastNameError && firstName.trim() !== '' && lastName.trim() !== ''
    )
  }, [firstNameError, lastNameError, firstName, lastName, onValidationChange])

  const validateField = useCallback(
    async (_field: 'firstName' | 'lastName', value: string, setError: (error: string) => void) => {
      try {
        await nameSchema.validate({ name: value })
        setError('')
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message)
        } else {
          setError(ERROR_MESSAGES.UNEXPECTED_ERROR)
        }
      }
    },
    []
  )

  const debouncedValidateFirstName = useCallback(
    debounce(() => {
      if (firstName) {
        validateField('firstName', firstName, setFirstNameError)
      } else if (touchedFirstName) {
        setFirstNameError(ERROR_MESSAGES.NAME_REQUIRED)
      }
    }, 250),
    [firstName, touchedFirstName, validateField]
  )

  const debouncedValidateLastName = useCallback(
    debounce(() => {
      if (lastName) {
        validateField('lastName', lastName, setLastNameError)
      } else if (touchedLastName) {
        setLastNameError(ERROR_MESSAGES.NAME_REQUIRED)
      }
    }, 250),
    [lastName, touchedLastName, validateField]
  )

  useEffect(() => {
    debouncedValidateFirstName()
    debouncedValidateLastName()
  }, [firstName, lastName, debouncedValidateFirstName, debouncedValidateLastName])

  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputFastName = e.target.value
    setFirstName(inputFastName)
    setTouchedFirstName(true)
  }

  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputLastName = e.target.value
    setLastName(inputLastName)
    setTouchedLastName(true)
  }

  return (
    <>
      <Title>Enter Your Name (1/3)</Title>
      <FormLayout>
        <ul className='flex flex-col gap-y-4'>
          <li>
            <label className='input input-bordered flex items-center gap-2 bg-transparent'>
              First Name
              <input
                type='text'
                className='grow bg-transparent'
                placeholder='Dor'
                value={firstName}
                onChange={handleFirstNameChange}
              />
            </label>
            {firstNameError && <p className='text-red-500 text-xs mt-1'>{firstNameError}</p>}
          </li>
          <li>
            <label className='input input-bordered flex items-center gap-2 bg-transparent'>
              Last Name
              <input
                type='text'
                className='grow bg-transparent'
                placeholder='Zammir'
                value={lastName}
                onChange={handleLastNameChange}
              />
            </label>
            {lastNameError && <p className='text-red-500 text-xs mt-1'>{lastNameError}</p>}
          </li>
        </ul>
      </FormLayout>
    </>
  )
}

export default FirstNameLastNameForm
