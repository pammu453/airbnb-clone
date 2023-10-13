import { Routes, Route } from 'react-router-dom'

import IndexPage from './pages/IndexPage'
import LoginPage from './pages/LoginPage'
import Layout from '../Layout'
import RegisterPage from './pages/RegisterPage'

import axios from 'axios'
import { UserContextProvider } from './UserContext'
import AccountPage from './pages/AccountPage'
import PlacesPage from './pages/PlacesPage'
import PagePlace from './pages/PagePlace'

axios.defaults.baseURL = "http://localhost:5000"
axios.defaults.withCredentials = true

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index path='/' element={<IndexPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/account/:subpage?' element={<AccountPage />} />
          <Route path='/account/newPlace/:id' element={<PlacesPage />} />
          <Route path='/place/:id' element={<PagePlace />} />
        </Route>
      </Routes>
    </UserContextProvider>
  )
}

export default App
