import { use } from "react";
import { Navigate, useLocation } from "react-router";
import { AuthContext } from "../Authantication/Context/AuthContext";



const PrivateRoute = ({children}) => {
  const {UserData,Loading}=use(AuthContext)
  
  const location =useLocation()
  // console.log(location);
  
  if(Loading){
    
    return <span className="loading loading-spinner text-info"></span>
  }
  if(!UserData){
    //add location
    return <Navigate state={location?.pathname} to="/auth/login">Login</Navigate>
  }
  return children
};

export default PrivateRoute;