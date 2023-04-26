import React, { FC, PropsWithChildren } from 'react'

interface Props {
    color: string
    text: string | undefined
    icon: JSX.Element
    file?: string,
}

const PrescriptionStatus: FC<PropsWithChildren<Props>> = ({ color, text, icon, file = '' }) => {

    const getByColor = (color: string) => {
        return (color == 'gray') ? [`bg-gray-100`, `text-gray-800`]
            : [`bg-blue-100`, `text-blue-800`];
    }

    return (
        <>
            {text == 'Download' ?

                <div className="rounded-md mt-2 border-solid border border-gray-200 p-4">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            {icon}
                        </div>
                        <div className="ml-3 flex-1 md:flex md:justify-between">
                            <p className="text-sm text-gray-800">{file.substring(38)}</p>
                        </div>
                        <div>
                            <a href={file} className="text-sm text-blue-600">Download</a>
                        </div>
                    </div>
                </div>
                : <div className={`rounded-md mt-2 ${getByColor(color)[0]} p-4`}>
                    <div className="flex">
                        <div className="flex-shrink-0">
                            {icon}
                        </div>
                        <div className="ml-3 flex-1 md:flex md:justify-between">
                            <p className={`text-sm ${getByColor(color)[1]}`}>{text}</p>
                        </div>
                    </div>
                </div>}

        </>
    )
}

export default PrescriptionStatus
