import React, { useContext, useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom';
import {Container, Row, Col, Button} from 'react-bootstrap';
import { TravelContext } from '../../Context/TravelContext';
import axios from 'axios';

export const EditUser = () => {
  const {user, setUser, resetImg, setResetImg } = useContext(TravelContext);
  const navigate = useNavigate();

  const [editUser, setEditUser] = useState();
  const [file, setFile] = useState();

  useEffect(()=> {
    setEditUser(user);
  },[user])
  

  const handleChange = (e)=>{
    const {name, value} = e.target;
    setEditUser({...editUser, [name]: value});
  }

  

  const handleFile = (e)=>{
    setFile(e.target.files[0]);
  }

  const onSubmit = (e) =>{
    e.preventDefault();
    const newFormData = new FormData();

    newFormData.append('file', file);
    newFormData.append('register', JSON.stringify(editUser));

    axios
      .put(`http://localhost:4000/users/editUser/${user.user_id}`, newFormData)
      .then((res)=>{
        setUser(editUser);
        navigate('/user');
        setResetImg(!resetImg)
      })
      .catch((error)=>{
        console.log(error);
      })
  }

  return (
    <div>
      <Container fluid>
      <Row className='contAuth'>
        <Col md={4}>
          <form
            encType='multipart/form'
            className='d-flex flex-column'>
          <div className='divFormAuth'>
            <input
                className='m-2'
                placeholder='name'
                autoComplete='off'
                required
                value={editUser?.name}
                onChange={handleChange}
                name='name'
            />
            <input
                className='m-2'
                placeholder='lastname'
                autoComplete='off'
                required
                value={editUser?.lastname}
                onChange={handleChange}
                name='lastname'
            />
            <input
                className='m-2'
                placeholder='address'
                autoComplete='off'
                required
                value={editUser?.address}
                onChange={handleChange}
                name='address'
            />
            <input
                className='m-2'
                placeholder='phone'
                autoComplete='off'
                required
                value={editUser?.phone}
                onChange={handleChange}
                name='phone'
            />
            <input
              type='file'
              className='m-2'
              autoComplete='off'
              onChange={handleFile}
            />
          
            <div>
              <Button className='m-2' onClick={onSubmit} >Guardar cambios</Button>
              <Button className='m-2' onClick={()=> navigate(-1)}>Cancelar cambios</Button>
            </div>
          
          </div>
          </form>
        </Col>
      </Row>
    </Container>
    </div>
    
  )
}
