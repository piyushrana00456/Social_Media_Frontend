import { useState, useCallback, useEffect } from "react";
import SignUpComponent from "@/components/signup";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import uploadPictures from "@/utils/uploadPictures";
import debounce from 'lodash/debounce';
import LABELS from "@/utils/labels";

const SignUpPage = () => {
   const [regData, setRegData] = useState({});
   const {login} = useAuth();
   const [userNameMsg, setUserNameMsg] = useState('');
   const [isCheckingUserName, setIsCheckingUserName] = useState(false);

   const checkUserNameAvailablity = async (username) => {
       try {
         setIsCheckingUserName(true)  
        let res = await axios.get(`http://localhost:8000/api/signup/${username}`) 
        setIsCheckingUserName(false);
        if(res.error) {
            setUserNameMsg(LABELS?.USER_NAME_TAKEN);
        } else {
            setUserNameMsg(LABELS?.USER_NAME_AVAILABLE)
        }
       
       } catch (error) {
        setIsCheckingUserName(false);
        setUserNameMsg(LABELS?.USER_NAME_TAKEN);
       }
   }
const debouncedCheckUserName = useCallback(debounce(checkUserNameAvailablity, 500), []);

const handleVerfiyUserName  = (e) => {
   const value = e.target.value;
   handleChange(e);
   if(value){
    debouncedCheckUserName(value)
   }else{
    setUserNameMsg('')
    debouncedCheckUserName.cancel();
   }
}
   const handleChange = (e) => {
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
            <SignUpComponent handleChange={handleChange} handleSubmit={handleSubmit} handleVerfiyUserName={handleVerfiyUserName} isCheckingUserName={isCheckingUserName} userNameMsg={userNameMsg}/>
        </div>
    )
}


export default SignUpPage;