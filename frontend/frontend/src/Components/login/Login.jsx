import React ,{useState,useEffect}from 'react'
import './Login.css';
import {toast} from "react-toastify";
import axios from "axios"
import {Link,useNavigate} from 'react-router-dom'

function Login() {
   const navigate = useNavigate()
    const[values,setValues] = useState({
        email:"",
        password:""
    })
    const  handleSubmit = async(event)=>{
        event.preventDefault();
        if(handleValidations()){
            const{password, username, email} = values;
            try { 
                const {data} = await axios.get("http://localhost:5000/api/auth/register",{
                username,email,password
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }});
            if(data.status===false){
               toast.error(data.message,toastOptions) 
            }
            if(data.status===true){
                localStorage.setItem('user-data',JSON.stringify(data.user))
                navigate("/chat")
            }
        }
        catch (error) {
            if (error.response && error.response.status === 409) {
                // Display the specific error message for duplicate data
                toast.error(error.response.data.message, toastOptions);
              } else {
                // Generic error for other cases
                toast.error("Something went wrong. Please try again later.", toastOptions);
              }
        }
        
        }

    };   
    const toastOptions = {
        position:"bottom-right",
        autoClose:5000,
        pauseOnHover:true,
        draggable:true,
        theme:"dark",
    } 
    useEffect(()=>{
            if(localStorage.getItem('data-user')){
                navigate('/')
            }
        },[navigate])
    const handleValidations = () =>{
        const{password, username, email} = values;
        
       
        if(username.length < 3){
            toast.error("Username should be greater than 3 characters",toastOptions);
        return false;
        }
        if(password.length < 8){
            toast.error("Password should be equal or greater than 8 characters",toastOptions);
            return false;
        }
       
        if(email===""){
            toast.error("Email is required",toastOptions);
            return false;
         }
       return true;
    }
    const handleChange = (e)=>{
    setValues({...values,[e.target.name]:e.target.value})

    };

  
  return (
    <div className='login'>
      <input type="email" name="email" placeholder='Email' onChange={(e)=>handleChange(e)} />
      <input type="password" name="password" placeholder='Password' onChange={(e)=>handleChange(e)} />
     <input type="button" value="Submit" id='button' onClick={handleSubmit}/>
     <span>Don't have an account ? <Link to="/">SignUp</Link></span>
    </div>
  )

}
export default Login