import React, { FC, PropsWithChildren, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import { title } from 'process'

interface Props {
  title: string
  value: string | undefined
}

const Input: FC<PropsWithChildren<Props>> = ({title,value}) => {

  return (
    <>
    <div>
        <h3 className="text-m leading-6 font-medium text-gray-500">{title}</h3>
        <div className="mt-2 text-base text-gray-900">
            <p>{value}</p>
        </div>
        </div>
     </>
  )
}

export default Input
