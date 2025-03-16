// src/components/Sidebar.js
import React from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  IconButton,
  Divider,
  Badge
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

function Sidebar() {
  return (
    <Box
      sx={{
        width: '240px',
        backgroundColor: '#f4f8fb', // light bluish background
        height: '100vh',            // full vertical
        display: { xs: 'none', md: 'flex' },
        flexDirection: 'column',
        borderRight: '1px solid #e0e0e0',
      }}
    >
      {/* Top: a placeholder "A" or your logo */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          height: '64px',
          px: 2,
          borderBottom: '1px solid #e0e0e0',
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          <span style={{ color: '#3f51b5' }}>A</span>
        </Typography>
      </Box>

      {/* Main navigation items */}
      <Box sx={{ flex: 1, overflowY: 'auto', p: 1 }}>
        <List disablePadding>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText primary="Home" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText primary="Expense tracking" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText primary="Investment planning" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText primary="Transactions" />
            </ListItemButton>
          </ListItem>

          {/* Incomes - highlight in navy/blue */}
          <ListItem disablePadding>
            <ListItemButton
              sx={{
                backgroundColor: '#2f4ebc',
                '&:hover': {
                  backgroundColor: '#324ea8',
                },
              }}
            >
              <ListItemText
                primary={
                  <Typography sx={{ color: '#fff', fontWeight: 'bold' }}>
                    Incomes
                  </Typography>
                }
              />
            </ListItemButton>
          </ListItem>
        </List>

        {/* Divider */}
        <Divider sx={{ my: 2 }} />

        {/* PROPERTIES heading + plus icon */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            px: 2,
            mb: 1,
          }}
        >
          <Typography
            variant="subtitle2"
            sx={{ fontWeight: 'bold', color: '#777' }}
          >
            PROPERTIES
          </Typography>
          <IconButton size="small" sx={{ color: '#777' }}>
            <AddIcon fontSize="small" />
          </IconButton>
        </Box>

        {/* Example property row */}
        <List disablePadding>
          <ListItem disablePadding sx={{ pl: 2 }}>
            <ListItemButton sx={{ py: 0.5 }}>
              <ListItemText
                primary="123 Main St"
                primaryTypographyProps={{ fontSize: 14 }}
              />
              <KeyboardArrowRightIcon sx={{ color: '#666' }} />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>

      {/* Bottom: "My Referrals" with "New" badge */}
      <Box
        sx={{
          borderTop: '1px solid #e0e0e0',
          p: 2,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Badge
          color="success"
          badgeContent="New"
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          sx={{
            '& .MuiBadge-badge': {
              transform: 'scale(0.8) translate(50%, -50%)',
            },
          }}
        >
          <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
            My Referrals
          </Typography>
        </Badge>
      </Box>
    </Box>
  );
}

export default Sidebar;
