import React, { useContext, useState } from 'react';
import { Box, Button, TextField, Typography, Link } from '@mui/material';
import { useNavigate } from 'react-router';
import { doLogin } from '../../context/AuthContext/actions/authActions';
import { AuthContext } from '../../context/AuthContext/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {authState, authDispatch} = useContext(AuthContext);
  const {loginError} = authState

  const handleRegisterNavigation = () => {
    navigate('/auth/register');
  };

  const handleSubmit = () => {
    doLogin(authDispatch, email, password)
  }

  return (
    <Box
      sx={{
        width: 300,
        margin: 'auto',
        padding: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: '#202020',
      }}
    >
      <Typography variant="h5" sx={{ mb: 2 }}>
        Login
      </Typography>
      {loginError.length > 0 
      &&
      <Typography textAlign={'center'} display={'block'}  variant="p" sx={{ mb: 2, color: 'red' }}>
        {error}
      </Typography>
      }
      
      <TextField
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        label="Email"
        type="email"
        fullWidth
        margin="normal"
      />
      <TextField
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        label="Password"
        type="password"
        fullWidth
        margin="normal"
      />
      <Button
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 2 }}
        onClick={handleSubmit}
      >
        Login
      </Button>
      <Typography sx={{ mt: 2 }}>
        You don't have an account?{' '}
        <Link
          component="button"
          onClick={handleRegisterNavigation}
          sx={{ cursor: 'pointer', color: 'primary.main' }}
        >
          Regíster
        </Link>
      </Typography>
    </Box>
  );
};

export default Login;
