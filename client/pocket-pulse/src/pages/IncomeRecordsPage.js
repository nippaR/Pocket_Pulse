// src/pages/IncomeRecordsPage.js

import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  IconButton,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Checkbox,
  Button,
  Avatar,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  Badge,
  Popover,
  TextField,
} from '@mui/material';
import { useNavigate, useLocation, Link } from 'react-router-dom';

// MUI Icons
import RefreshIcon from '@mui/icons-material/Refresh';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import SummarizeIcon from '@mui/icons-material/Summarize';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';

// For PDF generation
import jsPDF from 'jspdf';
import 'jspdf-autotable';

// Updated Sidebar component with "Goal setting" instead of "Expense tracking"
const Sidebar = () => {
  return (
    <Box
      sx={{
        width: '240px',
        backgroundColor: '#f4f8fb',
        height: '100vh',
        display: { xs: 'none', md: 'flex' },
        flexDirection: 'column',
        borderRight: '1px solid #e0e0e0',
      }}
    >
      {/* Logo/Brand area */}
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

      {/* Navigation List */}
      <Box sx={{ flex: 1, overflowY: 'auto', p: 1 }}>
        <List disablePadding>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/">
              <ListItemText primary="Home" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton>
              {/* Changed from Expense tracking to Goal setting */}
              <ListItemText primary="Goal setting" />
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

        <Divider sx={{ my: 2 }} />

        {/* Properties Section */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            px: 2,
            mb: 1,
          }}
        >
          <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: '#777' }}>
            PROPERTIES
          </Typography>
          <IconButton size="small" sx={{ color: '#777' }}>
            <AddIcon fontSize="small" />
          </IconButton>
        </Box>
        <List disablePadding>
          <ListItem disablePadding sx={{ pl: 2 }}>
            <ListItemButton sx={{ py: 0.5 }}>
              <ListItemText primary="123 Main St" primaryTypographyProps={{ fontSize: 14 }} />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>

      {/* Bottom Section */}
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
          sx={{ '& .MuiBadge-badge': { transform: 'scale(0.8) translate(50%, -50%)' } }}
        >
          <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
            My Referrals
          </Typography>
        </Badge>
      </Box>
    </Box>
  );
};

