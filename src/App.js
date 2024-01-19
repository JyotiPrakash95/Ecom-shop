import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import CustomContext from "./components/context"
import Navbar from "./components/Navbar";
import Home from "./pages/Home/Home";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import SignUp from "./pages/SignUp/SignUp";
import SignIn from "./pages/SignIn/SignIn";
import Cart from "./pages/Cart/Cart";
import Orders from "./pages/Orders/Orders";
// tostify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function App() {
  // browser-route
    const browserRouter = createBrowserRouter([
      {
        path: "/",
        element: <Navbar />,
        errorElement: <ErrorPage />,
        children: [
          { path: "/", element: <Home /> },
          { path: "/home", element: <Home /> },
          { path: "/signup", element: <SignUp /> },
          { path: "/signin", element: <SignIn /> },
          { path: "/cart", element: <Cart /> },
          { path: "/orders", element: <Orders /> },
        ],
      },
    ]);

  return (
    <>
          <CustomContext> 
      <ToastContainer/>
        <RouterProvider router={browserRouter} />
        </CustomContext>
    </>
  );
}

export default App;
