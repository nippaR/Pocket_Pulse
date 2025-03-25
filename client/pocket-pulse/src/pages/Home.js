import React from 'react';
import {Box, Grid} from '@mui/material';
import InvetSec from './HomePageComponents/InvetSec';
import IncomeSec from './HomePageComponents/IncomeSec';
import TransactionSec from './HomePageComponents/TransactionSec';
import SocialSec from './HomePageComponents/SocialSec';


export default function Home() {

  

  return (

    <Grid sx={{backgroundColor: '#000000',
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
    }}>
      <Box>
      <InvetSec/>
      </Box>
      <Box>
      <IncomeSec/>
      </Box>

      <Box>
      <TransactionSec/>
      </Box>

      <Box>
      <SocialSec/>
      </Box>

    </Grid>
  );
}
