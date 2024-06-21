import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";


const AuthContext = createContext();

export const AuthProvider = ({children}) => {
   const [user, setUser] = useState(null);
   const router = useRouter();
   
   const login = (userData) => {
     localStorage.setItem('user', JSON.stringify(userData));
     setUser(userData);
     router.push('/'); 
   }

   return (
      <AuthContext.Provider value={{user, login}}>
          {children}
      </AuthContext.Provider>
   )
   
}

export const useAuth = () => {
   return useContext(AuthContext)
}
