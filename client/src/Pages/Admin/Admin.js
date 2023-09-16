import React, { useEffect, useState } from 'react'
import {Container, Grid, Typography} from '@mui/material'
import axios from 'axios'
import { TotalUsers } from './sections/TotalUsers'

export const Admin = () => {

  const [allUsers, setAllUsers] = useState();
  const [total, setTotal] = useState();
  const [totalEnable, setTotalEnable] = useState();
  const [totalDisable, setTotalDisable] = useState();

  useEffect(() => {
    axios
      .get('http://localhost:4000/admin/getAllUsers')
      .then((res)=>{
        setAllUsers(res.data);
        setTotal(res.data.length);
        setTotalEnable(res.data.filter(e=>e.is_deleted === 0).length)
        setTotalDisable(res.data.filter(e=>e.is_deleted === 1).length)
      })
  }, [])
  

  return (
    <Container className='container-admin' maxWidth="xl">
      <Typography variant='h4' sx={{ mb: 5}}>
        Welcome Admin! 
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <TotalUsers title = {"Total"} data={total}/>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
        <TotalUsers title = {"Active"} data={totalEnable}/>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
        <TotalUsers title = {"Blocked"} data={totalDisable}/>
        </Grid>
      </Grid>

    </Container>
    
  )
}