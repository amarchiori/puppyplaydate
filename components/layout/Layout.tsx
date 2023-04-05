import type { ReactNode } from "react"
import Header from "./header"
import Footer from "./footer"



type LayoutProps = {children?: ReactNode}

const Layout = (props: LayoutProps) => {
    return (
    <>
      <Header/>
      <main className="font-sans w-screen overflow-hidden">{ props.children }</main>
      <Footer/>
    </>
  )
}

export default Layout;