import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import CustomInput from './customInput';
import { ImArrowRight2 } from 'react-icons/im'

type Inputs = {
    email: string;
    password: string;
}

const Customlogin = () => {
    const { control, handleSubmit } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = data => console.log(data);

  return (
    <div className="glassBG h-2/5 p-6 flex flex-col justify-around text-center md:h-3/4 md:w-2/5 z-10">
    <h1 className="font-ppd text-4xl">Login</h1>
    <form onSubmit={handleSubmit(onSubmit)}>
        <CustomInput 
            label="Email" 
            type="email"
            name="email"
            control={control}
        />
        <CustomInput 
            control={control}
            label="Password" 
            type="password"
            name="password"
        />
        <button type="submit" className="m-auto bg-pinkLink text-white bg rounded-lg px-3 py-1">
            <ImArrowRight2/>
        </button>
    </form>
    </div>
  );
}


export default Customlogin
