import { Box, Button, Grid, Stack } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import ConnectAccount from './ConnectAccount'


export default function TranSum() {

    const navigate = useNavigate()

    return (
        <Grid justifyContent="center" alignItems="center">
            <Stack direction={'column'} spacing={2} sx={{ marginTop: 5, marginBottom: 5, width: '100%', maxWidth: '600px' }}>
                <Box>
                <Button variant='contained' color='primary'
                    sx={{ borderRadius: 5, backgroundColor: 'orange', justifyContent:'flex-end' }}
                    onClick={() => navigate('/add-card')}>
                    Add your Card
                </Button>
                </Box>
                <Box>
                <ConnectAccount />
                </Box>
        </Stack>
    </Grid>
    )
}
