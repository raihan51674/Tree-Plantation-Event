import {
  createBrowserRouter
} from "react-router";
import Register from "../Authantication/Register";
import SignIn from "../Authantication/SignIn";
import Profile from "../Components/Profile";
import AuthRoot from "../Layout/AuthRoot";
import HomeRoot from "../Layout/HomeRoot";
import CreateEvent from "../Pages/CreateEvent";
import EventDetails from "../Pages/EventDetails";
import Home from "../Pages/Home/Home";
import JoinedEvent from "../Pages/JoinedEvent";
import ManageEvent from "../Pages/ManageEvent";
import ManageUpdate from "../Pages/ManageUpdate";
import UpcomingEvent from "../Pages/UpcomingEvent";

export const router = createBrowserRouter([
  {
    path: "/",
    Component :HomeRoot,
    children :[
      {path:"/", index:true, Component:Home},
      {path:"/upcomingEvents", Component:UpcomingEvent},
      {path:"/create-event", Component:CreateEvent},
      {path:"/manage-events", Component:ManageEvent},
      {path:"/joined-events",
        Component:JoinedEvent},
      {
      path:"/events/:id",
      loader : ({params})=>fetch(`http://localhost:3000/addEvent/${params.id}`),
      Component:EventDetails
    },
    {
      path:"/update/:id",
      loader: ({params}) => fetch(`http://localhost:3000/addEvent/${params.id}`),
      Component:ManageUpdate },

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