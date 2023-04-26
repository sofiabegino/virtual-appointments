import { FC, PropsWithChildren, useContext } from 'react';
import NextLink from 'next/link';
import { ISubmission } from '../../../backend/interfaces/ISubmission';
import { colorOfStatus, getFormattedDate } from '../../utils/utils';
import { AuthContext } from '../../context/auth/AuthContext';
import { IUser } from '../../interfaces';

interface Props {
    columns: string[];
    data: ISubmission[];
}

export const Table: FC<PropsWithChildren<Props>> = ({ columns, data }) => {

    const { user,isLoggedIn } = useContext(AuthContext)

    const navigateTo = (user: IUser, id: number) => {
        let _id: string = id.toString();
        return user.role == 'Doctor' ? `/submissions/${_id}` : `/submissions/${_id}`
    }

    return (
        <>
            <div className="px-4 sm:px-6 lg:px-8">
                <div className="mt-5 flex flex-col">
                    {user && data && Object.keys(data).length > 0 ?
                        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                                    <table className="min-w-full">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                {columns.map((title: string) => (
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
                                            {data?.map((data, personIdx) => (
                                                <tr key={personIdx} className={personIdx % 2 === 0 ? undefined : 'bg-gray-50'}>
                                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-900 sm:pl-6">
                                                        {data.title}
                                                    </td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                                                        {user.role == 'Patient' ? data.doctor?.name : data.user?.name}
                                                    </td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{getFormattedDate(data.createdAt)}</td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                        <span className={`inline-flex rounded-full ${colorOfStatus(data.status)[0]} px-2 
                                                    text-sm font-medium leading-5 ${colorOfStatus(data.status)[1]}`}>
                                                            {data.status}
                                                        </span>
                                                    </td>

                                                    <td className="relative whitespace-nowrap py-4 pr-4 text-right text-sm sm:pr-6">
                                                        <NextLink href={navigateTo(user, data.id)} className="text-blue-600 hover:text-indigo-900">
                                                            View more<span className="sr-only">, {data.name}</span>
                                                        </NextLink>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div> :
                        <div className="rounded-md mt-2 bg-blue-100 p-4">
                            <div className="flex">
                                <div className="ml-3 flex-1 md:flex md:justify-between">
                                    <p className="text-sm text-blue-800">There are no submissions</p>
                                </div>
                            </div>
                        </div>

                    }
                </div>

            </div>
        </>
    )
}