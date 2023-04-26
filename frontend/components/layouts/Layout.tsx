import { FC, PropsWithChildren } from 'react'
import Head from 'next/head';
import { SideBar } from '../ui/Sidebar';

interface Props {
    title: string;
    pageDescription: string;
    imageFullUrl?: string;
}

export const Layout: FC<PropsWithChildren<Props>> = ({ children,title,pageDescription,imageFullUrl }) => {

  return (
    <>
      <>
            <Head>
                <title>{title}</title>
                <meta name="description" content={pageDescription} />
                <meta name="og:title" content={title} />
                <meta name="og:description" content={pageDescription} />

                {
                    imageFullUrl && (
                        <meta name="og:image" content={imageFullUrl} />
                    )
                }

            </Head>

           <SideBar>
           {children}
           </SideBar>

            <footer>
            </footer>

        </>

      
    </>
  )
}