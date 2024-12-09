import React, { useContext, useState } from 'react';
import { Box, Button, TextField, Typography, Link } from '@mui/material';
import { useNavigate } from 'react-router';
import formValidators from '../../helpers/validators';
import { saveNewUser } from '../../context/AuthContext/actions/authActions';
import { AuthContext } from '../../context/AuthContext/AuthContext';

const initialState = {
  name: '',
  surname: '',
  email: '',
  password: '',
};

const Register = () => {
  const navigate = useNavigate();

  const [registerForm, setRegisterForm] = useState(initialState);
  const [passwordToValidate, setPasswordToValidate] = useState('');
  const [errors, setErrors] = useState({});
  const {authState, authDispatch} = useContext(AuthContext);

  const {registerError} = authState

  const handleLoginNavigation = () => {
    navigate('/auth/login');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegisterForm({ ...registerForm, [name]: value });

    if (formValidators[name]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: !formValidators[name](value),
      }));
    }
  };

  const handlePasswordValidationChange = (e) => {
    const value = e.target.value;
    setPasswordToValidate(value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      passwordConfirmation: value !== registerForm.password,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    Object.keys(registerForm).forEach((field) => {
      if (formValidators[field] && !formValidators[field](registerForm[field])) {
        newErrors[field] = true;
      }
    });

    if (passwordToValidate !== registerForm.password) {
      newErrors.passwordConfirmation = true;
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      saveNewUser(authDispatch, registerForm)
    }
  };

  return (
    <Box
      sx={{
        width: 400,
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
        Register
      </Typography>
      {registerError.length > 0 
      &&
      <Typography textAlign={'center'} display={'block'}  variant="p" sx={{ mb: 2, color: 'red' }}>
        {registerError}
      </Typography>
      }
      <Box sx={{ display: 'flex', gap: 2, marginBottom: 2 }}>
        <TextField
          name="name"
          value={registerForm.name}
          onChange={handleChange}
          label="Nombre"
          variant="outlined"
          fullWidth
          required
          error={!!errors.name}
          helperText={errors.name && 'Invalid field'}
        />
        <TextField
          name="surname"
          value={registerForm.surname}
          onChange={handleChange}
          label="Apellido"
          variant="outlined"
          fullWidth
          required
          error={!!errors.surname}
          helperText={errors.surname && 'Invalid field'}
        />
      </Box>
      <TextField
        name="email"
        value={registerForm.email}
        onChange={handleChange}
        label="Email"
        type="email"
        fullWidth
        margin="normal"
        required
        error={!!errors.email}
        helperText={errors.email && 'Invalid field'}
      />
      <TextField
        name="password"
        value={registerForm.password}
        onChange={handleChange}
        label="Contraseña"
        type="password"
        fullWidth
        margin="normal"
        required
        error={!!errors.password}
        helperText={
          errors.password &&
          'Must have at least eight characters'
        }
      />
      <TextField
        name="passwordConfirmation"
        value={passwordToValidate}
        onChange={handlePasswordValidationChange}
        label="Validar Contraseña"
        type="password"
        fullWidth
        margin="normal"
        required
        error={!!errors.passwordConfirmation}
        helperText={errors.passwordConfirmation && 'Passwords do not match'}
      />
      <Button
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 2 }}
        onClick={handleSubmit}
      >
        Registrarse
      </Button>
      <Typography sx={{ mt: 2 }}>
        Already have an account?{' '}
        <Link
          component="button"
          onClick={handleLoginNavigation}
          sx={{ cursor: 'pointer', color: 'primary.main' }}
        >
          Log In
        </Link>
      </Typography>
    </Box>
  );
};

export default Register;
