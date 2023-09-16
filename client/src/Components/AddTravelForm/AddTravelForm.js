import React, { useContext, useEffect, useRef, useState } from 'react'
import { Row, Col, Button} from 'react-bootstrap';
import { TravelContext } from '../../Context/TravelContext';
import {useNavigate} from 'react-router-dom'
import axios from 'axios';

const initialTravelValue = {
    city: "",
    country: "",
    description:""
}

export const AddTravelForm = ({setShowFormCreateTravel}) => {
    const [regTravel, setRegTravel] = useState(initialTravelValue);
    const [files, setFiles] = useState();

    const {user,userTravels,  setUserTravels} = useContext(TravelContext);
    const navigate= useNavigate();
    const scrollRef = useRef();

    const scrollToElement = () => scrollRef.current.scrollIntoView();

    useEffect(() => {
      scrollToElement();
    }, [])
    


    const handleChange = (e)=>{
        const {name, value} = e.target;
        setRegTravel({...regTravel, [name]: value});
    }

    const handleFile = (e)=>{
      setFiles(e.target.files);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        const newFormData = new FormData();

        newFormData.append('regTravel', JSON.stringify(regTravel));

        if(files){
          for(const elem of files){
            newFormData.append('file', elem);
          }
        }
          axios
          .post(`http://localhost:4000/travels/createTravel/${user.user_id}`, newFormData)
          .then((res) => {
            setUserTravels(res.data);
            setShowFormCreateTravel(false);
          })
          .catch((error) => {
            console.log('error en axios', error);
          })
        }

  return (
    <Row>
      <Col md={5}>
        <div ref={scrollRef}>
          <h2>Create new Travel</h2>
          <hr/>
          <form
            encType='multipart/form'
            className='d-flex flex-column'>
            <label className='m-2'>City</label>
            <input
                className='m-2'
                placeholder='city'
                autoComplete='off'
                required
                value={regTravel.city}
                onChange={handleChange}
                name='city'
            />
            <label className='m-2'>Country</label>
            <input
                className='m-2'
                placeholder='country'
                autoComplete='off'
                required
                value={regTravel.country}
                onChange={handleChange}
                name='country'
            />
            <label className='m-2'>Description</label>
            <input
                label='Desccription'
                className='m-2'
                placeholder='description'
                autoComplete='off'
                required
                value={regTravel.description}
                onChange={handleChange}
                name='description'
            />
            <label className='m-2'>Images</label>
            <input
                type='file'
                className='m-2'
                onChange={handleFile}
                multiple
            />
             <div>
              <Button className='m-2' onClick={onSubmit} >Add</Button>
              <Button className='m-2' onClick={()=> navigate(-1)}>Cancel</Button>
            </div>
          </form>
        </div>
      </Col>
    </Row>
  )
}
