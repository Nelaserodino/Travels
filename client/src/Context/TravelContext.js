import React, { useState, useEffect, createContext } from 'react'
import { localStorageTravel } from '../utils/localStorage/localStorageTravel';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

export const TravelContext = createContext();

export const TravelProvider = (props) => {
    const [user, setUser] = useState({});
    const [userTravels, setUserTravels] = useState()
    const [isLogged, setIsLogged] = useState(false);
    const [resetImg, setResetImg] = useState(false)
    const token = localStorageTravel(); 
    
    
    useEffect(() => {
        if(token){
        let id = jwtDecode(token).user.id;
        setIsLogged(true);

        axios
        .get(`http://localhost:4000/users/oneUser/${id}`)
        .then((res)=> {
            setUser(res.data.resultUser[0]);
            setUserTravels(res.data.resultTravel);
        })
        .catch((error) => {
            console.log('este es el error', error);
        })
        }
    
    }, [isLogged, resetImg])

    
  return (
    <TravelContext.Provider value={{
            user, 
            setUser, 
            isLogged, 
            setIsLogged,
            resetImg, 
            setResetImg,
            userTravels,
            setUserTravels,
            token
            }}>
        {props.children}
    </TravelContext.Provider>
  )
}
