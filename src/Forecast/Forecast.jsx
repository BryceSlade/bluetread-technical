import React from 'react';
import { Grid, Typography } from '@mui/material';
import { containerStyle, allTileStyle, tempStyle } from './styles';

export const Forecast = (forecast) => {
  return (
    <Grid container sx={containerStyle}>
      {forecast.data.map((date) => (
        <Grid key={date.date} item sx={allTileStyle}>
          <Typography>{date.date.substr(5)}</Typography>
          <img src={date.day.condition.icon} alt='icon' />
          <Grid sx={tempStyle}>
            <Typography>High: {date.day.maxtemp_f}°</Typography>
            <Typography>Low: {date.day.mintemp_f}°</Typography>
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
};
