import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';

export const Gallery = ({travel}) => {
   const [images, setImages] = useState([]);
   const [showInput, setShowInput] = useState(false);
   const [files, setFiles] = useState([]);
   
   useEffect(() => {
        axios
          .get(`http://localhost:4000/travels/getImgs/${travel.travel_id}`)
          .then((res)=>{
            setImages(res.data)
            setShowInput(false);
          })
          .catch((err)=> {
            console.log(err);
          })
   }, [])
   
  const logicDeleteImage = (image) =>{
     const tempArray = images.filter(
     (elem) => elem.photo_id != image.photo_id
     )
     axios
          .put(`http://localhost:4000/travels/delPhoto/${image.photo_id}`)
          .then((res)=>{
            let confirm = window.confirm('Are you sure you want to delete?')
            confirm ? 
            setImages(tempArray) :
            console.log(res);
          })
          .catch((err)=> {
            console.log(err);
          })
     
   }

   const handleSubmit = () => {
    const newFormData = new FormData();

    if(files){
      for(const elem of files){
        newFormData.append('file', elem);
      }
    }
    axios
      .put(`http://localhost:4000/travels/addImgs/${travel.travel_id}`, newFormData)
      .then((res)=>{
        setImages(res.data)
      })
      .catch((err) => {
        console.log(err);
      })
   }

   const handleFiles = (e)=>{
    setFiles(e.target.files)
   }
  return (
    <div className='gallery-container'>
        {images &&
          images.map((image) =>{
            return(
              <div key = {image.photo_id}>
                <img className='gallery-img' src={`./images/travel/${image.photo_name}`}/> 
                <img className='delete-icon' src='images/delete.svg' onClick={()=>logicDeleteImage(image)}/>
              </div>
                                
            )
        })}
        <div>
        <Button className='w-100'
                onClick={()=> setShowInput(!showInput)}>{!showInput? 'Add Picture' : 'Cancel'}</Button>
        {showInput && (
          <div>
            <input
              type='file'
              multiple
              onChange={handleFiles}
            />
            <Button onClick={handleSubmit}>Save</Button>
          </div>
        )}
        </div>
        
    </div>
    
  )
}
