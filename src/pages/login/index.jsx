import { useState } from "react";
import LoginComponent from "@/components/login";
import { useAuth } from "@/context/AuthContext";
const LoginPage = () => {
    const [credentials, setCredentials] = useState({email: '', password: ''});
    const { login } = useAuth();

    const handleChange = (e) => {
        const {name, value} = e.target;
       setCredentials({...credentials, [name] : value})
    }
    const handleLogin = async (e) => {
        e.preventDefault();
        const {email, password} = credentials;
        try {
        let res = await fetch('http://localhost:8000/api/auth/reg', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password})
           });

           if(!res.ok){
            throw new Error('Failed to login')
           }

           let data = await res.json();
           console.log({data});
           login(data)

        } catch (error) {
            console.error('Error during login', error.message);
        }

    }
 console.log({credentials})
    return (
        <div className="border-2 text-center text-2xl font-bold">
            <LoginComponent handleChange={handleChange} handleLogin={handleLogin}/>
        </div>
    )
}

export default LoginPage;