import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Button, Card } from 'react-bootstrap';
import { TravelContext } from '../../Context/TravelContext';
import { Gallery } from '../Gallery/Gallery';
import { ModalEditTravel } from '../ModalEditTravel/ModalEditTravel';
import './travelComponent.scss';

export const TravelComponent = () => {
  const [showEditTravel, setShowEditTravel] = useState(false);
  const [editTravel, setEditTravel] = useState();

  const {userTravels, setUserTravels} = useContext(TravelContext);
   
  const logicDeleteTravel = (travel) =>{
    const tempArray = userTravels.filter(
        (elem) => elem.travel_id != travel.travel_id
    )

    axios
        .put(`http://localhost:4000/travels/delTravel/${travel.travel_id}`)
        .then((res) =>{
            let confirm = window.confirm('Are you sure you want to delete?')
            confirm ? 
            setUserTravels(tempArray) :
            console.log(res);
        })
        .catch((err) => {
            console.log(err);
        })
  }
  return (
    <div>
    { userTravels &&
        userTravels?.map((travel) =>{
            return(
                <Card 
                    className='travel-card'
                    key={travel.travel_id}>
                    <h3>City: {travel.city}</h3>
                    <p><b>Country: {travel.country}</b></p>
                    <p>Details: {travel.description}</p>
                    <div>
                        <Button 
                            className='m-1'
                            onClick={()=> {
                                setShowEditTravel(true)
                                setEditTravel(travel)
                            }}
                            >Edit</Button>
                        <Button className='m-1' onClick={()=>logicDeleteTravel(travel)}>Delete</Button>
                    </div>
                    <Gallery travel={travel}/>
                </Card>
            )
        }
        
    )}
    <ModalEditTravel 
        editTravel={editTravel} 
        setEditTravel={setEditTravel} 
        show={showEditTravel} 
        setShowEditTravel={setShowEditTravel}
        />
    </div>
  )
}
