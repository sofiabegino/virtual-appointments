import { NextPage } from 'next';
import { getSubmission } from '../api/submissionsApi';
import { ISubmission } from '../../../backend/interfaces/ISubmission';
import { Submissions } from '../../components/ui';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { Layout } from '../../components/layouts/Layout';
import router from 'next/router';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import { useState } from 'react';
import { toast } from 'react-toastify';

interface Props {
   params: any
}


const PendingSubmissions: NextPage<Props> = ({ params }) => {

    const {
        data: submissionData,
        isLoading,
        refetch
    } = getSubmissionData()

    const { isReady } = useRouter()

    function getSubmissionData(): ({
        data: ISubmission
        isLoading: boolean
        refetch: any
    }) {
        const {
            data: submissionData,
            isLoading,
            refetch
        } = useQuery(['getSubmission'], async () => await getSubmission(params.id as string),{enabled:!!params.id})
    
        const data = submissionData?.data ?? null
    
        return {
            data,
            isLoading,
            refetch
        }
    }
   
  const handleClick = (isClicked:any) => {
    if(isClicked) refetch();
  };

    return (
        <Layout title="Submission details" pageDescription='Submission details'>
            <div className="bg-white">
                <div className={`mx-auto max-w-7xl py-16 px-4 sm:px-6 lg:py-4 lg:px-8`}>
                    <div className="divide-y divide-gray-200">
                        {
                        !isReady ? <LoadingSpinner/>
                        : 
                        submissionData && !isLoading &&
                        <Submissions submission={submissionData} handleClick={handleClick} ></Submissions>
                        }
                    </div>
                </div>
            </div>
        </Layout >
    )
}

export async function getServerSideProps(context:any) {
    return {
        props: { params: context.params },
    };
}

export default PendingSubmissions