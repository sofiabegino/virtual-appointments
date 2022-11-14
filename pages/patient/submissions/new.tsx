import { Fragment, useState } from 'react'
import { InformationCircleIcon, ArrowLongLeftIcon } from '@heroicons/react/20/solid'
import { PatientLayout } from '../../../components/layouts';
import { yupResolver } from '@hookform/resolvers/yup'
import FormInput from '../../../components/ui/FormInput';
import { FormProvider, useForm } from 'react-hook-form';
import { IUser } from '../../../interfaces';
import { validationsRegister } from '../../../utils/validations';
import Button from '../../../components/ui/Button';
import Header from '../../../components/ui/Header';

const PendingSubmissions = () => {

    const [error, setError] = useState({ email: '', name: '', password: '', confirm_password: '' })

    const methods = useForm<IUser>({
        resolver: yupResolver(validationsRegister)
    })

    const isLoading = false;
    const disabledButton = false;

    const onSubmit = () => {
        null
    }

    return (
        <PatientLayout title="submissions" pageDescription='pag de submissions'>
            <div className="bg-white">
                <div className="mx-auto max-w-7xl py-16 px-4 sm:px-6 lg:py-4 lg:px-8">
                    <div className="divide-y divide-gray-200">
                        <Header title='New submission' type='patient'></Header>
                        <div className="mt-6 pt-6 lg:space-y-6">
                            <FormProvider {...methods}>
                                <form onSubmit={methods.handleSubmit(onSubmit)} className='space-y-6' action='#' method='POST' noValidate>
                                    <div className='space-y-4'>
                                        <FormInput name='title' label='Title' error={error.name} />
                                        <FormInput name='symptoms' label='Symptoms' type='textarea' error={error.email} />
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
        </PatientLayout >
    )
}

export default PendingSubmissions