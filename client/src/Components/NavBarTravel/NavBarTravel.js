import React, { useContext, useState } from 'react'
import { Container, Nav, Navbar, Button } from 'react-bootstrap'
import {Link, useNavigate} from 'react-router-dom'
import { TravelContext} from '../../Context/TravelContext';
import { delLocalStorageTravel } from '../../utils/localStorage/localStorageTravel';
import './navbar.scss';


export const NavBarTravel = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const {user, setUser, isLogged, setIsLogged} = useContext(TravelContext);
  const navigate= useNavigate();

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null());
  }


  const logOut = ()=>{
    delLocalStorageTravel();
    setUser();
    setIsLogged(false);
    navigate('/login');
  }
 
  return (
    <Navbar expand="lg" className={isScrolled ? "navBar scrolled" : "navBar"}>
        <Container>
          <Navbar.Brand as={Link} to='/'>TRAVELS</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="my-2 my-lg-0 align-center"
               style={{maxHeight:'100px'}}
               navbarScroll
               >
            {user?.type !== 1 && <>
              <Nav.Link as={Link} to='/'>Home</Nav.Link>
              <Nav.Link as={Link} to='/about'>About</Nav.Link>
              <Nav.Link as={Link} to='/services'>Services</Nav.Link>
            </>} 
           
            {isLogged && user?.type === 0 &&
              <Nav.Link as={Link} to='/allusers'>All Users</Nav.Link>
            }

            {isLogged && user?.type === 1 && <>
              <Nav.Link as={Link} to='/admin'>Admin</Nav.Link>
              <Nav.Link as={Link} to='/adminUsers'>Admin User</Nav.Link>
              <Nav.Link as={Link} to='/adminImages'>Admin Images</Nav.Link>
            </>
            }
          </Nav>
          </Navbar.Collapse>
          
            {!isLogged ? (
              <div>
              <Button 
                className='me-3' 
                variant="light" 
                onClick={()=> navigate('/login')}
                >
                Login</Button>
              <Button 
                className='me-3' 
                variant="light" 
                onClick={()=> navigate('/register')}
                >
                Register</Button>
              </div>
            ) : (
              <div>
                <img 
                  className='avatar-img' 
                  onClick={()=> navigate('/user')}
                  src={user?.img ? 
                  `/images/user/${user.img}` : 
                  '../images/avatarmujer.png'}
                  />
                <Button 
                  className='me-3' 
                  variant='light' 
                  onClick={()=> navigate('/user')}
                  >
                  {user?.name}</Button> 
                <Button 
                  className='me-3' 
                  variant="light" 
                  onClick={logOut}
                  >
                  Log Out</Button> 
              </div>
            )}
        </Container>
      </Navbar>
  )
}
