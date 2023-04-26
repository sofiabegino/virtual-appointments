import { useContext, useEffect, useMemo, useState } from 'react'
import { Layout } from '../../components/layouts';
import { yupResolver } from '@hookform/resolvers/yup'
import FormInput from '../../components/ui/FormInput';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import Button from '../../components/ui/Button';
import Header from '../../components/ui/Header';
import { IUpdateUser } from '../../../backend/interfaces/IUser';
import { useMutation } from 'react-query';
import { updateUserSchema } from '../../../backend/schemas/user.schema';
import { NextPage } from 'next';
import Modal from '../../components/ui/Modal';
import router from 'next/router';
import { AuthContext } from '../../context/auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Props {
    user: IUpdateUser
}

const UpdateProfile: NextPage<Props> = () => {

    const { user,updateUser } = useContext(AuthContext);

    const [error, setError] = useState({ otherInfo: '', weight: '', height: '', phoneNumber: ''})

    const  methods = useForm<IUpdateUser>({
        resolver: yupResolver(updateUserSchema),
        defaultValues: useMemo(() => {
            return  {otherInfo: user?.otherInfo ?? '' ,
            phoneNumber: user?.phoneNumber ?? '',
            weight: user?.weight ?? undefined,
            height: user?.height ?? undefined,}
          }, [user])
    })
    
    
    const {
        mutate: updateProfile,
        isLoading,
      } = useMutation(async (userInfo: IUpdateUser) => await updateUser(userInfo), {
        onError (error: any) {
            alert(error);
        },
        onSuccess() {
            toast.success("Profile updated",{
                autoClose: 2000,
                hideProgressBar: true,
                theme: "light",
            })
            router.push('submissions')
        },
      })

    const disabledButton = !((methods.formState.errors?.otherInfo) == null) || !((methods.formState.errors?.weight) == null) 
    || !((methods.formState.errors?.height) == null) || !((methods.formState.errors?.phoneNumber) == null) 
      
    const onSubmit: SubmitHandler<IUpdateUser> = (values) => {
        const userInfo= {
            id: user?.id,
            ...values,
        }
        updateProfile(userInfo)
    }
    
    return (
        <Layout title="Profile" pageDescription='Profile'>
            {user && <div className="bg-white">
                <div className="mx-auto max-w-7xl py-16 px-4 sm:px-6 lg:py-4 lg:px-8">
                    <div className="divide-y divide-gray-200">
                        <Header title='Patient information' subTitle='You need to complete your profile before adding a submission'></Header>
                        <div className="mt-6 pt-6 lg:space-y-6">
                            <FormProvider {...methods}>
                                <form onSubmit={methods.handleSubmit(onSubmit)} className='space-y-6' action='#' method='POST' noValidate>
                                    <div className='space-y-4'>
                                        <FormInput name='phoneNumber' label='Phone number' error={error.phoneNumber} />
                                        <div className='flex max-w-lg space-x-2'>
                                            <div className='w-full'>
                                                <FormInput name='weight' label='Weight' error={error.weight} />
                                            </div>
                                            <div className='w-full'>
                                                <FormInput name='height' label='Height' error={error.height} />
                                            </div>
                                        </div>
                                        <FormInput name='otherInfo' label='Other info' type='textarea' error={error.otherInfo} />
                                    </div>
                                    <div>
                                        <Button label='Update profile' isLoading={isLoading} disabled={disabledButton} />
                                    </div>
                                </form>
                            </FormProvider>
                        </div>

                    </div>
                </div>
            </div>}
        </Layout >
    )
}
    
export default UpdateProfile