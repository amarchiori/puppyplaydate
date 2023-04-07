import type { ReactNode } from "react"
import Header from "./header"
import Footer from "./footer"
import Head from "next/head"



type LayoutProps = {children?: ReactNode}

const Layout = (props: LayoutProps) => {
    return (
    <>
      <Head>
        <meta name="viewport" content="height=device-height, initial-scale=1.0, viewport-fit=cover" />
      </Head>
      <Header/>
      <main className="min-h-screen font-sans w-screen overflow-hidden">{ props.children }</main>
      <Footer/>
    </>
  )
}

export default Layout;