import Image from "next/image";
import authBG from '../../public/images/authBG.png'

export default function BackgroundImage() {
    return (
    <Image 
        src={authBG}
        alt="gradient background" 
        fill
        className="z-0"
        priority
    />
)
}
