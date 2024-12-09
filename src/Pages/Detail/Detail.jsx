import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';
import { WeatherContext } from '../../context/WeatherContext/WeatherContext';
import { searchForecast } from '../../context/WeatherContext/actions/forecastActions';
import { Box, Typography, Grid, Card, CardContent, CardHeader, Divider, Collapse, IconButton, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'; // Icono para expandir/contraer
import { ArrowBack } from '@mui/icons-material';

const Detail = () => {
  const { city } = useParams(); 
  const location = useLocation();
  const navigate = useNavigate()
  const { lat, lon } = location.state;
  const { forecastState, forecastDispatch } = useContext(WeatherContext);
  
  const [expandedDate, setExpandedDate] = useState(null);

  useEffect(() => {
    searchForecast(forecastDispatch, lat, lon);
  }, [lat, lon]);

  const groupedData = forecastState?.data || {};

  const handleDateClick = (date) => {
    setExpandedDate(expandedDate === date ? null : date);
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Box display='flex' alignItems='center' justifyContent='space-between' >
        <IconButton onClick={() => navigate(-1)} >
          <ArrowBack sx={{color: '#757de8'}} />
        </IconButton>
        <Box >
          <Typography textAlign='right' variant="h4" gutterBottom>{city}</Typography>
          <Typography display={'block'}  textAlign='right' variant="p">
            5-day forecast
          </Typography>
        </Box>
      </Box>
      {Object.keys(groupedData).map((date) => (
        <Box key={date} sx={{ marginY: 4 }} onClick={() => handleDateClick(date)}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography
              variant="h6"
              sx={{ cursor: 'pointer', flex: 1 }}
            >
              {date}
            </Typography>
            
            <IconButton sx={{ transform: expandedDate === date ? 'rotate(180deg)' : '' }}>
              <ExpandMoreIcon />
            </IconButton>
          </Box>

          {/* Collapse para las mediciones de un día */}
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
                  {groupedData[date].sort( (i,j) => i.time.slice(0,2) - j.time.slice(0,2) ).map((measurement, index) => (
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
    </Box>
  );
};

export default Detail;
