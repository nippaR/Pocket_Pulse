import {Box, Grid} from '@mui/material';
import InvetSec from './HomePageComponents/InvetSec';
import IncomeSec from './HomePageComponents/IncomeSec';
import TransactionSec from './HomePageComponents/TransactionSec';
import SocialSec from './HomePageComponents/SocialSec';
import {motion} from 'framer-motion';

const MotionBox = motion(Box);

const variantContainer = {
    hidden: {
      opacity: 0,
      y:20
    },
    visible: {
      opacity: 1,
      y:0,
      transition: {
        delay: 0.1,
        duration: 0.8,
      },
    },
  };

export default function Home() {

  

  return (

    <Grid sx={{backgroundColor: '#000000',
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
    }}>
      <MotionBox
      variants={variantContainer}
      initial="hidden"
      animate="visible"
      >
      <InvetSec/>
      </MotionBox>

      <MotionBox
      variants={variantContainer}
      initial="hidden"
      animate="visible"
      >
      <IncomeSec/>
      </MotionBox>

      <MotionBox
      variants={variantContainer}
      initial="hidden"
      animate="visible"
      >
      <TransactionSec/>
      </MotionBox>

      <MotionBox
      variants={variantContainer}
      initial="hidden"
      animate="visible"
      >
      <SocialSec/>
      </MotionBox>

    </Grid>
  );
}
