import { useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { getCookies } from "@/utils";

export default function Home() {
  const socket = useRef();
  const user = getCookies('userData');

  useEffect(() => {

    if(!socket.current) socket.current = io(process.env.NEXT_PUBLIC_BASE_URL);

    if(socket.current){
      socket.current.emit("userConnected", user.token);

      socket.current.on("onlineUsers", (usersList) => {
        // list of online users;
      })
    }

    return () => {
      if(socket.current){
        socket.current.emit("userDisconnected", user.token);
        socket.current.off("onlineUsers");
        // socket.current.disconnect();
      }
    }
  },[])

  return (
    <main className={`flex min-h-screen flex-col items-center justify-between p-24`}>
      Home Page
    </main>
  );
}
