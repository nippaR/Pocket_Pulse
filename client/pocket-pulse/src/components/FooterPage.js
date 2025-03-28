import { Box, Button, Stack, Typography } from '@mui/material'
import React from 'react'
import IMG1 from '../Assets/fox.png'
import { Link as RouterLink } from 'react-router-dom'

export default function FooterPage() {
  
  const handleRefresh = () => {
    window.location.reload();
  }
  
  return (
    <Box
        sx={{
        backgroundColor: '#000000',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
  
      <img src={IMG1} alt="logo" style={{width:'60px', height:'60px', marginLeft:'40px', marginTop:'10px'}}/>

      <Stack direction="row" justifyContent={'center'} spacing={15} sx={{ml:13}} >
              <Box sx={{mt:2}}>
              <Button onClick={handleRefresh} sx={{ml:5, mt:2}}>
                  <RouterLink to="/" style={{ textDecoration: 'none',color:'#ffffff', fontSize:'13.5px' }}>Home</RouterLink>
              </Button>

              <Button  onClick={handleRefresh} sx={{ml:5, mt:2}}>
                  <RouterLink to="/investment-projects" style={{ textDecoration: 'none',color:'#ffffff', fontSize:'13.5px' }}> Privacy Policy </RouterLink>
              </Button>

              <Button  onClick={handleRefresh} sx={{ml:5, mt:2}}>
                  <RouterLink to="/records" style={{ textDecoration: 'none',color:'#ffffff', fontSize:'13.5px' }}> Terms & Conditions </RouterLink>
              </Button>
              </Box>
      </Stack>
      <Box>
        <Typography sx={{color: '#ffffff', mt: 5, mb: 5, ml:15.5}}>
          © 2025 Pocket Pulse. All rights reserved
        </Typography>
      </Box>
    </Box>
  )
}