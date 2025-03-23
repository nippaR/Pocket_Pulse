import { Box, Button, Grid, Stack } from '@mui/material';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';



const handleRefresh = () => {
  window.location.reload();
};
  export default function Header() {
    return (
      <Grid>
          
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
                <RouterLink to="/investment-projects" style={{ textDecoration: 'none' }}>Investment and Savings</RouterLink>
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
      </Grid>
    );
}