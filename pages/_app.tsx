import { AppProps } from 'next/app'
import Layout from '../components/layout/Layout'
import { PuppyProvider } from '../context/puppiesContext'
import '../styles/globals.css'


export default function App({ Component, pageProps }: AppProps) {

  return (
    <PuppyProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </PuppyProvider>
  )
}