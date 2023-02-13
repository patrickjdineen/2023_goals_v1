import {useState} from 'react'

const Modal = ({mode, setShowModal, getData, goal}) => {
  const editMode = mode == 'edit' ? true : false 
  
  const [data, setData] = useState({
    user_email : editMode ? goal.user_email : 'pat@test.com',
    title : editMode ? goal.title : null,
    progress : editMode ? goal.progress : 50,
    date: editMode ? goal.date : new Date()
  })
  
  const postData = async(e) => {
    e.preventDefault()
    try{
      const response =  await fetch(`${process.env.REACT_APP_SERVERURL}/goals/`, {
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body : JSON.stringify(data)
      })
      if(response.status == 200){
        console.log('yes')
        console.log(response)
        setShowModal(false)
        getData()
      }
      
    } catch(err){
      console.log(err)
    }
  }

  const editData = async (e) =>{
    e.preventDefault()
    try{
      const response = await fetch (`${process.env.REACT_APP_SERVERURL}/goals/${goal.id}`,{
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body :  JSON.stringify(data)
      })
      if(response.status === 200){
        setShowModal(false)
        getData()
      }
    } catch(err){
      console.log(err)
    }
  }



  const handleChange = (e) =>{
    console.log('handle change',e)
    const {name, value} = e.target

    setData(data =>({
      ...data,
      [name] : value
    }))

    console.log(data)
  }

    return (
      <div className='overlay'> 
        <div className='modal'>
          <div className='form-title-container'>
            <h3>Let's {mode} your goal </h3>
            <button onClick={() =>setShowModal(false)}>x</button>
          </div>

          <form>
            <input required 
              maxLength={30}
              placeholder='Your goal goes here'
              name='title'
              value={data.title}
              onChange={handleChange}
            />
            <br />
            <label for='range'>Drag to Select Current Progress</label>
            <input 
              required
              type='range'
              id='range'
              min='0'
              max='100'
              name='progress'
              value={data.progress}
              onChange={handleChange}
            />
            <input className={mode} type='submit' onClick={editMode ? editData : postData}/>
          </form>
        </div>
        
      </div>
    );
  }
  
  export default Modal;
  