import React, { useCallback, useEffect, useState } from 'react'
import * as yup from 'yup'
import debounce from '../../utils/debounce'

interface FirstNameLastNameFormProps {
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
      'Only alphabetic EN and HE characters and single spaces allowed'
    )

    .required('This field is required'),
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
          setError('An unexpected error occurred')
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
        setFirstNameError('This field is required')
      }
    }, 250),
    [firstName, touchedFirstName, validateField]
  )

  const debouncedValidateLastName = useCallback(
    debounce(() => {
      if (lastName) {
        validateField('lastName', lastName, setLastNameError)
      } else if (touchedLastName) {
        setLastNameError('This field is required')
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
    <div className='m-6 p-6 bg-white rounded-lg shadow-md'>
      <h2 className='text-xl font-bold mb-4 text-gray-800 max-w-max mx-auto'>
        Enter Your Name (1/3)
      </h2>
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
    </div>
  )
}

export default FirstNameLastNameForm
