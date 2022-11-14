import React from 'react'
import { LockClosedIcon } from '@heroicons/react/20/solid'
import LoadingSpinner from './LoadingSpinner'
import { ArrowLongLeftIcon } from '@heroicons/react/24/outline'
import { PropsWithChildren } from 'react';
import { useRouter } from 'next/router';
import NextLink from 'next/link';



interface Data {
    title: string,
    name: string,
    date: string,
    status: string,
}

interface Props {
    title?: string
    subTitle?: string
    type:string,
    submission?: Data;
}

const Header: React.FC<PropsWithChildren<Props>> = ({
    children,
    type,
    submission = { },
    subTitle = '',
    title = '',
}) => {

    const colorOfStatus = (status: string | undefined) => {
        return status == 'Pending' ? ['bg-blue-100', 'text-blue-800'] : status == 'In progress' ?
            ['bg-green-100', 'text-green-800'] : ['bg-gray-100', 'text-gray-800']
    }
    
    const router = useRouter()

    return (
        <>
            <div>
                <button onClick={()=>router.back()}>
                    <ArrowLongLeftIcon className="h-7 w-7 text-gray-900" aria-hidden="true" />
                </button>
                <div className='flex justify-between'>
                    <div className="mt-6 lg:grid lg:grid-cols-3 lg:gap-8">
                        <div className="mt-8 gap-12 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-12 lg:col-span-2 lg:mt-0">
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <h2 className="text-2xl text-gray-900 sm:text-2xl sm:tracking-tight"> {title ? title : submission.title}</h2>
                                </div>
                                {Object.keys(submission).length > 0 && <div className="ml-3 flex-1 md:flex md:justify-between">
                                    <span className={`inline-flex rounded-full ${colorOfStatus(submission.status)[0]} px-3 text-sm 
                                                font-medium items-center ${colorOfStatus(submission.status)[1]}`}>
                                        {submission.status}
                                    </span>
                                </div>}
                            </div>
                            {Object.keys(submission).length > 0  && <div className="mt-2 text-base text-gray-500">
                                <p>{submission.name} • {submission.date}</p>
                            </div>}
                            {subTitle && <div className="mt-2 text-base text-gray-800">
                                <p>{subTitle}</p>
                            </div>}
                        </div>
                    </div>
                    <div />
                    {type == 'doctor'  &&
                    <button
                        type="button"
                        className="items-center h-9 self-end rounded border border-transparent bg-blue-600 px-4 
                                    text-sm text-white hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        {submission.status == 'Pending' && 'Accept submission'}
                        {submission.status == 'In progress' && 'Finish submission'}
                    </button>
                    }
                </div>
            </div>
        </>
    )
}

export default Header
