import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext";
import Cookies from "js-cookie";
const PrivateRoute = ({children}) => {
        const {loading} = useAuth();
        const router  = useRouter();
        const user = Cookies.get('userData')
        const [checkingAuth, setCheckingAuth] = useState(true);

        useEffect(() => {
         if(!loading) {
          if(!user) {
            router.push('/login')
          } else {
           setCheckingAuth(false);
          }
         } 
        },[user, router, loading])

        if(checkingAuth || loading) {
            return (<div>Loading...</div>)
        }
    return <>{children}</>;
}

export default PrivateRoute;