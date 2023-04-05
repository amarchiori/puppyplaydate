import Link from "next/link"
import { useRouter } from "next/router";


const Header = () => {
  const router = useRouter();
  
  const isAlternateNavbar = router.pathname === '/auth';

  return (
    <div className={`${isAlternateNavbar ? 'invisibile' : 'visibile'} flex bg-mainGreen justify-center md:justify-between w-screen h-10 px-10`}>
      <h3 className="text-white p-2 text-xl font-ppd">
          PetBook  
      </h3>
      <Link href="/auth">
        sign up
      </Link>
      <Link
        href='/profile'
        className="hidden md:inline text-white p-2 text-lg"
      >
        PetName
      </Link>
    </div>
  )
}

export default Header