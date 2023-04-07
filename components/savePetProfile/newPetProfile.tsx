import React, { useContext} from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import CustomInput from '../auth-components/customInput';
import { Puppy } from '../../context/types';
import { PuppiesContext } from '../../context/puppiesContext'



export default function NewPetProfile() {
    const { register, control, handleSubmit, reset } = useForm<Puppy>();
    const { addPuppy } = useContext(PuppiesContext)
  
    const onSubmit: SubmitHandler<Puppy> = async (formData) => {
      // await addPuppy(formData)
      reset();
    console.log(formData)
    };
  
    return (
      <form onSubmit={handleSubmit(onSubmit)}
        className='min-[800px]:w-5/6 m-auto'
      >
        <CustomInput 
          label="City" 
          type="text"
          name="city"
          control={control}
        />
        <CustomInput 
          label="State" 
          type="text"
          name="state"
          control={control}
        />
        <CustomInput 
          label="Pup Name" 
          type="text"
          name="puppy.dog_name"
          control={control}
        />
        <CustomInput 
          label="Pup Age" 
          type="text"
          name="puppy.age"
          control={control}
        />
        <CustomInput 
          label="Tagline" 
          type="text"
          name="puppy.tagline"
          control={control}
        />
        <CustomInput 
          label="More about your pup" 
          type="text"
          name="puppy.intro"
          control={control}
        />
        <div className='flex justify-center m-auto w-2/3 py-5 items-center'>
          <label
            className='pr-5 text-mainGreen font-bold'
          >
            Gender Selection</label>
          <select 
            {...register("gender")}
            className='border-0 focus:ring-transparent'
          >
            <option value="male">male</option>
            <option value="female">female</option>
          </select>
        </div>
        <div className='flex justify-center m-auto w-2/3 pb-5'>
        <button 
          type="submit"
          className='bg-pinkLink text-white bg rounded-lg px-3 py-1'
        >Add</button>
        </div>
      </form>
    );
  }

