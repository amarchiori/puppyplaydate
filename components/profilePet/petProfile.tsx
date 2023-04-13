import { useContext } from 'react';
import { PuppiesContext } from '../../context/puppiesContext';
import { IPuppy } from '../../context/puppy';


const PetProfile = () => {
  const { deletePuppy,refreshUserPuppies, userPuppies } = useContext(PuppiesContext);
  
  const handleDeletePup = async (id: string, owner: string) => {
    await deletePuppy(id);
    refreshUserPuppies(owner);
  }

  return (
    <div className='w-1/2 h-1/2'>
      {userPuppies.map((puppy: IPuppy) => (
        <div key={puppy._id as IPuppy["_id"]}
          className="grid content-evenly"> 
          <div>
            <h1 className="font-ppd text-5xl pb-4">
              {puppy.dog_name}
            </h1>
            <h4 className="text-gray-600">
              {puppy.tagline}
            </h4>
            <div className='flex flex-col flex-wrap flex-grow'>
              <div className="flex flex-row py-5">
                <h4 className="pr-3 text-mainGreen">
                  Age:</h4>
                <h4 className="pr-3 text-gray-600">
                  {puppy.age}</h4>
                <h4 className="pr-3 text-mainGreen">
                  Sex:</h4>
                <h4 className="text-gray-600">
                  {puppy.gender}</h4>
              </div>
            <h4 className="text-mainGreen">
              What are you looking for in a friend?</h4>
            <h4 className="text-gray-600">
              {puppy.intro}</h4>
            </div>
          </div>
          <button 
            className="text-gray-300 place-self-end"
            onClick={() => handleDeletePup(puppy._id, puppy.ownerID)}>
              Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default PetProfile;