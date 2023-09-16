import axios from 'axios';
import {Card, Button} from 'react-bootstrap';
import React, { useContext, useEffect, useState} from 'react'
import './allUsers.scss';
import { TravelContext } from '../../../Context/TravelContext';
import {useNavigate} from 'react-router-dom'

export const AllUsers = () => {
  const [user, setUser] = useState();
  const {token} = useContext(TravelContext);
  const navigate = useNavigate();

  useEffect(() => {
    if(token){
      axios.defaults.headers.common['authorization'] = `Bearer ${token}`;
    }
    axios
      .get('http://localhost:4000/users/allUser')
      .then((res)=>{
        setUser(res.data);
        console.log(res.data);
      })
      .catch((err)=>{
        console.log(err);
      })
  }, []);
  
  
  return (
    <div className='users-container'>
      {/* <div className='background-effect'></div> */}
      <div className='main-container'>
        <h1>Comparte tus viajes con la comunidad</h1>
        <div className='d-flex flex-wrap justify-content-center'>
        {user?.map((elem)=>{
          return(
            <Card key={elem?.photo_id} style={{ width: '15rem'}}>
            <Card.Img style={{ height: '15rem'}} variant="top" src={`./images/travel/${elem.photo_name}`} />
            <Card.Body className='d-flex flex-column justify-content-between'>
            <p className='mb-2'><b>{elem?.city}</b></p>
            <div className='d-flex align-items-center'>
            <img className='user-pic' src={`./images/user/${elem?.img}`}/>
            <p>{elem?.name}</p>
            </div>
            <Button onClick={() => navigate(`/travel/${elem.travel_id}/${elem.user_id}`)} className='mt-4'>See More</Button>
          </Card.Body>
          </Card>
          )
        })}
        </div>
      </div>
    </div>

  )
}
