import { InformationCircleIcon, ArrowLongLeftIcon } from '@heroicons/react/20/solid'
import { DoctorLayout } from '../../../components/layouts';
import Header from '../../../components/ui/Header';


const submission = {
    title: 'Hepatic infarction', name: 'Theresa Webb', date: '3/4/16', status: 'In progress',
    email: 'theresawebb@gmail.com', phone: '(406) 555 0120', other_info: 'Partial excision (craterization, saucerization, or diaphysectomy) bone (eg, osteomyelitis); proximal or middle phalanx of finger',
    symptoms: 'Stomach and abdominal pain, cramps and fever',
}

const PendingSubmissions = () => {

    return (
        <DoctorLayout title="submissions" pageDescription='pag de submissions'>
            <div className="bg-white">
                <div className={`mx-auto max-w-7xl py-16 px-4 sm:px-6 lg:py-4 lg:px-8`}>
                    <div className="divide-y divide-gray-200">
                        <Header submission={submission} type='doctor'/>
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
                            {submission.status == 'Pending' &&
                                <div className="rounded-md bg-blue-50 p-4">
                                    <div className="flex">
                                        <div className="flex-shrink-0">
                                            <InformationCircleIcon className="h-5 w-5 text-blue-800" aria-hidden="true" />
                                        </div>
                                        <div className="ml-3 flex-1 md:flex md:justify-between">
                                            <p className="text-sm text-blue-800">Accept this submission to add a diagnosis</p>
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>

                    </div>

                </div>

            </div>
        </DoctorLayout >
    )
}

export default PendingSubmissions