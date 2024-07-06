import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
   const [loading, setLoading] = useState(true);
   const router = useRouter();
   useEffect(() => {
      setLoading(false);
   },[])
    
   const login = (userData) => {
     Cookies.set('userData', JSON.stringify(userData) , {expires : 30})
     router.push('/'); 
   }

   return (
      <AuthContext.Provider value={{login, loading}}>
          {children}
      </AuthContext.Provider>
   )
   
}

export const useAuth = () => {
   return useContext(AuthContext)
}
