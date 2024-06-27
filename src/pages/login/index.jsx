import { useState } from "react";
import LoginComponent from "@/components/login";
import LoginWithOtp from "@/components/loginWithOtp";
import { useAuth } from "@/context/AuthContext";
import { validateEmail } from "@/utils";
import axios from 'axios';
const LoginPage = () => {
    const [credentials, setCredentials] = useState({email: '', password: ''});
    const [enableEmailOtp, setEnableEmailOtp] = useState(false);
    const { login } = useAuth();

    const handleChange = (e) => {
        const {name, value} = e.target;
       setCredentials({...credentials, [name] : value})
    }
    const handleLogin = async (e) => {
        e.preventDefault();
        const {email, password} = credentials;
        const dataToSend = {
            password
        }
       if(validateEmail(email)) {
        dataToSend.email = email
       } else {
        dataToSend.username = email
       }  
          try {
            await axios.post('http://localhost:8000/api/auth/login', dataToSend).then((res) => {
                console.log(res);
                login(res.data)
            })
          } catch (error) {
            console.error('Error during login', error.message);
          }
    }
    
    const handleOtpLogin = async (e) => {
         e.preventDefault();
         const {email, OTP} = credentials;
          
         const dataToSend = {
            otp : OTP  
         }
         if(validateEmail(email)) {
            dataToSend.email = email
         } else {
            dataToSend.username = email  
         }
         try {
            await axios.post('http://localhost:8000/api/auth/otp-login', dataToSend).then((res) => {
               console.log({res});
           }) 
         } catch (error) {
            console.error('Error during login', error.message); 
         }
    }
    
    const handleGenrateOtp = async () => {
       setEnableEmailOtp(true);  
       try {
        await axios.post('http://localhost:8000/api/auth/generate-otp',{
          email : credentials?.email
        })
       } catch (error) {
        console.error('Error during generating OTP', error.message);
       }
    }
    return (
        <div className="border-2 text-center text-2xl font-bold">
            {enableEmailOtp ? <LoginWithOtp setEnableEmailOtp={setEnableEmailOtp} credentials={credentials} handleChange={handleChange} handleGenrateOtp={handleGenrateOtp} handleOtpLogin={handleOtpLogin}/> : <LoginComponent handleChange={handleChange} handleLogin={handleLogin} credentials={credentials} handleGenrateOtp={handleGenrateOtp}/>}
        </div>
    )
}

export default LoginPage;