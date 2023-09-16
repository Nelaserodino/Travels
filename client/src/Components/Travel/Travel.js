import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Carousel, Col, Container, Row } from 'react-bootstrap';
import {useParams} from 'react-router-dom';
import './travel.scss';

export const Travel = () => {
    const [travel, setTravel] = useState();
    const [pictures, setPictures] = useState();
    const [userTravel, setUserTravel] = useState();
    const {travel_id, user_id} = useParams();

    useEffect(() => {
        axios   
            .get(`http://localhost:4000/travels/getTravelPhotos/${travel_id}`)
            .then(((res) => {
                setTravel(res.data.resultTravel[0])
                setPictures(res.data.resultPhotos);
            }))
            .catch((err) => {console.log(err)})
    }, [])

    useEffect(() => {
     axios
        .get(`http://localhost:4000/users/oneUser/${user_id}`)
        .then((res)=>{
            setUserTravel(res.data.resultUser[0])
        })
        .catch((err)=>{console.log(err)})
    },[])
    

  return (
    <Container className='travel-container'>
    {travel &&
      <Row>
        <Col>
          <h1>{travel.city}</h1>
          <h4>{travel.country}</h4>
          <h2>{travel.description}</h2>
        </Col>
        <Col className='traveler'>
          <div>
          <h3>Viajante</h3>
          <p><b>Nombre: </b>{userTravel?.name} {userTravel?.lastname}</p>
          </div>
          <img src={`/images/user/${userTravel?.img}`}/>
        </Col>
      </Row>}

      {pictures && 
      <Row className="mt-5 carrusel">
        <Carousel>
        {pictures.map((foto, index)=>{return(

          <Carousel.Item className="contCarrusel imgCarrusel">
            <div className="contenedorImagen d-flex justify-content-center" >
            <img
              className="d-block justify-content-center"
              src={`/images/travel/${foto.photo_name}`}
              alt="First slide"
            />
            </div>
          
          </Carousel.Item>

        )})
          
          } 
        </Carousel>
      </Row>}
    </Container>
  )
}
