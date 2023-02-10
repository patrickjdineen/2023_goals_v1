import GoalHeader from './components/GoalHeader';
import GoalItem from './components/GoalItem'
import { useEffect, useState } from 'react'


const App = () => {

  const userEmail = 'pat@test.com'
  const [ goals, setGoals ] = useState(null)

  const getData = async () => {
    try {
      const response = await fetch(`http://localhost:8000/goals/${userEmail}`)
      const json = await response.json()
      setGoals(json)
    } catch (err){
      console.error(err)
    }
  }

  useEffect(() => getData, [])

  console.log(goals)

  //sort by date
  const sortedGoals = goals?.sort((a,b) => new Date(a.date)- new Date(b.date))

  return (
    <div className='app'> 
      <GoalHeader goalName={'2023 Goals'} />
      {sortedGoals?.map((goal) => <GoalItem key={goal.id} goal={goal}/>)}
      
    </div>
  );
}

export default App;
