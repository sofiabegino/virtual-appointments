import React from 'react'
import { LockClosedIcon } from '@heroicons/react/20/solid'
import LoadingSpinner from './LoadingSpinner'

interface ButtonProps {
  label: string
  disabled: boolean
  icon?: boolean
  isLoading?: boolean
}

const Button: React.FC<ButtonProps> = ({
  label,
  disabled,
  icon = true,
  isLoading = false
}) => {
  return (
    <>
      <button
        type='submit'
        disabled={disabled}
        className={`group relative flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium
                text-white ${!disabled && 'hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'} disabled:opacity-50`}
      >
        {isLoading 
          ? <LoadingSpinner />
          : <>
            {label}
            </>}
      </button>

    </>
  )
}

export default Button
