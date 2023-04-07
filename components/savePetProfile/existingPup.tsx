import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import CustomInput from '../auth-components/customInput';
import { PetProfileFormData } from '../../pages/profile';

function ExistingPup({  }) {
  const { register, control, handleSubmit, reset } = useForm<PetProfileFormData>();
  
  const onSubmit: SubmitHandler<PetProfileFormData> = async (formData) => {
    // Connect to the MongoDB database
  //   const client = await clientPromise;
  //     const db = client.db("puppies");

  //   // Insert the new pet profile into the users collection
  //   await db.collection('users').insertOne(formData);

    // Clear the form data
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
        label="Breed" 
        type="text"
        name="puppy.breed"
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
          {...register("puppy.gender")}
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
      >Save</button>
      </div>
    </form>
  )
}

export default ExistingPup