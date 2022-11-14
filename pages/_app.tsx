import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { AuthProvider } from '../context/auth';
import { SessionProvider } from 'next-auth/react';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>
      <AuthProvider>
          <Component {...pageProps} />
      </AuthProvider>
    </SessionProvider>
  )
}