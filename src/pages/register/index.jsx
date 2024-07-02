import { useState } from "react";
import SignUpComponent from "@/components/signup";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import uploadPictures from "@/utils/uploadPictures";

const SignUpPage = () => {
   const [regData, setRegData] = useState({});
   const {login} = useAuth();
   const handleChange = (e) =>{
     const {name, value, files} = e.target;
     setRegData({...regData, [name] : name === "profilePicture" ? files[0] : value})
   }

   const handleSubmit = async (e) => {
     e.preventDefault();
     const {name, email, username, gender, password } = regData;

     let profilePicture = regData.profilePicture;

     if(profilePicture){
      profilePicture = await uploadPictures(profilePicture)
     }
     
      const dataToSend = {
        name,
        email,
        username,
        gender,
        password,
        profilePic: profilePicture,
      };

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