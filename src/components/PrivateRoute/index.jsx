import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext";

const PrivateRoute = (WrappedComponent) => {
   
    return (props) =>{
        const {user} = useAuth();
        const { router} = useRouter();
        const [loading, setLoading] = useState(true);

        useEffect(() => {
          if(!user) {
            router.push('/login')
          } else {
            setLoading(false);
          } 
        },[user])

        if(loading) {
            return (<div>Loading...</div>)
        }

        return user ? <WrappedComponent {...props}/> : null;
    }
}

export default PrivateRoute;