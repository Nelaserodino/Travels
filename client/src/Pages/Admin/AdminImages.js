import React,{useState, useEffect}  from 'react'
import axios from 'axios'
import './admin.scss'

export const AdminImages = () => {
    const [pics, setPics] = useState();
  
    useEffect(() => {
      axios
        .get("http://localhost:4000/admin/getAllPics")
        .then((res) => {
          console.log(res);
          setPics(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }, []);
  
    const handleEnable = (id, is_del) =>{
  
      let url=`http://localhost:4000/admin/desablePic/${id}`;    
          if(is_del === 1){
              url=`http://localhost:4000/admin/enablePic/${id}`;
          }
  
          axios
              .put(url)
              .then((res)=>{
                  console.log(res.data);
                  setPics(res.data)
              })
              .catch((error)=>{
                  console.log(error);
              })
  }
  
  
    return (
     <div className='container-admin'>
    {pics && (
       <div className="contFotos">
         {pics.map((pic, index) => {
           return (
             <div key={index} className="adminPics">
               {pic.is_deleted === 0 ? 
               <img src={`/images/travel/${pic.photo_name}`} />: <img src={`/images/deleted.png`} />}
               <button 
               className="m-2"
               onClick={()=>handleEnable(pic.photo_id, pic.is_deleted)}
               >{pic.is_deleted===0 ? "disable":"enable"}</button>
             </div>
           );
         })}
       </div>
     )}
   </div>
   
  )
}