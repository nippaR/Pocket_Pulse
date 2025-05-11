import { Box, Button, Grid, Stack } from '@mui/material';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import IMG1 from '../Assets/fox.png'


const handleRefresh = () => {
  window.location.reload();
};
  export default function Header() {
    
    const navigate = useNavigate();

    return (
      <div style={{ position: 'sticky', top: 0, zIndex: 1000 }}>
      <Grid sx={{ 
                  backgroundColor: '#000000',
                  fontFamily:'poppins'
                  }}>
        <Stack direction={'row'} gap={22}>
          <img src={IMG1} alt="logo" style={{width:'60px', height:'60px', marginLeft:'40px', marginTop:'10px'}}/>
                
        <Box>
            <Stack direction="row" justifyContent={'center'} spacing={15} sx={{ml:13}} >
              <Box sx={{mt:2}}>
              <Button onClick={handleRefresh} sx={{ml:5, mt:2}}>
                  <RouterLink to="/" style={{ textDecoration: 'none',color:'#ffffff', fontSize:'13.5px' }}>Home</RouterLink>
              </Button>

              <Button  onClick={handleRefresh} sx={{ml:5, mt:2}}>
                  <RouterLink to="/investment-projects" style={{ textDecoration: 'none',color:'#ffffff', fontSize:'13.5px' }}> Investment </RouterLink>
              </Button>

              <Button  onClick={handleRefresh} sx={{ml:5, mt:2}}>
                  <RouterLink to="/records" style={{ textDecoration: 'none',color:'#ffffff', fontSize:'13.5px' }}> Income/Expense </RouterLink>
              </Button>

              <Button  sx={{ml:5, mt:2}}>
                  <RouterLink to="/transaction" style={{ textDecoration: 'none', color:'#ffffff', fontSize:'13.5px' }}>Transactions</RouterLink>
              </Button>

              <Button  onClick={handleRefresh} sx={{ml:5, mt:2}}>
                  <RouterLink to="/community" style={{ textDecoration: 'none', color:'#ffffff', fontSize:'13.5px' }}>Community</RouterLink>
              </Button>

              </Box>
              {/* <Button sx={{width:'120px', height:'30px'}} color='secondary' variant="contained" startIcon={<SearchIcon/>}>
                Search
              </Button> */}
            </Stack>
          </Box>

          <Button variant="contained"
                sx={{ backgroundColor: '#ff6600',
                      borderRadius:10, width:115,
                      height:29,
                      mt:2.5,
                      ml:15
                      }}
                      onClick={() =>{
                        navigate('/signup');
                        handleRefresh();
                      }}

                      >
                        login
          </Button>

        </Stack>
      </Grid>
      </div>
    );
}