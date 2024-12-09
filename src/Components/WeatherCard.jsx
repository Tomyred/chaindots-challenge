import { Favorite, Opacity, Speed } from '@mui/icons-material'
import { Box, Card, CardActions, CardContent, CardMedia, IconButton, Typography } from '@mui/material'
import React from 'react'

const WeatherCard = ({ city, onClick }) => {

  const onCardClick = () => {

    onClick && onClick(city)
  }

  return (
    <Card
      sx={styles.card}
      onClick={onCardClick}
       data-testid="city-card"
    >
      <Box sx={{backgroundColor: 'background.paper', color: 'text.primary'}} display="flex" flexDirection="column" gap={.5} flex="1">
        <Typography
          variant="h4"
          component="div"
          fontWeight="bold"
          color="text.primary"
        >
          {city.temp}°C
        </Typography>
        <Typography
          variant="subtitle1"
          component="div"
          color="text.primary"
        >
          {city.displayName}
        </Typography>
        <Typography
          variant="subtitle1"
          component="div"
          color="text.secondary"
        >
          {city.condition}
        </Typography>
        <Box display="flex" gap={2}>
          <Box display="flex" alignItems="center" gap={0.5}>
            <Opacity fontSize="small" color="action" />
            <Typography variant="caption">{city.humidity}% Humidity</Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={0.5}>
            <Speed fontSize="small" color="action" />
            <Typography variant="caption">{city.windSpeed} km/h Wind</Typography>
          </Box>
        </Box>
      </Box>

      <CardMedia
        component="img"
        sx={{
          height: 80,
          width: 80,
          objectFit: 'contain',
        }}
        image={`https:${city.icon}`}
        alt={city.condition}
      />
    </Card>

  )
}

const styles = {
  card: {
    width: {
      xs: '100%',
      sm: '100%',
      md: '45%',
    },
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 2,
    borderRadius: 2,
    boxShadow: 3,
    cursor: 'pointer',
    '&:hover': {
      transform: 'scale(1.05)',
      transition: 'transform 0.2s ease-in-out',
    },
  }
}

export default WeatherCard