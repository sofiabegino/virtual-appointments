import { ArrowLongLeftIcon, InformationCircleIcon, LinkIcon, NoSymbolIcon } from '@heroicons/react/24/outline';
import { FC, PropsWithChildren, useState, useContext } from 'react';
import { ISubmission, IUpdateSubmission } from '../../../backend/interfaces/ISubmission';
import { AuthContext } from '../../context/auth/AuthContext';
import Input from './Input';
import { useRouter } from 'next/router';
import { useMutation } from 'react-query';
import { submissionDoctor } from '../../pages/api/submissionsApi';
import { uploadFile } from '../../pages/api/uploadFile';
import { colorOfStatus, getFormattedDate } from '../../utils/utils';
import LoadingSpinner from './LoadingSpinner';
import PrescriptionStatus from './PrescriptionStatus';
import { toast } from 'react-toastify';

interface Props {
    submission: ISubmission
    handleClick: any
}

export const Submissions: FC<PropsWithChildren<Props>> = ({ submission, handleClick }) => {

    const [currentFile, setCurrentFile] = useState<FormData>();
    const router = useRouter()
    const { user } = useContext(AuthContext);

    const {
        mutate: upload,
        isLoading: isLoadingFile,
    } = useMutation(async (formData: FormData) => await uploadFile(formData), {
        onError(error: any) {
            alert(error);
        }, onSuccess(data) {
            const sub = {
                id: submission.id,
                file: data.data["Location"],
                status: "Done",
            }
            submissionButton(sub);
        },
    })

    const {
        mutate: submissionButton,
        isLoading
    } = useMutation(async (sub: IUpdateSubmission) => await submissionDoctor(sub), {
        onError(error: any) {
            alert(error);
        },
        onSuccess(data) {
            let title = data.data.status == 'In progress' ? 'Submission accepted' : 'Submission finished'
            toast.success(title, {
                autoClose: 2000,
                hideProgressBar: true,
                theme: "light",
            })
            handleClick(true);
        },
    })

    const onAccept = () => {
        const sub = {
            id: submission?.id,
            doctorId: user?.id,
            status: "In progress"
        }
        submissionButton(sub);
    }

    const onFinish = async () => {
        if (currentFile) upload(currentFile);
    }

    const setPrescription = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = event.target;
        const selectedFiles = files as FileList;
        const formData = new FormData();
        formData.append('file', selectedFiles?.[0]);
        setCurrentFile(formData);
    };


    return (
        <>
            {user && submission &&
                <>
                    <div>
                        <button onClick={() => router.back()}>
                            <ArrowLongLeftIcon className="h-7 w-7 text-gray-900" aria-hidden="true" />
                        </button>
                        <div className='flex justify-between'>
                            <div className="mt-6 lg:grid lg:grid-cols-3 lg:gap-8">
                                <div className="mt-8 gap-12 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-12 lg:col-span-2 lg:mt-0">
                                    <div className="flex">
                                        <div className="flex-shrink-0">
                                            <h2 className="text-2xl text-gray-900 sm:text-2xl sm:tracking-tight"> {submission.title}</h2>
                                        </div>
                                        <div className="ml-3 flex-1 md:flex md:justify-between">
                                            <span className={`inline-flex rounded-full ${colorOfStatus(submission.status)[0]} px-3 text-sm 
                                                font-medium items-center ${colorOfStatus(submission.status)[1]}`}>
                                                {submission.status}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="mt-2 text-base text-gray-500">
                                        <p> {user.role == 'Patient' ? submission.doctor?.name : submission.user?.name} 
                                        {user.role == 'Patient' && submission.status == 'Pending' ? null : ' •'} {getFormattedDate(submission.createdAt!)}</p>
                                    </div>
                                </div>
                            </div>
                            <div />
                            {user.role == 'Doctor' && submission.status != 'Done' &&
                                <>
                                    {submission.status == 'Pending' ?
                                        <button
                                            type="button"
                                            onClick={() => onAccept()}
                                            className="items-center h-9 self-end rounded border border-transparent bg-blue-600 px-4 
                                    text-sm text-white hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                        >
                                            Accept submission
                                        </button>
                                        : submission.status == 'In progress' &&
                                        <button
                                            type="button"
                                            onClick={() => onFinish()}
                                            disabled={!currentFile}
                                            className="items-center h-9 self-end rounded border border-transparent bg-blue-600 px-4 
                                    text-sm text-white hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
                                    disabled:opacity-50"
                                        >

                                            {isLoading || isLoadingFile
                                                ? <LoadingSpinner />
                                                : <>
                                                    Finish submission
                                                </>}
                                        </button>
                                    }
                                </>}
                        </div>
                    </div>
                    <div className="mt-6 pt-6 lg:space-y-6">
                        <div className="mt-8 grid grid-cols-2 gap-12 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-12 lg:col-span-2 lg:mt-0">
                            <Input title='Email address' value={submission?.user?.email}></Input>
                            <Input title='Phone' value={submission?.user?.phoneNumber}></Input>
                        </div>
                        <Input title='Other info' value={submission?.user?.otherInfo}></Input>
                        <Input title='Symptoms' value={submission.symptoms}></Input>
                        <div>
                            <div>
                                <h3 className="text-m leading-6 font-medium text-gray-500">Prescriptions</h3>
                                {submission.status == 'Done' ?
                                    <PrescriptionStatus color={'gray'} icon={<LinkIcon className="h-5 w-5 text-gray-800" aria-hidden="true" />}
                                        text={'Download'} file={submission.file} />
                                    : user.role == 'Doctor' && submission.status == 'In progress' ?
                                        <div>
                                            <div>
                                                <input className="block w-full mt-2 text-sm file:p-2 file:border-none text-gray-900 
                                                    file:bg-blue-100 file:text-blue-900 file:rounded-lg cursor-pointer
                                                    dark:text-gray-400 focus:outline-none dark:placeholder-gray-400"
                                                    type="file" onChange={(e) => setPrescription(e)} />
                                            </div>
                                        </div>
                                        : user.role == 'Doctor' ?
                                            <PrescriptionStatus color={'blue'} icon={<InformationCircleIcon className="h-5 w-5 text-blue-800" aria-hidden="true" />}
                                                text={'Accept this submission to add a diagnosis'} />
                                            :
                                            <PrescriptionStatus color={'gray'} icon={<NoSymbolIcon className="h-5 w-5 text-gray-800" aria-hidden="true" />}
                                                text={'No prescription has been added yet'} />
                                }
                            </div>
                        </div>
                    </div>
                </>}

        </>
    )
}