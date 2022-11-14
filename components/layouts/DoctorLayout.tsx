import { FC, Fragment, PropsWithChildren, useState } from 'react'
import { Dialog, Menu, Transition } from '@headlessui/react'
import {
  Bars3BottomLeftIcon,
  BellIcon,
  CalendarIcon,
  ChartBarIcon,
  Bars3Icon,
  FolderIcon,
  HomeIcon,
  InboxIcon,
  UsersIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import Head from 'next/head';
import { SideBar } from '../ui/Sidebar';

const navigation = [
  { name: 'Home', href: '#', icon: HomeIcon, current: true },
  { name: 'Task History', href: '#', icon: InboxIcon, current: false },
]

const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

interface Props {
    title: string;
    pageDescription: string;
    imageFullUrl?: string;
}

export const DoctorLayout: FC<PropsWithChildren<Props>> = ({ children,title,pageDescription,imageFullUrl }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

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

           <SideBar type='doctor'>
           {children}
           </SideBar>

            <footer>
            </footer>

        </>

      
    </>
  )
}