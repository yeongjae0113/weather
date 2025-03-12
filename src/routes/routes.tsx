import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout/layout";
import Weather from "../pages/Home/Weather";
import userRoutes from "./userRoutes";
import pageRoutes from "./pageRoutes";

const route = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '/', element: <Weather /> },
      ...userRoutes,
      ...pageRoutes,
    ]
  }
])

export default route