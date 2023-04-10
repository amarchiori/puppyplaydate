import { useState } from 'react';
import { useSession } from 'next-auth/react';
import NewPetProfile from '../components/savePetProfile/newPetProfile';


export default function Profile() {
  const [visible, setVisible] = useState(false);
  const { data: session} = useSession()

  console.log(session?.user)

  const userInfo = session?.user

  const handleFormClick = () => {
    setVisible(visible ? false : true);
  };

  return (
    <div className='h-screen'>
      <h3>{userInfo.name}</h3>
      {userInfo.puppies.length < 0 ? (
        <h2>{userInfo.puppies}</h2>
      ): (
        <h2>No Puppies Add a Puppy</h2>
      )}
      <button onClick={handleFormClick}>Add Puppy</button>
      {visible ? <NewPetProfile ownerID={session?.user.id} /> : <></>}
    </div>
  )
}
