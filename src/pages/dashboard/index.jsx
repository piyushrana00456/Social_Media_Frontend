import PrivateRoute from "@/components/PrivateRoute";


const DashBoard = () => {
    return (
        <div>DashBoard</div>
    )
}

const DashBoardPage = () => { 
    return (<PrivateRoute>
              <DashBoard/>
           </PrivateRoute>)
}

export default DashBoardPage;