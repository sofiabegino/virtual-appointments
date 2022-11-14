import React, { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'

interface FormInputProps {
  name: string
  label?: string
  type?: string
  options?: string[];
  error?: string
}

const FormInput: React.FC<FormInputProps> = ({
  name,
  label = '',
  type = 'text',
  options = [''],
  error = ''
}) => {
  const {
    register,
    formState: { errors }
  } = useFormContext()

  const [showPassword, setShowPassword] = useState(false)

  const toggleShowPassword = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    setShowPassword(!showPassword)
  }

  return (
    <>
      <div className='relative'>
      <h3 className="text-sm leading-6 text-gray-700">{label}</h3>
      {type === 'password' &&
          <span className='absolute mt-4 right-2 flex items-center pl-2 z-10'>
            <button onClick={(e) => toggleShowPassword(e)}>
              {showPassword
                ? <EyeIcon className='h-6 font-extralight' />
                : <EyeSlashIcon className='h-6 font-extralight' />}
            </button>
          </span>}
        {(type === 'textarea') ? 
            <textarea
            rows={4}
            name="comment"
            id="comment"
            className={`block w-full mt-2 max-w-lg resize-none rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
        /> :
        type === 'select' ?
          <select className="block rounded-md mt-2 w-full border-gray-300 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          {...register(name)}>
            { options.map((opt) =>
              <option value='hola'>{opt}</option>
            )}
          </select>
        :
            <input
            className={`block w-full mt-2 max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
            type={showPassword ? 'text' : type}
            {...register(name)}
            />
        }


      </div>
      {(errors[name] != null) && <span className='mt-2 text-sm text-red-600 dark:text-red-500'>{errors[name]?.message as string}</span>}
      {error && <span className='mt-2 text-sm text-red-600 dark:text-red-500'>{error}</span>}
    </>
  )
}

export default FormInput
