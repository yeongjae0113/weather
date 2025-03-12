import { RouterProvider } from "react-router-dom"
import route from "./routes/routes"

const App = () => {
  
  return (
    <RouterProvider router={route} />
  )
}

export default App