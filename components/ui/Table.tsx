import { FC, PropsWithChildren, useState, useEffect } from 'react';
import NextLink from 'next/link';

interface Data {
    title: string,
    name: string,
    date: string,
    status: string,
}

interface Props {
    columns: string[];
    data: Data[];
    type:string,
}

export const Table: FC<PropsWithChildren<Props>> = ({ columns,data,type}) => {

    const colorOfStatus = (status:string) => {
        return status == 'Pending' ? ['bg-blue-100','text-blue-800'] : status == 'In progress' ? 
        ['bg-green-100','text-green-800'] : ['bg-gray-100','text-gray-800']
    }

    const navigateTo = (type:string) => {
       return type == 'doctor' ? '/doctor/submissions/detail' : '/patient/submissions/detail'
    }

    return (
        <>
            <div className="px-4 sm:px-6 lg:px-8">
                <div className="mt-5 flex flex-col">
                    <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                                <table className="min-w-full">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            {columns.map((title:string) => (
                                                <th
                                                key={title}
                                                    scope="col"
                                                    className="py-3 pl-3 pr-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500 sm:first:pl-6"
                                                >
                                                {title}
                                                </th>
                                            ))}
                                             <th scope="col" className="relative py-3 pl-3 pr-4 sm:pr-6">
                                                <span className="sr-only">Edit</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white">
                                        {data.map((data, personIdx) => (
                                            <tr key={personIdx} className={personIdx % 2 === 0 ? undefined : 'bg-gray-50'}>
                                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-900 sm:pl-6">
                                                    {data.title}
                                                </td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">{data.name}</td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{data.date}</td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                    <span className={`inline-flex rounded-full ${colorOfStatus(data.status)[0]} px-2 
                                                    text-sm font-medium leading-5 ${colorOfStatus(data.status)[1]}`}>
                                                        {data.status}
                                                    </span>
                                                </td>

                                                <td className="relative whitespace-nowrap py-4 pr-4 text-right text-sm sm:pr-6">
                                                    <NextLink href={navigateTo(type)} className="text-blue-600 hover:text-indigo-900">
                                                        View more<span className="sr-only">, {data.name}</span>
                                                    </NextLink>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}