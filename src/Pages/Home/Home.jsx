import { Search, Visibility, VisibilityOff } from '@mui/icons-material'
import { Box, Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'
import baseInstance from '../../AxiosIntances/baseIntance'
import WeatherCard from '../../Components/WeatherCard'

let typingTimer

const Home = () => {

  const [results, setResults] = useState([]);

  const searchCity = async(city) => {
    if(city.length > 1){
      const cityStr = city.trim().replace(" ","+")
      try {
        const response = await baseInstance.get(`/search.json?q=${cityStr}&dt=2024-12-07`);

        const resultsAux = response.data.map( async city => {
          const cityStatus = searchCityWeather(city.lat, city.lon)
          return cityStatus
        } )

        const citiesStatus = await Promise.all(resultsAux);
        console.log(citiesStatus)
        setResults(citiesStatus)

      } catch (error) {
        console.error(error);
      }
    }
  }

  const searchCityWeather = async (lat, lon) => {
    try {
      
      const {data} = await baseInstance.get(`/current.json?q=${lat},${lon}`);

      return {
        displayName: `${data.location.name}, ${data.location.region}, ${data.location.country}`,
        lat,
        lon,
        condition: data.current.condition.text,
        icon: data.current.condition.icon,
        humidity: data.current.humidity,
        windSpeed: data.current.wind_kph
      }
      
    } catch (error) {
      console.log('searchCityWeather', error)
    }
  }

  const handleKeyUp = e => {
    const searchText = e.target.value;
    console.log(e.target.value)

    clearTimeout(typingTimer);

    typingTimer = setTimeout(() => {
      searchCity(searchText)
    }, 1000);
};

  return (
    <Box
      sx={styles.homeContainer}
    >
      <Box sx={styles.formContainer}>
        <FormControl sx={styles.inputContainer} variant="outlined">
          <InputLabel htmlFor="search-input">Search for your city!</InputLabel>
          <OutlinedInput
            onKeyUp={handleKeyUp}
            id="search-input"
            endAdornment={
              <InputAdornment position="end">
                <Search />
              </InputAdornment>
            }
            label="Search for your city!"
          />
        </FormControl>
      </Box>
        <Box sx={styles.cardsContainer}>
        {results.map( (city, i) => {
          return <WeatherCard key={city.displayName + i} city={city} />
        } )}
        </Box>
    </Box>
  )
}

const styles = {
  homeContainer: {
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  formContainer: {
    width: "60%"
  },
  inputContainer: { 
    width: "100%",
  },
  cardsContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 2,
    padding: 2,
    marginTop: 2,
  },
}

export default Home