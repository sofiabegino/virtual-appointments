import { ArrowLongLeftIcon, InformationCircleIcon } from '@heroicons/react/24/outline';
import { FC, PropsWithChildren, useState } from 'react'

interface Data {
    title: string,
    name: string,
    date: string,
    status: string,
}

interface Props {
    columns: string[];
    status: string;
}

export const Submissions: FC<PropsWithChildren<Props>> = ({ columns,status }) => {

    const colorOfStatus = (status:string) => {
        return status == 'Pending' ? 'blue' : status == 'In progress' ? 'green' : 'gray' 
    }

    return (
        <>
              <div className="bg-white">
                <div className="mx-auto max-w-7xl py-16 px-4 sm:px-6 lg:py-4 lg:px-8">
                    <div className="divide-y divide-gray-200">
                        <div>
                            <ArrowLongLeftIcon className="h-7 w-7 text-gray-900" aria-hidden="true" />
                            <div className='flex justify-between'>
                                <div className="mt-6 lg:grid lg:grid-cols-3 lg:gap-8">
                                    <div className="mt-8 gap-12 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-12 lg:col-span-2 lg:mt-0">
                                        <div className="flex">
                                            <div className="flex-shrink-0">
                                                <h2 className="text-2xl text-gray-900 sm:text-2xl sm:tracking-tight">Hepatic infarction</h2>
                                            </div>
                                            <div className="ml-3 flex-1 md:flex md:justify-between">
                                                <span className="inline-flex rounded-full bg-blue-100 px-3 text-sm font-medium items-center text-blue-800">
                                                    {status}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="mt-2 text-base text-gray-500">
                                            <p>Theresa Webb • 3/4/16</p>
                                        </div>
                                    </div>
                                </div>
                                <div />
                                <button
                                    type="button"
                                    className="items-center h-9 self-end rounded border border-transparent bg-blue-600 px-4 
                                    text-sm text-white hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                >
                                    Accept submission
                                </button>
                            </div>
                        </div>
                        <div className="mt-6 pt-6 lg:space-y-6">
                            <div className="mt-8 grid grid-cols-2 gap-12 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-12 lg:col-span-2 lg:mt-0">
                                <div>
                                    <h3 className="text-m leading-6 font-medium text-gray-500">Email address</h3>
                                    <div className="mt-2 text-base text-gray-900">
                                        <p>theresawebb@example.com</p>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-m leading-6 font-medium text-gray-500">Phone</h3>
                                    <div className="mt-2 text-base text-gray-900">
                                        <p>(406) 555-0120</p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-m leading-6 font-medium text-gray-500">Other info</h3>
                                <div className="mt-2 text-base text-gray-900">
                                    <p>Partial excision (craterization, saucerization, or diaphysectomy) bone (eg, osteomyelitis); proximal or middle phalanx of finger</p>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-m leading-6 font-medium text-gray-500">Symptoms</h3>
                                <div className="mt-2 text-base text-gray-900">
                                    <p>Stomach and abdominal pain, cramps and fever</p>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <h3 className="text-m leading-6 font-medium text-gray-500">Prescriptions</h3>

                                    <input className="block w-full mt-2 text-sm file:p-2 file:border-none text-gray-900 file:bg-blue-100 file:text-blue-900 file:rounded-lg cursor-pointer
 dark:text-gray-400 focus:outline-none dark:placeholder-gray-400"
                                        id="file_input" type="file">

                                    </input>
                                </div>
                            </div>
                            <div className="rounded-md bg-blue-50 p-4">
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <InformationCircleIcon className="h-5 w-5 text-blue-800" aria-hidden="true" />
                                </div>
                                <div className="ml-3 flex-1 md:flex md:justify-between">
                                    <p className="text-sm text-blue-800">Accept this submission to add a diagnosis</p>
                                    {/* <p className="mt-3 text-sm md:mt-0 md:ml-6">
                            <a href="#" className="whitespace-nowrap font-medium text-blue-700 hover:text-blue-600">
                                Details
                                <span aria-hidden="true"> &rarr;</span>
                            </a>
                        </p> */}
                                </div>
                            </div>
                        </div>

                        </div>


                        
                    </div>

                </div>

            </div>
        </>
    )
}