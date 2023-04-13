import { useState, useEffect, useContext } from 'react';
import { useSession } from 'next-auth/react';

import { PuppiesContext } from '../context/puppiesContext';
import { CldImage, CldUploadWidget, CldUploadButton} from 'next-cloudinary';
import NewPetProfile from '../components/profileForms/newPetProfile';
import PetProfile from '../components/profilePet/petProfile';

import { RiCloseFill } from 'react-icons/ri'

export default function Profile() {
  const [showAddPuppyForm, setShowAddPuppyForm] = useState(false);
  const { refreshUserPuppies, userPuppies } = useContext(PuppiesContext);
  const [secureUrl, setSecureUrl] = useState('')

  const { data: session } = useSession()
  const ownerID = session?.user.id

  useEffect(() => {
    refreshUserPuppies(session?.user.id);
  }, [session?.user]);



  const options = {
    cropping: true,    
    multiple: false, 
    maxImageFileSize: 2000000,  
    maxImageWidth: 2000, 
    defaultSource: "local",    
    styles: {        
        palette: {            
        window: "#ffffff",            
        sourceBg: "#f4f4f5",            
        windowBorder: "#90a0b3",            
        tabIcon: "#000000",            
        inactiveTabIcon: "#555a5f",            
        menuIcons: "#555a5f",            
        link: "#0433ff",            
        action: "#339933",            
        inProgress: "#0433ff",            
        complete: "#339933",            
        error: "#cc0000",            
        textDark: "#000000",            
        textLight: "#fcfffd"        
    },        
    fonts: {            
        default: null,            
        "sans-serif": {                
        url: null,                
        active: true            
        }    
    }
    }
  }

 function onUpload (result: any) {
    if (result) {
      const secureUrl = result.info.secure_url
      setSecureUrl(secureUrl)
      console.log(result)
    }
    if (!result) {
      console.log("no result")
    }
  }


  return (
    <div className='h-screen overflow-y-scroll'>
      <div className='w-5/6 m-auto h-full'>
        <h3 className='text-rose-800 text-center p-10'>
          {session?.user.name}
        </h3>
        {userPuppies.length > 0 ? (
          <div className='flex flex-row items-center h-80'>
            <div className='w-1/2 grid justify-center text-gray-400'>
              { secureUrl && 
                    <CldImage
                    src={secureUrl}
                    width="300"
                    height="300"
                    crop='fill'
                    alt="test"
                  />
                } 
              <CldUploadButton 
                uploadPreset="fbogql6a" 
                options={options}
                onUpload={onUpload}
              />
            </div>
            <PetProfile />
          </div>
        ): (
            <button 
              onClick={() => setShowAddPuppyForm(!showAddPuppyForm)}
              className='m-auto w-full'
            >
              {showAddPuppyForm ? <RiCloseFill className='text-pinkLink text-4xl m-auto'/> : "Add Puppy"}
            </button>
        )}
      </div>
      {showAddPuppyForm && (
        <NewPetProfile 
          ownerID={ownerID}
          onClose={() => setShowAddPuppyForm(false)}
        /> 
      )}
    </div>
  )
}
