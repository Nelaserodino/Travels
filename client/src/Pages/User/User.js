import React, { useContext, useState } from 'react'
import { TravelContext } from '../../Context/TravelContext';
import { Button} from 'react-bootstrap'
import {useNavigate} from 'react-router-dom'
import { AddTravelForm } from '../../Components/AddTravelForm/AddTravelForm';
import { TravelComponent } from '../../Components/TravelComp/TravelComponent';
import './user.scss';

export const User = () => {
  const [showFormCreateTravel, setShowFormCreateTravel] = useState(false);
  const {user} = useContext(TravelContext);
  const navigate= useNavigate();

  return (
    <div>
      <div className='user-container'>
        <div className='background-effect'></div>
        <div className='profile-details'>
          <div className='user-details'>
            <p>Name: {user?.name}</p>
            <p>Lastname: {user?.lastname}</p>
            <p>Email: {user?.email}</p>
            <p>Address: {user?.address}</p>
            <p>Phone: {user?.phone}</p>
            <Button variant='light' onClick={() => navigate('/editUser')}>Edit info</Button>
          </div>
          <div className='profile-pic-cont'>
            <img 
              src={user?.img ? `/images/user/${user.img}` : '../images/avatarmujer.png'}
            />
          </div>
        </div>
              
        </div>
      <div>
        <h1>Travels</h1>
        <Button onClick={()=> setShowFormCreateTravel(!showFormCreateTravel)}>{showFormCreateTravel ? 'Hide Form' : 'Add Travel'}</Button>

        {showFormCreateTravel ?
         <AddTravelForm setShowFormCreateTravel={setShowFormCreateTravel}/> :
         <TravelComponent/>}
      </div>
    </div>
    
  )
}
