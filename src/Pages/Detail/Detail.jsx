import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';
import { WeatherContext } from '../../context/WeatherContext/WeatherContext';
import { searchForecast } from '../../context/WeatherContext/actions/forecastActions';
import { Box, Typography, Collapse, IconButton, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Button, Snackbar } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ArrowBack, Delete, Favorite } from '@mui/icons-material';
import { handleAddToFavorite, handleRemoveFromFavs } from '../../context/WeatherContext/actions/cityActions';
import { isInFavorites } from '../../services/db';
import { AuthContext } from '../../context/AuthContext/AuthContext';

const Detail = () => {
  const { cityname } = useParams(); 
  const location = useLocation();
  const navigate = useNavigate()
  const city = location.state;
  const {lat, lon} = city
  const { forecastState, cityState, cityDispatch, forecastDispatch } = useContext(WeatherContext);
  const { authState } = useContext(AuthContext);
  const {user} = authState

  const {data, loading, loaded, loadingError} = forecastState;
  const {saveFavoriteSuccess, saveFavoriteError, favError} = cityState
  
  const [expandedDate, setExpandedDate] = useState(null);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [isInFav, setIsInFav] = useState(false);

  useEffect(() => {
    searchForecast(forecastDispatch, lat, lon);
  }, [lat, lon]);

  useEffect(() => {
    setIsInFav(isInFavorites(city));
  }, [saveFavoriteSuccess, saveFavoriteError])
  

  useEffect(() => {
    
    if(saveFavoriteSuccess){
      setOpenSuccess(true)
    }else if(saveFavoriteError){
      setOpenError(true)
    }

  }, [saveFavoriteSuccess, saveFavoriteError])
  
  const handleRemove = () => {
    handleRemoveFromFavs(cityDispatch, city, user.id)
    setIsInFav(isInFavorites(city))
  }

  const handleDateClick = (date) => {
    setExpandedDate(expandedDate === date ? null : date);
  };

  const handleAddFavorite = () => {
    handleAddToFavorite(cityDispatch, city, user.id)
    setIsInFav(isInFavorites(city))
  }

  const handleCloseSuccess = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSuccess(false);
  };

  const handleCloseError = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenError(false);
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Box display='flex' alignItems='center' justifyContent='space-between' sx={{marginBottom: 2}} >
        <IconButton onClick={() => navigate(-1)} >
          <ArrowBack sx={{color: '#757de8'}} />
        </IconButton>
        <Box display='flex' alignItems='flex-end' justifyContent='space-between' flexDirection={'column'}>
          <Typography textAlign='right' variant="h4" gutterBottom>{cityname}</Typography>
          <Typography display={'block'}  textAlign='right' variant="p">
            5-day forecast
          </Typography>

          {
            isInFav ?
            <Button data-testid='remove-fav-button' onClick={handleRemove} sx={{ color: '#B32134' }}> <Delete sx={{ mr: 1, color: '#B32134' }}/> Remove from favorites</Button>
            :
            <Button data-testid='add-fav-button' onClick={handleAddFavorite} sx={{ color: '#f76c83' }}> <Favorite sx={{ mr: 1, color: '#f76c83' }}/> Add to favorites</Button>
          }

          
        </Box>
      </Box>
      {Object.keys(data).map((date) => (
        <Box data-testid="measurement-container" key={date} sx={{cursor: 'pointer', backgroundColor: 'background.paper', padding: 1, border: '1px solid grey' }} onClick={() => handleDateClick(date)}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography
              variant="h6"
              sx={{ flex: 1 }}
            >
              {date}
            </Typography>
            
            <IconButton sx={{ transform: expandedDate === date ? 'rotate(180deg)' : '' }}>
              <ExpandMoreIcon />
            </IconButton>
          </Box>
          <Collapse  in={expandedDate === date}>
            <TableContainer sx={{marginY: 2}} component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Hour</TableCell>
                    <TableCell align="right">Condition</TableCell>
                    <TableCell align="right">Temperature</TableCell>
                    <TableCell align="right">Humidity</TableCell>
                    <TableCell align="right">Wind speed</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data[date].sort( (i,j) => i.time.slice(0,2) - j.time.slice(0,2) ).map((measurement, index) => (
                    <TableRow
                      key={measurement.time}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {measurement.time}
                      </TableCell>
                      <TableCell align="right">{measurement.condition}</TableCell>
                      <TableCell align="right">{measurement.temp} °C</TableCell>
                      <TableCell align="right">{measurement.humidity} %</TableCell>
                      <TableCell align="right">{measurement.windSpeed} km/h</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Collapse>
        </Box>
      ))}
      <Snackbar
        open={openSuccess}
        autoHideDuration={3000}
        onClose={handleCloseSuccess}
        message="Added to favorites"
      />
      <Snackbar
        open={openError}
        autoHideDuration={3000}
        onClose={handleCloseError}
        message={favError}
      />
    </Box>
  );
};

export default Detail;
