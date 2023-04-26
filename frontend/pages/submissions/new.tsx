import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup'
import FormInput from '../../components/ui/FormInput';
import { FormProvider, SubmitHandler, useForm} from 'react-hook-form';
import { validationsCreateSubmission } from '../../utils/validations';
import Button from '../../components/ui/Button';
import Header from '../../components/ui/Header';
import { ISubmission } from '../../../backend/interfaces/ISubmission';
import { useMutation } from 'react-query';
import { create } from '../api/submissionsApi';
import { Layout } from '../../components/layouts';
import { toast } from 'react-toastify';
import router from 'next/router';

const PendingSubmissions = () => {

    const [error, setError] = useState({ title: '', symptoms: ''})
    const methods = useForm<ISubmission>({
        resolver: yupResolver(validationsCreateSubmission)
    })
    const {
        mutate: createSubmission,
        isLoading
      } = useMutation(async (submission: ISubmission) => await create(submission), {
        onError (error: any) {
            alert(error);
        },
        onSuccess(data) {
            toast.success("Submission created",{
                autoClose: 2000,
                hideProgressBar: true,
                theme: "light",
            })
           router.push(`/submissions/${data.data}`)
        },
      })


    const disabledButton = !((methods.formState.errors?.title) == null) || !((methods.formState.errors?.symptoms) == null) 
      
    const onSubmit: SubmitHandler<ISubmission> = (values) => {
        createSubmission(values)
    }

    return (
        <Layout title="Create submission" pageDescription='Submission page'>
           
            <div className="bg-white">
                <div className="mx-auto max-w-7xl py-16 px-4 sm:px-6 lg:py-4 lg:px-8">
                    <div className="divide-y divide-gray-200">

                       <Header title='New submission'></Header>
                        <div className="mt-6 pt-6 lg:space-y-6">
                            <FormProvider {...methods}>
                                <form onSubmit={methods.handleSubmit(onSubmit)} className='space-y-6' action='#' method='POST' noValidate>
                                    <div className='space-y-4'>
                                        <FormInput name='title' label='Title' error={error.title} />
                                        <FormInput name='symptoms' label='Symptoms' type='textarea' error={error.symptoms} />
                                    </div>
                                    <div>
                                        <Button label='Send submission' isLoading={isLoading} disabled={disabledButton} />
                                    </div>
                                </form>
                            </FormProvider>
                        </div>

                    </div>
                </div>
            </div>
        </Layout >
    )
}

export default PendingSubmissions

