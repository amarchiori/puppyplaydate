import { AppProps } from 'next/app'
import Layout from '../components/layout/Layout'
import { PuppyProvider } from '../context/puppiesContext'
import { SessionProvider } from 'next-auth/react'
import '../styles/globals.css'


export default function App({ 
  Component, 
  pageProps: { session, ...pageProps}
}: AppProps) {

  return (
    <SessionProvider session={session}>
        <PuppyProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </PuppyProvider>
    </SessionProvider>
  )
}