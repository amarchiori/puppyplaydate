import BackgroundImage from "../components/home/backgroundImage";
import LoginAuth from "../components/auth-components/LoginAuth";
import SignUpAuth from "../components/auth-components/SignUpAuth";

const Auth = () => {

    return (
        <div className="relative min-h-screen">
            <BackgroundImage />
            <div className=" absolute inset-0 z-10 m-auto pt-0 md:pt-32 flex flex-col flex-grow place-content-center gap-10 md:flex-row w-5/6">
                <LoginAuth/>
                <SignUpAuth/>
            </div>
        </div>
 
    )
}

export default Auth;