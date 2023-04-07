import { Puppy } from '../../context/types';
import pupPhoto from '../../public/images/pupPhoto.jpg'
import Image from 'next/image';


type CardListProps = {
    puppies: Puppy[];
}

const CardList = ({puppies}: CardListProps) => {
    return (
        <ul className='md:flex md:flex-row md:flex-wrap'>
            {puppies.map((puppy) => (
                    <li key={puppy._id as string} className='flex p-5 sm:w-2/3 sm:m-auto md:w-1/2 lg:w-2/5'>
                        <div className="flex-none w-32 relative z-10 max-w-xs max-h-32">
                            <Image src={pupPhoto} alt="Image by master1305 on Freepik" className="absolute z-10 inset-0 w-full h-full object-cover rounded-full" loading="lazy" />
                        </div>
                        <div className="flex-auto p-6">
                            <div className="relative flex w-full flex-wrap items-baseline before:bg-gradient-to-r from-[#07f2bc] to-[#80ffce] before:absolute before:-top-3 before:bottom-0 before:-left-20 before:-right-5 before:rounded-tr-lg justify-between z-0">
                                <h1 className='z-10 font-ppd text-2xl md:text-3xl'>
                                    {puppy.dog_name}
                                </h1>
                                <div className='z-10 text-[10px] flex text-gray-600'>
                                    <h3>
                                        {puppy.city},
                                    </h3>
                                    <h3>
                                        {puppy.state}
                                    </h3>
                                </div>
                            </div>
                            <div className="flex my-2 text-[10px] text-gray-600">
                                <p className="pr-2">
                                    {puppy.age} years old
                                </p>
                                <p>
                                    {puppy.gender}
                                </p>
                            </div>
                            <p className='flex items-baseline text-xs'>
                                {puppy.tagline}
                            </p>
                        </div>
                    </li>
                ))}
        </ul>
    );
};

export default CardList;