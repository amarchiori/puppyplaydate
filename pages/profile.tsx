import { useState } from 'react';
import Form from '../components/savePetProfile/form';


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
