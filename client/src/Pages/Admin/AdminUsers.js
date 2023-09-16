import React, { useEffect, useState } from 'react'
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import axios from 'axios';


export const AdminUsers = () => {
    const [users, setUsers] = useState();
    useEffect(() => {
        
        axios
          .get('http://localhost:4000/admin/getAllUsers')
          .then((res)=>{
                setUsers(res.data)
          })
      }, [])
      
      const handleEdit = (id, isDeleted) =>{

        let url=`http://localhost:4000/admin/desableUser/${id}`

        if(isDeleted === 1){
            url=`http://localhost:4000/admin/enableUser/${id}`
        }

        axios
        .put(url)
        .then((res)=>{
            setUsers(res.data)
        })
        .catch((Err)=>console.log(Err))
      }

  return (
    <div className='container-admin'>
      {users && 
    <TableContainer component={Paper}>
      {/* <Table sx={{ minWidth: 650 }} aria-label="simple table"> */}
      <Table sx={{ minWidth: 650 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <TableCell>Nombre del usuario</TableCell>
            <TableCell align="right">Apellido</TableCell>
            <TableCell align="right">Dirección</TableCell>
            <TableCell align="right">teléfono</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Is_Deleted</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow
              key={user.user_id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {user.name}
              </TableCell>
              <TableCell align="right">{user.lastename}</TableCell>
              <TableCell align="right">{user.address}</TableCell>
              <TableCell align="right">{user.phone}</TableCell>
              <TableCell align="right">{user.email}</TableCell>
              <TableCell align="right">{user.is_deleted}</TableCell>
              <TableCell align='center'>
                  <Button
                    variant='contained'
                    onClick={()=>handleEdit(user.user_id, user.is_deleted)}
                            >{user.is_deleted === 0 ? "Disable":"Enable"}</Button>

              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>}
    </div>
  )
}