import HomePage from './pages/HomePage'
import '@/scss/default.scss'
import RegistrationPage from './pages/RegistrationPage'
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider}  from 'react-router-dom'
import MainLayouts from './layouts/MainLayouts'

const router = createBrowserRouter(
  createRoutesFromElements(
  <Route path="/" element={<MainLayouts />} >
    <Route index element={<HomePage />}  />
    <Route path="/registration" element={<RegistrationPage />} />
  </Route>
  )
)

function App() {
  return  <RouterProvider router={router} />
}

export default App
