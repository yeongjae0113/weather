import { Outlet } from "react-router-dom"
import { CityProvider } from "../contexts/CityContext"
import AuthProvider from "../provider/AuthProvider"

const Layout = () => {
  
  return (
    <>
      <AuthProvider>
        <CityProvider>
          <Outlet />
        </CityProvider>
      </AuthProvider>
    </>
  )
}

export default Layout