import {Box, Grid, Stack} from '@mui/material';
import InvetSec from './HomePageComponents/InvetSec';
import IncomeSec from './HomePageComponents/IncomeSec';
import TransactionSec from './HomePageComponents/TransactionSec';
import SocialSec from './HomePageComponents/SocialSec';
import {motion} from 'framer-motion';
import SlideShow from '../components/SlideShow';

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
        duration: 1.5,
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
      <Stack direction="row" spacing={2} gap={20} sx={{mt:5, ml:5}}>
        
      <InvetSec/>
      <Box sx={{mt:7}}>

        <SlideShow/>

      </Box>
      </Stack>

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
