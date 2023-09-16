import React, { useContext, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import {Container, Row, Col, Button} from 'react-bootstrap';
import axios from 'axios';
import '../auth.scss';
import { TravelContext } from '../../../Context/TravelContext';



const initialState = {
    name: "",
    email: "",
    password:""
}

export const Register = () => {
    const [register, setRegister] = useState(initialState);
    const [messageError1, setMessageError1] = useState("");
    const [messageError2, setMessageError2] = useState("");
    const {setIsLogged} = useContext(TravelContext);
    const navigate= useNavigate();
   
  
    const handleChange = (e)=>{
      const {name, value} = e.target;
      setRegister({...register, [name]: value});
    }

    const onSubmit = () => {
      if(!register.name || !register.email || !register.password){
        setMessageError2("")
        setMessageError1("Debes completar todos los campos");
      }else{
        axios
        .post('http://localhost:4000/users/createUser', register)
        .then((res) => {
          setIsLogged(true);
          navigate('/allUsers')
        })
        .catch((error) => {
          setMessageError1("");
          setMessageError2("El email ya existe")
          console.log(error);
        })
      }
    }
  return (
    <Container fluid>
      <Row className='contAuth'>
        <Col md={4}>
          <div className='divFormAuth'>
            <input
                placeholder='name'
                autoComplete='off'
                required
                value={register.name}
                onChange={handleChange}
                name='name'
            />
            <input
                placeholder='email'
                autoComplete='off'
                required
                value={register.email}
                onChange={handleChange}
                name='email'
            />
            <input
                placeholder='password'
                autoComplete='off'
                required
                value={register.password}
                onChange={handleChange}
                name='password'
          />
          <Button variant='light' onClick={onSubmit}>Register</Button>
          {messageError1}
          {messageError2}
          <hr/>
          <p>Ya estás registrado?</p>
          <Button variant='light' onClick={()=> navigate('/login')}>Login</Button>
          </div>
        </Col>
      </Row>
    </Container>
    
    
    
    
  
    
  )
}
