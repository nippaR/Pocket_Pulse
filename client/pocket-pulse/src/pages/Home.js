import React from 'react';
import {Grid} from '@mui/material';
import InvetSec from './HomePageComponents/InvetSec';
import IncomeSec from './HomePageComponents/IncomeSec';
import TransactionSec from './HomePageComponents/TransactionSec';


export default function Home() {

  

  return (

    <Grid sx={{backgroundColor: '#000000',
              width: '100%',
              height: '100vh',
              display: 'flex',
              flexDirection: 'column',
    }}>

      <InvetSec/>

      <IncomeSec/>

      <TransactionSec/>

    </Grid>
  );
}
