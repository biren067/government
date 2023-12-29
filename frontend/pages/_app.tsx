import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { TopicProvider } from '@/context/TopicContext';

export default function App({ Component, pageProps }: AppProps) {
  return (<>
  <TopicProvider>
  {/* <Header/> */}
  <Component {...pageProps} /> 
  {/* <Footer/> */}
  </TopicProvider>
  </> )
}
