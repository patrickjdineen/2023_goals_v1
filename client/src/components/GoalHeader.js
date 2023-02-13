import Modal from './Modal';
import {useState} from 'react'

const GoalHeader = ({ goalName, getData }) => {

  const [showModal, setShowModal] = useState(false)

  const signOut = () => {
    console.log('signout')
  }

  const create = () => {
    console.log('create')
  }

    return (
      <div className='goal-header'> 
        <h1>{goalName}</h1>
        <div className='button-container'>
          <button className='create' onClick={() => setShowModal(true)}>ADD NEW</button>
          <button className='signout' onClick={signOut}>SIGN OUT</button>
        </div>
        {showModal && <Modal mode={'create'} setShowModal={setShowModal} getData={getData}/>}
      </div>
    );
  }
  
  export default GoalHeader;
  