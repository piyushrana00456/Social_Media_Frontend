import PrivateRoute from "@/components/PrivateRoute";

const Home = () => {
  return (
    <main className={`flex min-h-screen flex-col items-center justify-between p-24`}>
      Home Page
    </main>
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
