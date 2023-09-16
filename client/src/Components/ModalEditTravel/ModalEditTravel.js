import axios from 'axios';
import React, { useContext } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { TravelContext } from '../../Context/TravelContext';

export const ModalEditTravel = ({
    editTravel, 
    setEditTravel, 
    show, 
    setShowEditTravel}) => {
    
    const {userTravels, setUserTravels} = useContext(TravelContext);


    const handleClose = () =>{
        setShowEditTravel(false);
    }

    const handleSubmit = () => {
        let arrayProvisional = [...userTravels];
        arrayProvisional.map((elem)=>{
            if(elem.travel_id === editTravel.travel_id){
                elem.city = editTravel.city;
                elem.country = editTravel.country;
                elem.description = editTravel.description;
            }
        })

        axios
            .put(`http://localhost:4000/travels/editTravel/${editTravel.travel_id}`, editTravel)
            .then((res)=>{
                setUserTravels(arrayProvisional);
                setShowEditTravel(false);
            })
            .catch((err)=>{
                console.log(err);
            })
    }

    const handleChange = (e) =>{
        const {name, value} = e.target;
        setEditTravel({...editTravel, [name]:value})}
    

  return (
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          
        </Modal.Header>
        <Modal.Body>
            <input
                value={editTravel?.city}
                name='city'
                onChange={handleChange}
            />
            <input
                value={editTravel?.country}
                name='country'
                onChange={handleChange}
            />
            <input
                value={editTravel?.description}
                name='description'
                onChange={handleChange}
            />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
  )
}
