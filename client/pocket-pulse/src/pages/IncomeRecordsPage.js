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
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

// MUI Icons
import RefreshIcon from '@mui/icons-material/Refresh';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import SummarizeIcon from '@mui/icons-material/Summarize';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';

// PDF generation
import jsPDF from 'jspdf';
import 'jspdf-autotable';

import Sidebar from '../components/Sidebar';

function IncomeRecordsPage() {
  const [incomeList, setIncomeList] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [showSyncBanner, setShowSyncBanner] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // Load/reload data from local storage and check for updated flag
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

  // Manual refresh: reload data and hide sync banner
  const handleRefresh = () => {
    const stored = localStorage.getItem('incomesRecords');
    if (stored) {
      setIncomeList(JSON.parse(stored));
    }
    setShowSyncBanner(false);
    console.log('Refresh clicked!');
  };

  // Navigation handlers
  const handleAddIncome = () => {
    navigate('/income');
  };

  // New "What If" button navigates to WhatIfScenarioPlanner page
  const handleWhatIf = () => {
    navigate('/what-if');
  };

  // Filter icon placeholder
  const handleFilter = () => {
    console.log('Filter icon clicked!');
    // Implement filter functionality here if needed
  };

  // Report generation: generate PDF and open in new tab for preview
  const handleReport = () => {
    console.log('Report icon clicked! Generating PDF...');

    const doc = new jsPDF('p', 'pt', 'a4');

    // Title at the top: "Pocket pulse."
    doc.setFontSize(20);
    doc.text('Pocket pulse.', 50, 40);

    // Subheading: "Income Records."
    doc.setFontSize(14);
    doc.text('Income Records.', 50, 60);

    // Prepare table data (5 columns: Date, Type, Category, Vendor/Payer, Amount)
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

    // Draw table using autoTable
    doc.autoTable({
      startY: 80,
      head: [tableColumn],
      body: tableRows,
      theme: 'grid',
      headStyles: { fillColor: [220, 220, 220] },
    });

    // Footer: "Pocket pulse." at bottom
    const pageHeight = doc.internal.pageSize.getHeight();
    doc.setFontSize(16);
    doc.text('Pocket pulse.', 50, pageHeight - 40);

    // Open PDF in new tab for preview
    doc.output('dataurlnewwindow');
  };

  // Checkbox: select/unselect all rows
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const allIndices = incomeList.map((_, index) => index);
      setSelectedRows(allIndices);
    } else {
      setSelectedRows([]);
    }
  };

  // Checkbox: toggle a single row
  const handleRowCheckboxChange = (index) => {
    if (selectedRows.includes(index)) {
      setSelectedRows(selectedRows.filter((i) => i !== index));
    } else {
      setSelectedRows([...selectedRows, index]);
    }
  };

  // Edit row: navigate to edit page with index parameter
  const handleEdit = (index) => {
    navigate(`/edit-income/${index}`);
  };

  // Delete row: remove item and re-map selection indices
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

  return (
    <Box display="flex" width="100%">
      <Sidebar />

      <Container sx={{ flexGrow: 1, py: 3 }}>
        {/* TIER 1 BANNER */}
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
          {/* Left side: "Incomes" label */}
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Incomes
          </Typography>
          {/* Right side: $50 credit, then notification, then profile */}
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
            <Avatar src="/images/profile.jpg" alt="Profile" />
          </Box>
        </Box>

        {/* TIER 2 TOP BAR */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography variant="h4">Incomes</Typography>
          <Box display="flex" alignItems="center" gap={1}>
            {/* New "What If" Button */}
            <Button variant="outlined" onClick={() => navigate('/what-if')}>
              What If
            </Button>
            <IconButton onClick={handleFilter}>
              <FilterAltOutlinedIcon />
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

        {/* Sync Banner if updated */}
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

        {/* Table of incomes */}
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
              {incomeList.map((item, index) => {
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
              {incomeList.length === 0 && (
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
