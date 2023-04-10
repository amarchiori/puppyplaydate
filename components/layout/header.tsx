import Link from "next/link"
import { useRouter } from "next/router";
import { useSession, signIn, signOut } from "next-auth/react"


const Header = () => {
  const router = useRouter();
  const { data: session } = useSession()
  

  return (
    <div className="flex bg-mainGreen align-middle justify-center md:justify-between w-screen h-10 px-10">
      <h3 className="text-white p-2 text-xl font-ppd">
          PetBook  
      </h3>
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