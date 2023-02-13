import TickIcon from './TickIcon';
import ProgressBar from './ProgressBar';
import Modal from './Modal';
import { useState } from 'react';

const Goal = ({goal, getData}) => {
  const [ showModal, setShowModal ] = useState(false)

  const deleteData = async(e) =>{
    try{
      const response = await fetch (`${process.env.REACT_APP_SERVERURL}/goals/${goal.id}`,{
        method: 'DELETE'
      })
      if(response.status === 200){
        getData()
      }
    } catch(err){
      console.log(err)
    }
  }

    return (
      <li className='goal-item'> 
        <div className='info-container'>
          <TickIcon />
          <p className='goal-title'>{goal.title}</p>
          <ProgressBar />
        </div>

        <div className='button-container'>
          <button className='edit' onClick={() => setShowModal(true)}>EDIT</button>
          <button className='delete' onClick={() =>deleteData()}>DELETE</button>
        </div>
        {showModal && <Modal mode={'edit'} setShowModal={setShowModal} getData={getData} goal={goal} />} 
      </li>
    );
  }
  
  export default Goal;
  