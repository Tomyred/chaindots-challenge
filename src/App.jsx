import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios';
import { Button, CssBaseline, FormControl, IconButton, Input, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Home from './Pages/Home/Home';
import { BrowserRouter } from 'react-router';

function App() {

  return (
    <div style={{height: '100vh', width: '100vw', padding: 10}}>
      <CssBaseline />
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    </div>
  )
}
export default App
