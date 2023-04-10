import { useState } from 'react';
import Form from '../components/savePetProfile/form';


export default function Profile() {
  const [visible, setVisible] = useState(false);


  const handleFormClick = () => {
    setVisible(visible ? false : true);
  };

  return (
    <div className='h-screen'>
      <h3></h3>
      <button onClick={handleFormClick}>click me</button>
      {visible ? <Form/> : <></>}
    </div>
  )
}
