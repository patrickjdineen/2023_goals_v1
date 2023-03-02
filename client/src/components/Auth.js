import {useState} from 'react'


const Auth = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [error, setError] = useState(null)
  const [email, setEmail] = useState(null)
  const [confirmPassword, setConfirmPassword] = useState(null)
  const [password, setPassword] = useState(null) 
  
  const isLogn = false

  const viewLogin = (status) => {
    setError(null)
    setIsLogin(status)
  }

  const handleSubmit = async (e, endpoint) =>{
    e.preventDefault()
    if(!isLogin && password !== confirmPassword){
      setError('make sure passwords match')
      return
    }

     const response = await fetch (`${process.env.REACT_APP_SERVERURL}/${endpoint}`, {
      method: 'POST',
      headers : {'Content-Type' : 'application/json'},
      body: JSON.stringify({email, password})
    })

    const data = await response.json()
    console.log(data)

    if(data.detail){
      setError(data.detail)
    }else{
      /*
      setCookie('Email', data.email)
      setCookie('AuthTioken', data.token)
      */
    }

  }
  
  return (
      <div className='auth-container'>
        <div className='auth-container-box'>
          <form>
            <h2>{isLogn ? 'Please Log In' : 'Please Sign Up'}</h2>
            <input 
              type='email' 
              placeholder='email' 
              onChange={(e) => setEmail(e.target.value)}
            />
            <input 
              type='password' 
              placeholder='password'
              onChange={(e) => setPassword(e.target.value)}
              />
            {!isLogin && 
              <input 
                type='password' 
                placeholder='confirm password'
                onChange={(e) => setConfirmPassword(e.target.value)}
                />}
            <input className='create' type='submit' onClick={(e) => handleSubmit(e, isLogin ? 'login' : 'signup')}/>
            {error && <p>{error}</p>}
          </form>

          <div className='auth-options'>
            <button 
              onClick={() => viewLogin(false)}
              style={{backgroundColor : !isLogin ? 'rgb(255,255,255)' : 'rgb(188,188,188)'}}>
              Sign Up</button>
            <button 
              onClick={() => viewLogin(true)}
              style={{backgroundColor : isLogin ? 'rgb(255,255,255)' : 'rgb(188,188,188)'}}>
              Log In</button>
          </div>
        </div> 
      </div>
    );
  }
  
  export default Auth;
  