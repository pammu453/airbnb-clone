import { Outlet } from "react-router-dom"
import Header from "./src/Header"

const Layout = () => {
  return (
    <div className="px-4 mt-4">
      <Header />
      <Outlet />
    </div>
  )
}

export default Layout
