import { useEffect, useRef } from "react";
import { io } from "socket.io-client";
import "@/styles/globals.css";
import { getCookies } from "@/utils";
import { AuthProvider } from "@/context/AuthContext";
import { useRouter } from "next/router";
import { RESTRICTED_NAVBAR_PATHS } from "@/utils/contants";
import NavbarComponent from "@/components/Navbar/Navbar";

export default function App({ Component, pageProps }) {
  
  const router = useRouter();
  const socket = useRef();
  const user = getCookies('userData');
  const showNavbar = !RESTRICTED_NAVBAR_PATHS.includes(router.pathname);

  useEffect(() => {
    if(user?.token){
      
      if(!socket.current) socket.current = io(process.env.NEXT_PUBLIC_BASE_URL);
      
      if(socket.current){
        socket.current.emit("userConnected", user.token);
      
        socket.current.on("onlineUsers", (usersList) => {
          // list of online users;
          console.log("onlineUsers", {usersList});
        })
      }
    
      return () => {
        if(socket.current){
          socket.current.emit("userDisconnected", user.token);
          socket.current.off("onlineUsers");
          // socket.current.disconnect();
        }
      }
      }
  },[user])
  
  return (
    <AuthProvider>
      {
        showNavbar && <NavbarComponent socket={socket.current} user={user}/>
      }
      <Component {...pageProps} socket={socket.current} user={user}/>
    </AuthProvider>
  );
}
