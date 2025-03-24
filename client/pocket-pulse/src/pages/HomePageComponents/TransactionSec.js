import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import IMG1 from '../../Assets/Bitcoin.png'
import metamask from '../../Assets/MetaMask.svg.png'
import web3 from '../../Assets/web3.webp'
import coin from '../../Assets/itcoin.svg.png'
import eth from '../../Assets/Ethereum.svg.png'
import { motion } from 'framer-motion';


export default function TransactionSec() {

const MotionBox = motion(Box);

const navigate = useNavigate();
const handleRefresh = () => {
    window.location.reload();
    }

// const variantContainer = {
//     initial: { x: 0, y: 0, scale: 1 },
//     hover: {
//         scale: 1.1,
//         transition: {
//             duration: 0.5,
//             yoyo: Infinity
//         }
//     }
// }


const Images = [metamask, web3, coin, eth ]

return (
        <Box sx={{
            backgroundColor:'#000000',
            backgroundImage: `url(${IMG1})`,
            backgroundPosition:' right',
            backgroundRepeat:'no-repeat'
    }}>
            <Typography
                        sx={{color: '#FFFFFF',
                                textAlign: 'left',
                                letterSpacing: '8px',
                                lineHeight: '1.5',
                                fontFamily: 'Poppins',
                                fontSize: '6rem',
                                ml: 10,
                                }}>
                Secure & Fast
                <Typography variant='h2' sx={{color:'#cca354'}}>Transactions with AI</Typography>
            </Typography>
            
            <Typography variant="h6"
                        sx={{color: '#FFFFFF',
                                textAlign: 'left',
                                letterSpacing: '4px',
                                lineHeight: '1.5',
                                fontFamily: 'Poppins',
                                fontSize: '1rem',
                                fontWeight: '500',
                                ml: 12,
                                mt:1.5,
                                mb: 5,
                                }}>
                Based Technologies no fee included<br/> just simple way...
            </Typography>
            <MotionBox sx={{ml:5}}
            // variants={variantContainer}
            // initial='initial'
            // whileHover='hover'
            >
            {
                Images.map((images, index) => (
                    <img src={images} key={index} alt='wow' style={{width:'40px', height:'45px', marginLeft:'40px',}} />
                ))
            }
            </MotionBox>

            <Button sx={{
                            width:154,
                            height:51,
                            fontFamily:'poppins',
                            backgroundColor:'#ff6600',
                            color:'white',
                            fontSize:'1.2rem',
                            my:5,
                            ml: '80%',
                            borderRadius:2
                            }}
                            onClick={() => {
                            navigate('/investment-projects');
                            handleRefresh();
                            }}
                            >
                Add Wallet
            </Button>

        <Box sx={{
                            width: '90%',
                            height: '1.5px',
                            backgroundColor: '#cca354',
                            ml: 10,
                            mt:1,
                        }} />
            <br/>
        </Box>
)
}
