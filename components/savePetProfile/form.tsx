import NewPetProfile from "./newPetProfile"
import ExistingPup from "./existingPup"

function Form() {

    const flag = false;

  return (
    <>
    { flag ? <NewPetProfile/> : <ExistingPup/> }
      </>
  )
}

export default Form