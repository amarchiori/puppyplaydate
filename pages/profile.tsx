import React from 'react'
import NewPetProfile from '../components/savePetProfile/newPetProfile'
import ExistingPup from '../components/savePetProfile/existingPup'

export default function Profile() {
  return (
    <div className='h-screen'>
      { user ? (
        <ExistingPup/>
      ) : (
        <div>
          "Welcome new pup!"
        </div>
      ) }
        <NewPetProfile/>
    </div>
  )
}