function IncomeRecordsPage() {
  const [incomeList, setIncomeList] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [showSyncBanner, setShowSyncBanner] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchVisible, setSearchVisible] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // Load/reload data from local storage
  useEffect(() => {
    const stored = localStorage.getItem('incomesRecords');
    if (stored) {
      setIncomeList(JSON.parse(stored));
    }
    if (location.state?.updated) {
      setShowSyncBanner(true);
      navigate('/records', { replace: true, state: {} });
    }
  }, [location, navigate]);

  // Manual refresh
  const handleRefresh = () => {
    const stored = localStorage.getItem('incomesRecords');
    if (stored) {
      setIncomeList(JSON.parse(stored));
    }
    setShowSyncBanner(false);
    console.log('Refresh clicked!');
  };

  const handleAddIncome = () => {
    navigate('/income');
  };

  const handleWhatIf = () => {
    navigate('/what-if');
  };

  // When search icon is clicked, toggle search bar visibility
  const handleSearchIconClick = () => {
    setSearchVisible(!searchVisible);
  };

  // Search input change handler
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter incomeList based on search query (case-insensitive)
  const filteredIncomeList = incomeList.filter((record) => {
    const query = searchQuery.toLowerCase();
    return (
      record.dateReceived?.toLowerCase().includes(query) ||
      record.type?.toLowerCase().includes(query) ||
      record.category?.toLowerCase().includes(query) ||
      record.payer?.toLowerCase().includes(query)
    );
  });

  const handleReport = () => {
    console.log('Report icon clicked! Generating PDF...');
    const doc = new jsPDF('p', 'pt', 'a4');
    doc.setFontSize(20);
    doc.text('Pocket pulse.', 50, 40);
    doc.setFontSize(14);
    doc.text('Income Records.', 50, 60);
    const tableColumn = ['Date', 'Type', 'Category', 'Vendor/Payer', 'Amount'];
    const tableRows = [];
    incomeList.forEach((item) => {
      const rowData = [
        item.dateReceived || '',
        item.type || 'Income',
        item.category || '',
        item.payer || '',
        item.amount ? `$${Number(item.amount).toLocaleString()}` : '',
      ];
      tableRows.push(rowData);
    });
    doc.autoTable({
      startY: 80,
      head: [tableColumn],
      body: tableRows,
      theme: 'grid',
      headStyles: { fillColor: [220, 220, 220] },
    });
    const pageHeight = doc.internal.pageSize.getHeight();
    doc.setFontSize(16);
    doc.text('Pocket pulse.', 50, pageHeight - 40);
    doc.output('dataurlnewwindow');
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const allIndices = incomeList.map((_, index) => index);
      setSelectedRows(allIndices);
    } else {
      setSelectedRows([]);
    }
  };

  const handleRowCheckboxChange = (index) => {
    if (selectedRows.includes(index)) {
      setSelectedRows(selectedRows.filter((i) => i !== index));
    } else {
      setSelectedRows([...selectedRows, index]);
    }
  };

  const handleEdit = (index) => {
    navigate(`/edit-income/${index}`);
  };

  const handleDelete = (delIndex) => {
    const updatedList = incomeList.filter((_, i) => i !== delIndex);
    setIncomeList(updatedList);
    localStorage.setItem('incomesRecords', JSON.stringify(updatedList));
    const newSelectedRows = selectedRows
      .filter((rowIndex) => rowIndex !== delIndex)
      .map((rowIndex) => (rowIndex > delIndex ? rowIndex - 1 : rowIndex));
    setSelectedRows(newSelectedRows);
    console.log(`Deleted record #${delIndex}`);
  };

  // Directly navigate to Sign In page on profile click
  const handleProfileClick = () => {
    navigate('/signin');
  };

  return (
    <Box display="flex" width="100%">
      <Sidebar />
      <Container sx={{ flexGrow: 1, py: 3 }}>
        {/* Tier 1 Banner */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          sx={{
            mb: 2,
            backgroundColor: '#1e407c',
            color: '#fff',
            p: 2,
            borderRadius: 1,
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Incomes
          </Typography>
          <Box display="flex" alignItems="center" gap={2}>
            <Box
              sx={{
                backgroundColor: '#ffeb99',
                color: '#000',
                px: 2,
                py: 0.5,
                borderRadius: 4,
                fontWeight: 'bold',
              }}
            >
              $50 credit balance
            </Box>
            <IconButton sx={{ color: '#fff' }}>
              <NotificationsNoneIcon />
            </IconButton>
            <IconButton onClick={handleProfileClick}>
              <Avatar src="/images/profile.jpg" alt="Profile" />
            </IconButton>
          </Box>
        </Box>

        {/* Tier 2 Top Bar */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography variant="h4">Incomes</Typography>
          <Box display="flex" alignItems="center" gap={1}>
            <Button variant="outlined" onClick={handleWhatIf}>
              What If
            </Button>
            <IconButton onClick={handleSearchIconClick}>
              <SearchIcon />
            </IconButton>
            <IconButton onClick={handleReport}>
              <SummarizeIcon />
            </IconButton>
            <Button
              variant="contained"
              sx={{ backgroundColor: '#283593' }}
              startIcon={<AddIcon />}
              onClick={handleAddIncome}
            >
              Add Income
            </Button>
          </Box>
        </Box>

        {/* Display search bar if searchVisible is true */}
        {searchVisible && (
          <Box sx={{ mb: 2 }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search by Date, Type, Category, Vendor/Payer"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </Box>
        )}

        {showSyncBanner && (
          <Paper sx={{ p: 2, mb: 2, backgroundColor: '#e8f5e9' }}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography>
                Your transactions have successfully been synced. Please refresh.
              </Typography>
              <IconButton color="primary" onClick={handleRefresh}>
                <RefreshIcon />
              </IconButton>
            </Box>
          </Paper>
        )}

        {/* Table of incomes using filtered records */}
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={
                      selectedRows.length === incomeList.length &&
                      incomeList.length > 0
                    }
                    indeterminate={
                      selectedRows.length > 0 &&
                      selectedRows.length < incomeList.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Vendor/Payer</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredIncomeList.map((item, index) => {
                const isSelected = selectedRows.includes(index);
                return (
                  <TableRow key={index}>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isSelected}
                        onChange={() => handleRowCheckboxChange(index)}
                      />
                    </TableCell>
                    <TableCell>{item.dateReceived || 'N/A'}</TableCell>
                    <TableCell>{item.type || 'Income'}</TableCell>
                    <TableCell>{item.category || 'Rent'}</TableCell>
                    <TableCell>{item.payer || 'John Doe'}</TableCell>
                    <TableCell>
                      {item.amount
                        ? `$ ${Number(item.amount).toLocaleString()}`
                        : '$ 1,000.00'}
                    </TableCell>
                    <TableCell align="center">
                      {isSelected && (
                        <>
                          <IconButton
                            sx={{ mr: 1 }}
                            onClick={() => handleEdit(index)}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton onClick={() => handleDelete(index)}>
                            <DeleteIcon color="error" />
                          </IconButton>
                        </>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
              {filteredIncomeList.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    No income records found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </Box>
  );
}

export default IncomeRecordsPage;
