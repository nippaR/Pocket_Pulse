import * as React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TransAct from './TransAct';
import TransSend from './TransSend';
import SummaryPage from './SummaryPage';

function TabPanel(props) {
const { children, value, index, ...other } = props;

    return (
        <div
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
        >
        {value === index && (
            <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
            </Box>
        )}
        </div>
    );
    }

    TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
    };

    function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
    }

export default function FullWidthTabs() {
        const theme = useTheme();
        const [value, setValue] = React.useState(0);

        const handleChange = (event, newValue) => {
            setValue(newValue);
        };

        return (
                <Box sx={{ bgcolor: '#fff', width: '100%', minHeight: '100vh' }}>
            <AppBar position="static">
                <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="inherit"
                variant="fullWidth"
                aria-label="full width tabs example"
                sx={{ backgroundColor: '#10151b' }}
                >
                <Tab label="Transaction" {...a11yProps(0)} />
                <Tab label="Summary" {...a11yProps(1)} />
                <Tab label="Activity" {...a11yProps(2)} />
                </Tabs>
            </AppBar>

            <TabPanel value={value} index={0} dir={theme.direction}>
                <TransSend/>
            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction}>
                <SummaryPage/>
            </TabPanel>
            
            <TabPanel value={value} index={2} dir={theme.direction}>
                <TransAct/>
            </TabPanel>
            </Box>
        );
}