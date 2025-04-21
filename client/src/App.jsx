import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./RootLayout";
import Home from "./components/home/Home";
import Register from "./components/register/Register";
import Login from "./components/login/Login";
import Aboutus from "./components/about/About";
import UserProfile from './components/user-profile/UserProfile';
import Products from './components/products/Products';
import Cart from './components/cart/Cart'
import RoutingError from "./components/RoutingError";
import {Navigate} from 'react-router-dom'
import EditUser from "./components/edit-user/EditUser";

function App() {
  const browserRouter = createBrowserRouter([
    {
      path: "",
      element: <RootLayout />,
      errorElement:<RoutingError />,
      children: [
        {
          path: "",
          element: <Home />,
        },
        {
          path: "register",
          element: <Register />,
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "about",
          element: <Aboutus />,
        },
        {
          path:"edit-user",
          element:<EditUser />
        },
        {
          path:'user-profile',
          element:<UserProfile />,
          children:[
            {
              path:'products',
              element:<Products />
            },
            {
              path:'cart',
              element:<Cart />
            },
           
            //navigate to Products component when page is empty
            {
              path:'',
              element:<Navigate to={'products'} />
            }
          ]
        }
      ],
    },
  ]);

  return (
    <div className="main">
      <RouterProvider router={browserRouter} />
    </div>
  );
}

export default App;
