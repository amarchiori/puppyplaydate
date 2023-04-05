import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import clientPromise from '../../lib/mongodb';

type PetProfileFormData = {
    zipcode: string;
    ownerName: string;
    puppy: {
        dog_name: string;
        shortBio: string;
        age: string;
        breed: string;
        hobbies: string;
      };
};

export default function NewPetProfile() {
    // Initialize the react-hook-form
    const { register, handleSubmit, reset } = useForm<PetProfileFormData>();
  
    // Define a function to handle form submission
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input type="text" {...register('zipcode')} />
          <label>
            Zipcode:
          </label>
        </div>
        <div>
          <input type="text" {...register("puppy.dog_name")} />
          <label>
            Dog Name:
          </label>
        </div>
        <div className="relative w-2/3 m-auto">
          <label 
            className="
            absolute 
            left-0 
            -top-4 
            text-gray-600 
            text-sm 
            transition-all 
            peer-placeholder-shown:text-base
            peer-placeholder-shown:top-2
            peer-focus:-top-4
            peer-focus:text-gray-600
            peer-focus:text-sm
            "
          >
            Age:
          </label>
          <input type="text" {...register('puppy.age')} 
            placeholder=" "
            className="
                bg-transparent 
                peer h-10 w-full 
                border-b-2 border-t-0 border-x-0 
                text-gray-900 
                focus:ring-0 
                border-b-mainGreen focus:border-b-mainGreen"  
          />
        </div>
        
        <label>
          Breed:
          <input type="text" {...register('puppy.breed')} />
        </label>
        <label>
          About:
          <input type="text" {...register('puppy.shortBio')} />
        </label>
        <label>
          Hobbies:
          <input type="text" {...register('puppy.hobbies')} />
        </label>
        <button type="submit">Create Profile</button>
      </form>
    );
  }

