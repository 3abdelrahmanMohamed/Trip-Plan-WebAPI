import React, { useState ,useEffect } from 'react'
import axios from 'axios'

function Register() {

	const [fname,setFname] = useState('')
  const [lname,setLname] = useState('')
  const [email,setEmail] = useState('')


	const [users, Setusers] = useState([])

const request_token = ()=>{
    axios.post('http://localhost:8080/api/v1.1/users/register' ,{fname,lname,email})
    .then(res => console.log(res))
    .catch(err =>console.log(err))
 
  }

  useEffect( () =>{
    axios.get('http://localhost:8080/api/v1.1/users?token=1234')
    .then(res=>{
      console.log(res.data)
      Setusers(res.data)
  
    })
    .catch(err => console.log(err))
  },[])

return (
    <div className="container">
    <form action="action_page.php">

        <label for="fname">First Name       </label>
        <input type="text" id="fname" name="firstname" placeholder="Your name.." value={fname} onChange={e=>setFname(e.target.value)}/>
        <br/>
        <br/>

        <label for="lname">Last Name   </label>
        <input type="text" id="lname" name="lastname" placeholder="Your last name.."value={lname} onChange = {e=>setLname(e.target.value)} />
        <br/><br/>

        <label for="country">Email      </label>
        <input type="email" id="email" name="email" placeholder="Your Email...." value={email} onChange = {e=>setEmail(e.target.value)}/>
        <br/><br/>

        <input type="submit" value="Request Token" onClick={request_token}/>

    </form>

    {
      users.map(user=>{
        if (user === "Invalid Token" ){return null}
        <li key={user.token}>
          {user.fname} <br/>
          {user.token}
        </li>}
      )
    }
    

    </div>
  )
}

export default Register