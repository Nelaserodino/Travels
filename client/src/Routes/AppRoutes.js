import React, { useContext } from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import { NavBarTravel } from '../Components/NavBarTravel/NavBarTravel'
import { About } from '../Pages/Dashboard/about/About'
import { Home } from '../Pages/Dashboard/home/Home'
import { Services } from '../Pages/Dashboard/services/Services'
import { Error } from '../Pages/Dashboard/error/Error'
import { Login } from '../Pages/Auth/Login/Login'
import { Register } from '../Pages/Auth/Register/Register'
import { Admin } from '../Pages/Admin/Admin'
import { AllUsers } from '../Pages/Dashboard/users/AllUsers'
import { User } from '../Pages/User/User'
import { EditUser } from '../Pages/User/EditUser'
import { Travel } from '../Components/Travel/Travel'
import { TravelContext } from '../Context/TravelContext'
import { AdminUsers } from '../Pages/Admin/AdminUsers'
import { AdminImages } from '../Pages/Admin/AdminImages'



export const AppRoutes = () => {
  const{token, user, isLogged} = useContext(TravelContext);
  return (
    <BrowserRouter>
    <NavBarTravel/>
        <Routes>
            <Route path='/' element={<Home/>}/>

            {user?.type !== 1 && <>
              <Route path='/about' element={<About/>}/>
              <Route path='/services' element={<Services/>}/>
            </>}
            
            {!token && !isLogged && <>
              <Route path='/login' element={<Login/>}/>
              <Route path='/register' element={<Register/>}/>
            </>}
            
            {token && user?.type === 1 && <>
              <Route path='/admin' element={<Admin/>}/>
              <Route path='/adminUsers' element={<AdminUsers/>}/>
              <Route path='/adminImages' element={<AdminImages/>}/>
            </>}
            

            {token && user?.type === 0 && <>
              <Route path='/allusers' element={<AllUsers/>}/>
              <Route path='/user' element={<User/>}/>
              <Route path='/editUser' element={<EditUser/>}/>
              <Route path='/travel/:travel_id/:user_id' element={<Travel/>}/>
            </>}
            

            <Route path='*' element={<Error/>}/>
        </Routes>

    </BrowserRouter>
  )
}
