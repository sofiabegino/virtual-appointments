import React from 'react'
import { ArrowLongLeftIcon } from '@heroicons/react/24/outline'
import { PropsWithChildren, useContext } from 'react';
import { useRouter } from 'next/router';
import { AuthContext } from '../../context/auth';

interface Props {
    title?: string
    subTitle?: string
}

const Header: React.FC<PropsWithChildren<Props>> = ({
    subTitle = '',
    title = '',
}) => {


    const { user } = useContext(AuthContext)
    const router = useRouter()

    return (
        <>
            {user && <div>
                <button onClick={() => router.back()}>
                    <ArrowLongLeftIcon className="h-7 w-7 text-gray-900" aria-hidden="true" />
                </button>
                <div className='flex justify-between'>
                    <div className="mt-6 lg:grid lg:grid-cols-3 lg:gap-8">
                        <div className="mt-8 gap-12 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-12 lg:col-span-2 lg:mt-0">
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <h2 className="text-2xl text-gray-900 sm:text-2xl sm:tracking-tight"> {title}</h2>
                                </div>

                            </div>
                            {subTitle && <div className="mt-2 text-base text-gray-800">
                                <p>{subTitle}</p>
                            </div>}
                        </div>
                    </div>
                    </div>
                </div>
                }
        </>
    )
}

export default Header
