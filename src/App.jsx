import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios';
import { Button } from '@mui/material';

function App() {

  const testReq = async() => {

    // const options = {
    //   method: 'GET',
    //   url: 'https://weatherbit-v1-mashape.p.rapidapi.com/forecast/3hourly',
    //   params: {
    //     lat: '-31.6584',
    //     lon: '-64.4273',
    //     units: 'imperial',
    //     lang: 'en'
    //   },
    //   headers: {
    //     'x-rapidapi-key': '655e7584fbmsh272ff5cfa73554cp1224e9jsn5a2cb98937f4',
    //     'x-rapidapi-host': 'weatherbit-v1-mashape.p.rapidapi.com'
    //   }
    // };

    // try {
    //   const response = await axios.request(options);
    //   console.log(response.data);
    // } catch (error) {
    //   console.error(error);
    // }


    const options = {
      method: 'GET',
      url: 'https://weatherapi-com.p.rapidapi.com/search.json',
      params: {
        q: 'alta gracia',
        dt: '2024-12-07'
      },
      headers: {
        'x-rapidapi-key': '655e7584fbmsh272ff5cfa73554cp1224e9jsn5a2cb98937f4',
        'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com'
      }
    };
    
    try {
      const response = await axios.request(options);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }

  }
  
  return (
    <>
      <Button variant="contained" onClick={testReq} >asdsad</Button>
    </>
  )
}

export default App
