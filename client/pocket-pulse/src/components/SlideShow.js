import React, { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Box, Container } from '@mui/material'
import IMG1 from '../Assets/co2.gif'
import IMG2 from '../Assets/co1.png'
import IMG3 from '../Assets/giphy.gif'

const images = [
    IMG1,
    IMG2,
    IMG3,
]

const variants = {
    initial: (direction) => ({
        x: direction > 0 ? 1000 : -1000,
        opacity: 0,
    }),
    animate: {
        x: 0,
        opacity: 1,
        transition: {
            x: { type: 'spring', stiffness: 300, damping: 30 },
            opacity: { duration: 0.5 },
        },
    },
    exit: (direction) => ({
        x: direction > 0 ? -1000 : 1000,
        opacity: 0,
        transition: {
            x: { type: 'spring', stiffness: 300, damping: 30 },
            opacity: { duration: 0.5 },
        },
    }),
}

function SlideShow() {
    const [index, setIndex] = useState(0)
    const [direction, setDirection] = useState(1)

    useEffect(() => {
        const interval = setInterval(() => {
            setDirection(1)
            setIndex((prevIndex) => (prevIndex + 1) % images.length)
        }, 30000)

        return () => clearInterval(interval) // Clean up
    }, [])

    return (
        <Container maxWidth="md" sx={{ mt: 5, position: 'relative' }}>
            <Box
                sx={{
                    position: 'relative',
                    overflow: 'hidden',
                    borderRadius: 2,
                    boxShadow: 3,
                    height: '500px',
                    width: '750px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <AnimatePresence initial={false} custom={direction}>
                    <motion.img
                        key={images[index]}
                        src={images[index]}
                        alt="slide"
                        custom={direction}
                        variants={variants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        style={{
                            position: 'absolute',
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            borderRadius: '8px',
                        }}
                    />
                </AnimatePresence>
            </Box>
        </Container>
    )
}

export default SlideShow
