import { Favorite, Opacity, Speed } from '@mui/icons-material'
import { Box, Card, CardActions, CardContent, CardMedia, IconButton, Typography } from '@mui/material'
import React from 'react'

const WeatherCard = ({city}) => {
  return (
    <Card sx={{ width: 280, height: 420, mx: "auto", boxShadow: 3, borderRadius: 2, display: "flex", flexDirection: "column" }}>
      <Box sx={{height: '50%'}} >
        <CardMedia
          component="img"
          sx={{ height: '50%', objectFit: "contain", mt: 2 }}
          image={`https:${city.icon}`}
          alt={city.condition}
        />
        <Typography textOverflow={'clip'} variant="h6" component="div" textAlign="center" color="text.primary">
          {city.displayName}
        </Typography>
      </Box>
      <Box display="flex" flexDirection='column' justifyContent="space-between" alignItems="center" sx={{ mt: 1, flex:1 }}>
        <Typography variant="body2" color="text.secondary" textAlign="center" gutterBottom>
          {city.condition}
        </Typography>
        <CardContent>
          <Box display="flex" justifyContent="space-between" flexDirection='column' alignItems="center" sx={{ mt: 1 }}>
            <Box display="flex" alignItems="center" gap={0.5}>
              <Opacity fontSize="small" color="action" />
              <Typography variant="caption">{city.humidity}% Humidity</Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={0.5}>
              <Speed fontSize="small" color="action" />
              <Typography variant="caption">{city.windSpeed} km/h Wind</Typography>
            </Box>
          </Box>
        </CardContent>

        <CardActions disableSpacing sx={{ justifyContent: "space-between", px: 2 }}>
          <IconButton aria-label="add to favorites">
            <Favorite />
          </IconButton>
        </CardActions>
      </Box>
  </Card>
  )
}

export default WeatherCard