import React from 'react';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import Home from "./pages/home/Home";
import Gigs from "./pages/gigs/Gigs";
import Gig from "./pages/gig/Gig";
import Add from "./pages/add/Add";
import Messages from "./pages/messages/Messages";
import Message from "./pages/message/Message";
import Orders from "./pages/orders/Orders";
import MyGigs from "./pages/myGigs/MyGigs";
import Register from "./pages/register/Register";
import Pay from "./pages/pay/Pay";
import Success from "./pages/success/Success";
import "./app.scss";
import Login from './pages/login/Login';
import {
  createBrowserRouter,
  RouterProvider,
  Outlet 
} from "react-router-dom";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

function App() {
  const queryClient = new QueryClient();
  
  const Layout = () => {
    return (
      <div className="app">
        <QueryClientProvider client={queryClient}>
          <Navbar />
          <Outlet />
          <Footer />
        </QueryClientProvider>
      </div>
    )
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout/>,
      children:[ 
        {
          path:"/",
          element:<Home/>
        },
        {
          path:"/gigs",
          element:<Gigs />
        },
        {
          path:"/gig/:id",
          element:<Gig />
        },
        {
          path:"/orders",
          element:<Orders />
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path:"/mygigs",
          element:<MyGigs />
        },
        {
          path:"/add",
          element:<Add />
        },
        {
          path:"/messages",
          element:<Messages />
        },
        {
          path:"/message/:id",
          element:<Message />
        },
        {
          path:"/pay/:id",
          element:<Pay />
        },
        {
          path:"/success/:id",
          element:<Success />
        },
      ]
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
