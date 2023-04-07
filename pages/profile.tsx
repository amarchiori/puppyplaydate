import { useForm } from 'react-hook-form';
import { useState } from 'react';
import NewPetProfile from '../components/savePetProfile/newPetProfile'
import ExistingPup from '../components/savePetProfile/existingPup'
import Form from '../components/savePetProfile/form';

enum GenderEnum {
  male = "male",
  female = "female"
};

export type PetProfileFormData = {
  city: String;
  state: String;
  puppy: {
    age: String;
    breed: String;
    dog_name: String;
    tagline: String;
    intro: String;
    gender: GenderEnum;
  };
};

export default function Profile() {
  const [visible, setVisible] = useState(false);



  const handleNewClick = () => {
    setVisible(visible ? false : true);
  };

  return (
    <div className='h-screen'>
      <button onClick={handleNewClick}>click me</button>
      {visible ? <Form/> : <></>}
    </div>
  )
}
