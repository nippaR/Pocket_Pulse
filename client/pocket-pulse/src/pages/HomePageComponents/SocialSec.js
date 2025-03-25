import React from 'react'
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function SocialSec() {
    const navigate = useNavigate();
    const handleRefresh = () => {
        window.location.reload();
    };

    return (
        <Box sx={{backgroundColor: '#000000'}}>
    <Typography variant="h2"
                sx={{color: '#FFFFFF',
                        textAlign: 'left',
                        letterSpacing: '8px',
                        lineHeight: '1.5',
                        fontFamily: 'Poppins',
                        fontSize: '2.5rem',
                        fontWeight: '700',
                        padding: '10% 0 0 10%'}}>
        Connect Your charity<br/>
        works with our<br/>
        Community
        <Typography variant='h2' sx={{color:'#cca354'}}>and to be Success<br/>
        Goals</Typography>
    </Typography>
    
    <Typography variant="h6"
                sx={{color: '#FFFFFF',
                        textAlign: 'left',
                        letterSpacing: '4px',
                        lineHeight: '1.5',
                        fontFamily: 'Poppins',
                        fontSize: '1rem',
                        fontWeight: '500',
                        padding: '1% 0 0 10%'}}>
        Invest for Future in Stable Platform<br/>
        and Make Fast Money
    </Typography>

    <Button sx={{
                    width:154,
                    height:51,
                    fontFamily:'poppins',
                    backgroundColor:'#ff6600',
                    color:'white',
                    fontSize:'1.2rem',
                    mt:5,
                    mb:10,
                    ml: '80%',
                    borderRadius:2
                    }}
                    onClick={() => {
                    navigate('/community');
                    handleRefresh();
                    }}
                    >
        Open Now
    </Button>

    <Box sx={{
                    width: '90%',
                    height: '1.5px',
                    backgroundColor: '#cca354',
                    ml: 10,
                    mt:10
                
                }} />
        
</Box>

)
}
