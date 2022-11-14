import { useState, useEffect } from 'react';
import { GetServerSideProps } from 'next'
import { signIn, getSession, getProviders } from 'next-auth/react';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import DoctorImage from '../../public/doctor.png';
import { AuthLayout } from '../../components/layouts/AuthLayout';
import { yupResolver } from '@hookform/resolvers/yup';
import FormInput from '../../components/ui/FormInput';
import { IUser } from '../../interfaces';
import { validationsRegister } from '../../utils/validations';
import NextLink from 'next/link';

type FormData = {
    email: string,
    password: string,
};

const LoginPage = () => {

    const [error, setError] = useState({ email: '', name: '', password: '', confirm_password: '' })

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    const [showError, setShowError] = useState(false);

    const [providers, setProviders] = useState<any>({});

    useEffect(() => {
        getProviders().then(prov => {
            setProviders(prov)
        })
    }, [])

    const onLoginUser = async ({ email, password }: FormData) => {
        setShowError(false);
        await signIn('credentials', { email, password });
    }

    const methods = useForm<IUser>({
        resolver: yupResolver(validationsRegister)
    })

    const isLoading = false;
    const disabledButton = false;

    const onSubmit = () => {
        null
    }

    return (
        <AuthLayout title="Inicia sesión">
            <div className="flex h-screen">
                <div className="flex flex-1 flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
                    <div className="mx-auto w-full max-w-sm lg:w-96">
                        <div>
                            <h2 className="mt-6 text-3xl font-medium tracking-tight text-gray-900">Sign in to your account</h2>
                        </div>
                        <div className="mt-8">
                            <div className="mt-6">
                                <FormProvider {...methods}>
                                    <form onSubmit={methods.handleSubmit(onSubmit)} className='space-y-6' action='#' method='POST' noValidate>
                                        <FormInput name='email' label='Email address' error={error.email} />
                                        <FormInput name='password' label='Password' type='password' error={error.password} />
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center">
                                                <input
                                                    id="remember-me"
                                                    name="remember-me"
                                                    type="checkbox"
                                                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                                />
                                                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                                    Remember me
                                                </label>
                                            </div>

                                            <div className="text-sm">
                                                <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                                                    Forgot your password?
                                                </a>
                                            </div>
                                        </div>
                                        <button
                                            type="submit"
                                            className="flex w-full justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                        >
                                            Sign in
                                        </button>

                                    </form>

                                </FormProvider>
                                <p className='text-center mt-2 text-sm'>
                                    Don't have an account?  <NextLink href='/auth/register' className=' text-blue-600'>Sign up</NextLink>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="relative hidden w-0 flex-1 lg:block">
                    <img
                        className="absolute inset-0 h-full w-full object-cover"
                        src={DoctorImage.src}
                        alt=""
                    />
                </div>
            </div>
        </AuthLayout>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {

    const session = await getSession({ req });
    const { p = "/" } = query;

    if (session) {
        return {
            redirect: {
                destination: p.toString(),
                permanent: false,
            },
        };
    }

    return {
        props: {},
    };
}



export default LoginPage