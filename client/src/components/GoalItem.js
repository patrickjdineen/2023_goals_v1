import TickIcon from './TickIcon';
import ProgressBar from './ProgressBar';

const Goal = ({goal}) => {
    return (
      <li className='goal-item'> 
        <div className='info-container'>
          <TickIcon />
          <p className='goal-title'>{goal.title}</p>
          <ProgressBar />
        </div>

        <div className='button-container'>
          <button className='edit'>EDIT</button>
          <button className='delete'>DELETE</button>
        </div>
      </li>
    );
  }
  
  export default Goal;
  