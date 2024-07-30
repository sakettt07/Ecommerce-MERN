import {createBrowserRouter} from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Login from "../pages/Login";
import ForgotPass from "../pages/ForgotPass";
import Signup from "../pages/Signup";
import Admin from "../pages/Admin";

const router=createBrowserRouter([
    {
        path:"/",
        element: <App />,
        children:[
            {
                path:"",
                element: <Home />
            },
            {
                path:"login",
                element: <Login />
            },
            {
                path:"signup",
                element: <Signup />
            },
            {
                path:"forgot-password",
                element:<ForgotPass />
            },
            {
                path:"admin-panel",
                element:<Admin />
            }
        ]
    }
])
export default router;