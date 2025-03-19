import { Box, Button, Grid, IconButton, Stack } from '@mui/material';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import IMG1 from '../Assets/pplogo.png';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PowerSettingsNewOutlinedIcon from '@mui/icons-material/PowerSettingsNewOutlined';
// import SearchIcon from '@mui/icons-material/Search';


const handleRefresh = () => {
  window.location.reload();
};
  export default function Header() {
    return (
      <Grid>
        <Box>
        <Stack direction="row" gap={152} >
            <Box sx={{}}>
              <img src={IMG1} alt="Pocket Pulse Logo" style={{width: '100px', height: '100px'}}/>
            </Box>

            <Box sx={{mt:5}}>
              <IconButton aria-label="Home" color='secondary'>
              <HomeOutlinedIcon sx={{fontSize:'30px'}} />
              </IconButton>

              <IconButton aria-label="Meassage" color='secondary'>
              <EmailOutlinedIcon sx={{fontSize:'25px'}} />
              </IconButton>

              <IconButton aria-label="Meassage" color='secondary'>
              <PowerSettingsNewOutlinedIcon sx={{fontSize:'25px'}} />
              </IconButton>

            </Box>
        </Stack>
        </Box>

        
        <Box sx={{backgroundColor:'#DED6FB', fullWidth:'100%', height:'60px', borderRadius:'8px',my:4}}>
          
          <Stack direction="row" justifyContent={'center'} spacing={10} >
            <Box sx={{mt:2}}>
            <Button onClick={handleRefresh} sx={{ml:5, mt:2}}>
                <RouterLink to="/" style={{ textDecoration: 'none' }}>Home</RouterLink>
            </Button>

            <Button  onClick={handleRefresh} sx={{ml:5, mt:2}}>
                <RouterLink to="/records" style={{ textDecoration: 'none' }}>Income</RouterLink>
            </Button>

            <Button  onClick={handleRefresh} sx={{ml:5, mt:2}}>
                <RouterLink to="/" style={{ textDecoration: 'none' }}>Expense</RouterLink>
            </Button>

            <Button  onClick={handleRefresh} sx={{ml:5, mt:2}}>
                <RouterLink to="/" style={{ textDecoration: 'none' }}>Investment and Savings</RouterLink>
            </Button>

            <Button  onClick={handleRefresh} sx={{ml:5, mt:2}}>
                <RouterLink to="/" style={{ textDecoration: 'none' }}>Transactions</RouterLink>
            </Button>

            <Button  onClick={handleRefresh} sx={{ml:5, mt:2}}>
                <RouterLink to="/community" style={{ textDecoration: 'none' }}>Community</RouterLink>
            </Button>

            </Box>
            {/* <Button sx={{width:'120px', height:'30px'}} color='secondary' variant="contained" startIcon={<SearchIcon/>}>
              Search
            </Button> */}
          </Stack>
        </Box>
      </Grid>
    );
}