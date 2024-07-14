import PrivateRoute from "@/components/PrivateRoute"
import PostCreation from "@/components/Post/post";
import Sidebar from "@/components/Post/sideBar";
import Network from "@/components/Post/network";

const Home = () => {
  return (
    <div className="w-full flex py-[6rem] px-[3.5rem]">
      <Sidebar/>
      <main className={`flex min-h-screen flex-col items-center justify-between p-4 w-1/2`}>
        <PostCreation/>
      </main> 
      <Network/>   
    </div>
  );
}

const HomePage  = () =>{
  return (
    <PrivateRoute>
      <Home/>
   </PrivateRoute>
  )
}

export default HomePage
