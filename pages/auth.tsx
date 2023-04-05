

import BackgroundImage from "../components/home/backgroundImage";
import LoginAuth from "../components/auth-components/LoginAuth";
import SignUpAuth from "../components/auth-components/SignUpAuth";

const Auth = () => {

    return (
        <div className="h-screen bg-center bg-cover m-0">
            <BackgroundImage />
            <div className="m-auto pt-48 flex flex-col place-content-center gap-10 md:flex-row w-5/6">
                <LoginAuth/>
                <SignUpAuth/>
            </div>
        </div>
    )
}

export default Auth;