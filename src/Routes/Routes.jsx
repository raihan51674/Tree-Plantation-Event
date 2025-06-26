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
import PrivateRoute from "./PrivateRoutes";
// import PrivateRoute from "./PrivateRoute";

const BASE_URL = import.meta.env.VITE_URL;

export const router = createBrowserRouter([
  {
    path: "/",
    Component :HomeRoot,
    children :[
      {path:"/", index:true, Component:Home},
      {path:"/upcomingEvents", Component:UpcomingEvent},
      {path:"/create-event",
        element:<PrivateRoute><CreateEvent/></PrivateRoute>
        // Component:CreateEvent
      },
      {path:"/manage-events", 
        // Component:ManageEvent
        element:<PrivateRoute><ManageEvent/></PrivateRoute>
      },
      {path:"/joined-events",
        // Component:JoinedEvent
        element:<PrivateRoute><JoinedEvent/></PrivateRoute>
      
      },
      {
      path:"/events/:id",
      loader : ({params})=>fetch(`${BASE_URL}/addEvent/${params.id}`),
      // Component:EventDetails
      element:<PrivateRoute><EventDetails/></PrivateRoute>
      },
    

    {
      path:"/update/:id",
      loader: ({params}) => fetch(`${BASE_URL}/addEvent/${params.id}`),
      Component:ManageUpdate 
      
    },

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