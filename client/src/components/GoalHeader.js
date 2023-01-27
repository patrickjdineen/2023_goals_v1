const GoalHeader = ({ goalName }) => {

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
          <button className='create'>ADD NEW</button>
          <button classNAme='signout' onClick={signOut}>SIGN OUT</button>
        </div>
      </div>
    );
  }
  
  export default GoalHeader;
  