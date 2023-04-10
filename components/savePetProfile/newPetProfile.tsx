import React, { useContext} from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import CustomInput from './customInput';
import { PuppiesContext } from '../../context/puppiesContext'
import { Gender } from '../../context/puppy';

interface PuppyFormProps {
  ownerID: string,
}

interface FormValues {
  ownerID: string,
  _id: string,
  city: string;
  state: string;
  age: number;
  dog_name: string;
  tagline: string;
  intro: string;
  gender: Gender;
}


export default function NewPetProfile({ ownerID }: PuppyFormProps) {
    const { register, control, handleSubmit, reset } = useForm<FormValues>();
    const { addPuppy } = useContext(PuppiesContext)

  
    const onSubmit: SubmitHandler<FormValues> = async (formData) => {
      // await addPuppy(formData)
      await addPuppy(formData, ownerID)
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
          name="dog_name"
          control={control}
        />
        <CustomInput 
          label="Pup Age" 
          type="text"
          name="age"
          control={control}
        />
        <CustomInput 
          label="Tagline" 
          type="text"
          name="tagline"
          control={control}
        />
        <CustomInput 
          label="More about your pup" 
          type="text"
          name="intro"
          control={control}
        />
        <div className='flex justify-center m-auto w-2/3 py-5 items-center'>
          <label
            className='pr-5 text-mainGreen font-bold'
          >
            Gender</label>
          <select 
            {...register('gender')}
            className='border-0 focus:ring-transparent'
          >
            <option value={Gender.MALE}>male</option>
            <option value={Gender.FEMALE}>female</option>
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

