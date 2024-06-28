import { useState } from "react";
import SignUpComponent from "@/components/signup";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";

const SignUpPage = () => {
   const [regData, setRegData] = useState({});
   const {login} = useAuth();
   const handleChange = (e) =>{
     const {name, value} = e.target;
     setRegData({...regData, [name] : value})
   }

   const handleSubmit = async (e) => {
     e.preventDefault();
     const {name, email, username, profilePicture, gender, password } = regData
      const dataToSend = {}
      dataToSend.name = name
      dataToSend.email = email
      dataToSend.username = username
      dataToSend.profilePic = profilePicture
      dataToSend.gender = gender
      dataToSend.password = password 
      try {
        await axios.post('http://localhost:8000/api/signup/new-user', dataToSend).then((res) => {
            login(res.data)
        })
      } catch (error) {
         console.log('error during signup', error.message);
      } 
   }

    return (
        <div className="border-2 text-center text-2xl font-bold">
            <SignUpComponent handleChange={handleChange} handleSubmit={handleSubmit}/>
        </div>
    )
}


export default SignUpPage;