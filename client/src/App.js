import GoalHeader from './components/GoalHeader';
import GoalItem from './components/GoalItem'
import Auth from './components/Auth';
import { useEffect, useState } from 'react'


const App = () => {

  const userEmail = 'pat@test.com'
  const [ goals, setGoals ] = useState(null)

  const authToken = false

  const getData = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/goals/${userEmail}`)
      const json = await response.json()
      setGoals(json)
    } catch (err){
      console.error(err)
    }
  }

  useEffect(() => {
    if (authToken){
      getData()
    }}, [])

  console.log(goals)

  //sort by date
  const sortedGoals = goals?.sort((a,b) => new Date(a.date)- new Date(b.date))

  return (
    <div className='app'> 
    {!authToken && <Auth />}
    {authToken &&
     <>
        <GoalHeader goalName={'2023 Goals'} getData={getData}/>
        {sortedGoals?.map((goal) => <GoalItem key={goal.id} goal={goal} getData={getData}/>)} 
      </>}
      
    </div>
  );
}

export default App;
