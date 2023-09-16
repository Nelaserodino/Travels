import React, { useContext, useState } from 'react'
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { saveLocalStorageTravel } from '../../../utils/localStorage/localStorageTravel';
import {useNavigate} from 'react-router-dom'
import {Container, Row, Col, Button} from 'react-bootstrap';
import '../auth.scss';
import { TravelContext } from '../../../Context/TravelContext';



const initialState = {
  email: "",
  password:""
}

export const Login = () => {
  const [login, setLogin] = useState(initialState);
  const [messageError1, setMessageError1] = useState("");
  const [messageError2, setMessageError2] = useState("");
  const {setIsLogged} = useContext(TravelContext);
  const navigate= useNavigate();

  const handleChange = (e)=>{
    const {name, value} = e.target;
    setLogin({...login, [name]: value});
  }

  const onSubmit = () => {
    if(!login?.email || !login?.password){
      setMessageError2("");
      setMessageError1("Debes completar todos los campos");
    } else{
      axios
      .post('http://localhost:4000/users/login', login)
      .then((res) => {
        const token = res.data.token;
        saveLocalStorageTravel(token);
        setIsLogged(true);

        const type = jwtDecode(token).user.type;
        type === 0 ? 
          navigate('/allusers', {replace:true}) :
        type === 1 ?
          navigate('/admin', {replace:true}) :
            navigate('/', {replace:true});
      })
      .catch((error) => {
        setMessageError2("Credenciales no válidas");
        setMessageError1("");
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
              placeholder='email'
              autoComplete='off'
              required
              value={login?.email}
              onChange={handleChange}
              name='email'
          />
          <input
              placeholder='password'
              autoComplete='off'
              required
              value={login?.password}
              onChange={handleChange}
              name='password'
        />
        <Button variant='light' onClick={onSubmit}>Login</Button>
        {messageError1}
        {messageError2}
        <hr/>
        <p>No estás registrado?</p>
        <Button variant='light' onClick={()=> navigate('/register')}>Register</Button>
        </div>
      </Col>
    </Row>
  </Container>
   
  )
}

