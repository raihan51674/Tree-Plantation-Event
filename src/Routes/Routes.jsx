import {
  createBrowserRouter
} from "react-router";
import Register from "../Authantication/Register";
import SignIn from "../Authantication/SignIn";
import Profile from "../Components/Profile";
import AuthRoot from "../Layout/AuthRoot";
import HomeRoot from "../Layout/HomeRoot";
import Home from "../Pages/Home/Home";

export const router = createBrowserRouter([
  {
    path: "/",
    Component :HomeRoot,
    children :[
      {path:"/", index:true, Component:Home}
    ]
  },
  {
    path:"/auth",
    Component:AuthRoot,
    children:[
      {path:"/auth/register", Component:Register},
      {path:"/auth/login", Component:SignIn},
      {path:"/auth/profile", Component:Profile}
    ]
  },
]);