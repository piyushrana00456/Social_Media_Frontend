import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";


const AuthContext = createContext();

export const AuthProvider = ({children}) => {
   const [user, setUser] = useState(null);
   const [loading, setLoading] = useState(true);
   const router = useRouter();
   useEffect(() => {
      const userData = window.localStorage.getItem('user');
      if(userData) {
        setUser(JSON.parse(userData))   
      }
      setLoading(false);
   },[])
    
   const login = (userData) => {
     localStorage.setItem('user', JSON.stringify(userData));
     setUser(userData);
     router.push('/'); 
   }

   return (
      <AuthContext.Provider value={{user, login, loading}}>
          {children}
      </AuthContext.Provider>
   )
   
}

export const useAuth = () => {
   return useContext(AuthContext)
}
