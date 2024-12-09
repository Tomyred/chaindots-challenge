import { ArrowBack } from '@mui/icons-material'
import { Box, IconButton, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { deleteFromFavorite, getFavorites } from '../../services/db'
import WeatherCard from '../../Components/WeatherCard'
import { AuthContext } from '../../context/AuthContext/AuthContext'

const Favorites = () => {

  const navigate = useNavigate()
  const [favorites, setFavorites] = useState([]);
  const { authState } = useContext(AuthContext);
  const { user } = authState

  const handleCardClick = (city) => {
    navigate("/weather/detail/" + city.displayName, { state: city })
  }

  useEffect(() => {
    const favs = getFavorites(user.id)
    setFavorites(favs)
  }, [user])


  return (
    <Box sx={{ padding: 3 }} >
      <Box display='flex' alignItems='center' justifyContent='space-between' sx={{ marginBottom: 2 }} >
        <IconButton onClick={() => navigate(-1)} >
          <ArrowBack sx={{ color: '#757de8' }} />
        </IconButton>
        <Box display='flex' alignItems='flex-end' justifyContent='space-between' flexDirection={'column'}>
          <Typography textAlign='right' variant="h4" gutterBottom>Your favorites</Typography>
        </Box>
      </Box>
      <Box sx={styles.cardsContainer}>
        {
          favorites.length > 0 ?

            favorites.map((city, i) => {
              return <WeatherCard key={city.displayName + i} city={city} onClick={handleCardClick} />
            })
            :
            <Box display='flex' alignItems='flex-end' justifyContent='space-between' flexDirection={'column'}>
              <Typography textAlign='right' variant="h4" gutterBottom>You don't have favorites yet</Typography>
            </Box>
        }
      </Box>
    </Box>
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
      md: '80%',
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

export default Favorites