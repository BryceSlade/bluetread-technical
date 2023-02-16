import React from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';
import { useForm } from 'react-hook-form';
import {
  Alert,
  Grid,
  IconButton,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import SearchIcon from '@mui/icons-material/Search';
import { buttonStyle, errorStyle, gridStyle, containerStyle } from './styles';
import { Forecast } from './Forecast';

const App = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors: formErrors },
  } = useForm();

  const userInput = watch('city');

  const getWeather = async () => {
    const res = await axios.get(
      'https://nelson-weather-api.herokuapp.com/forecast',
      {
        params: {
          q: userInput,
          days: '14',
        },
      }
    );
    return res.data;
  };

  const { status, refetch, error, data } = useQuery('weather', getWeather, {
    enabled: false,
  });

  const handleSearch = () => refetch();

  return (
    <Grid container sx={containerStyle}>
      <Grid item sx={gridStyle}>
        <form onSubmit={handleSubmit(handleSearch)}>
          <Paper elevation={5}>
            <TextField
              {...register('city', { required: true })}
              placeholder='Enter City'
              color={formErrors.city ? 'warning' : 'primary'}
              autoFocus
              fullWidth
              InputProps={{
                endAdornment: (
                  <IconButton onClick={handleSubmit(handleSearch)}>
                    <SearchIcon />
                  </IconButton>
                ),
              }}
            />
          </Paper>
          {formErrors.city?.type === 'required' && (
            <Alert sx={errorStyle} severity='warning'>
              Please enter a city
            </Alert>
          )}
          <LoadingButton
            loading={status === 'loading'}
            variant='contained'
            type='submit'
            sx={buttonStyle}
            fullWidth
          >
            Search
          </LoadingButton>
        </form>
        {error && (
          <Alert sx={errorStyle} severity='error'>
            Something went wrong
          </Alert>
        )}
      </Grid>
      {data && (
        <Typography sx={{ textAlign: 'center', margin: '10px' }} variant='h4'>
          {data.location.name}, {data.location.region}
        </Typography>
      )}
      {data && <Forecast data={data.forecast.forecastday} />}
    </Grid>
  );
};

export default App;
