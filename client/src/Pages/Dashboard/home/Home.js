import React from 'react'

import './home.scss';

export const Home = () => {
  return (
      <div className='d-flex align-items-center justify-content-center'>
        <div className='divHome'>
          <h1>Travels</h1>
          <h2>Show your adventures to the world</h2>
        </div>
        <div className='background-container'>
          <div className='background-effect'></div>
          <img src='/images/snow.jpg'/>
          <img src='/images/market.jpg'/>
          <img src='/images/beach.jpg'/>
        </div>
      </div>
  )
}
