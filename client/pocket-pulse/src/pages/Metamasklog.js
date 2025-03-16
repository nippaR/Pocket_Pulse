import React from 'react';
import { Grid, Box, Typography } from '@mui/material';
import LOGO from '../Assets/pplogo.png';


export default function Metamasklog() {
  return (
  <Grid>
    
      <Box
        sx={{
        display: 'flex',
        ml:55,
        my: 10,
        alignItems: 'center',
        height: '600px',
        width: '550px',
        border: '1px solid black',
        backgroundColor: '#202020',
        borderRadius: '10px',
        boxShadow: '0px 4px 10px rgba(0, 0, 2, 0.9)',
        flexDirection: 'column'
        }}
      >
        <img src={LOGO} alt="logo" style={{ width: '70px', height: '70px', marginTop:'35px' }}/>
        <Typography sx={{ color: 'white', fontFamily: 'poppins', mt: 2 }}>
          Connect to Pocket Pulse
        </Typography>
        
        <Box
        sx={{
        display: 'flex',
          alignContent: 'center',
          my: 5,
          alignItems: 'center',
          height: '200px',
          width: '480px',
          backgroundColor: '#353535',
          borderRadius: '20px',
          flexDirection: 'column'
        }}
      >
        <Typography sx={{ color: 'white', fontFamily: 'poppins', mt: 2 }}>
          Please connect to your Metamask account to continue
        </Typography>
        </Box>
      </Box>
    </Grid>
  );
}