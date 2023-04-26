import { FC, PropsWithChildren } from 'react';
import Head from 'next/head';

interface Props {
    title: string;
}

export const AuthLayout: FC<PropsWithChildren<Props>> = ({ children, title }) => {
    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>
            <div className="flex h-screen">
            {children}
            </div>
        </>
    )
}