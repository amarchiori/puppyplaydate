import Link from "next/link"
import { useSession, signIn, signOut } from "next-auth/react"


const Header = () => {
  const { data: session } = useSession()
  

  return (
    <div className="flex bg-mainGreen align-middle justify-center md:justify-between w-screen h-10 px-10">
      <Link href='/' className="text-white p-2 text-xl font-ppd">
          PetBook  
      </Link>
      { session ? (
        <div className="flex">
          <Link
          href='/profile'
          className="text-white p-2"
          >
          Profile
          </Link>
          <button 
            onClick={() => signOut()}
            className="text-white"
          >SignOut</button>
        </div>
      ) : (
        <button 
          onClick={() => signIn()}
          className="text-white"
        > Sign In
        </button>
      )
      }
    
    </div>
  )
}

export default Header