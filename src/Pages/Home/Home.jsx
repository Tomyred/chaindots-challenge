import { Search, Visibility, VisibilityOff } from '@mui/icons-material'
import { Box, Button, CircularProgress, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Typography } from '@mui/material'
import axios from 'axios'
import React, { useContext, useState } from 'react'
import WeatherCard from '../../Components/WeatherCard'
import { WeatherContext } from '../../context/WeatherContext/WeatherContext'
import { searchCity } from '../../context/WeatherContext/actions/cityActions'
import { useNavigate } from 'react-router'
import Container from '../../Components/Container'

let typingTimer

const Home = () => {
  const {cityState, cityDispatch} = useContext(WeatherContext)
  const navigate = useNavigate()
  const {data, loading} = cityState


  const handleKeyUp = e => {
    const searchText = e.target.value;
    console.log(e.target.value)

    clearTimeout(typingTimer);

    typingTimer = setTimeout(() => {
      searchCity(cityDispatch, searchText)
    }, 1000);
  };

  const handleCardClick = (city) => {
    navigate("/weather/detail/" + city.displayName, {state: {lat: city.lat, lon: city.lon}})
  }

  return (
    <Container>
      <Box sx={styles.formContainer}>
        <FormControl sx={styles.inputContainer} variant="outlined">
          <InputLabel htmlFor="search-input">Search for your city!</InputLabel>
          <OutlinedInput
            onKeyUp={handleKeyUp}
            data-testid="search-input"
            endAdornment={
              <InputAdornment position="end">
                <Search />
              </InputAdornment>
            }
            label="Search for your city!"
          />
        </FormControl>
      </Box>
      <Box sx={styles.resultsContainer} >
        <Typography sx={{display: 'flex', alignItems: 'center'}} variant='h4' textAlign="left" > Results {loading && <CircularProgress sx={{marginLeft: 2}} size="2rem"/>} </Typography>
        <Box sx={styles.cardsContainer}>
          {data.map( (city, i) => {
            return <WeatherCard key={city.displayName + i} city={city} onClick={handleCardClick}/>
          } )}
        </Box>
      </Box>
    </Container>
  )
}

const styles = {
  formContainer: {
    width: {
      xs: '100%',
      sm: '100%',
      md: '60%',
    },
  },
  inputContainer: { 
    width: "100%",
  },
  resultsContainer: {
    width: {
      xs: '100%',
      sm: '100%',
      md: '60%',
    },
    marginTop: 5,
    height: '100%'
  },
  cardsContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: 'center',
    gap: 2,
    marginTop: 3,
    height: '100%'
  },
}

export default Home