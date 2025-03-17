// src/pages/WhatIfScenarioPlanner.js
import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  Chip,
  Paper,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const WhatIfScenarioPlanner = () => {
  const navigate = useNavigate();
  
  // State for income records loaded from local storage
  const [incomeList, setIncomeList] = useState([]);
  // State for selected categories to remove (multi-select)
  const [selectedCategories, setSelectedCategories] = useState([]);
  // State to store the simulation result message
  const [simulationResult, setSimulationResult] = useState('');
  // Control dropdown open state
  const [selectOpen, setSelectOpen] = useState(false);

  // On mount, load income records from local storage
  useEffect(() => {
    const stored = localStorage.getItem('incomesRecords');
    if (stored) {
      setIncomeList(JSON.parse(stored));
    }
  }, []);

  // Create default categories you always want to include
  const defaultCategories = ['Rent', 'Deposit', 'Other'];
  // Extract unique categories from income records (filter out empty values)
  const extractedCategories = incomeList
    .map((rec) => rec.category)
    .filter(Boolean);
  // Merge defaults with extracted categories and remove duplicates
  const categories = Array.from(new Set([...defaultCategories, ...extractedCategories]));

  // Handle multi-select change for categories; close dropdown after selection
  const handleCategoryChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedCategories(typeof value === 'string' ? value.split(',') : value);
    setSelectOpen(false);
  };

  // Compute total income from all records
  const computeTotalIncome = () =>
    incomeList.reduce((acc, rec) => acc + parseFloat(rec.amount || 0), 0);

  // Compute total income of records that belong to any selected category
  const computeRemovedIncome = () =>
    incomeList.reduce((acc, rec) => {
      if (selectedCategories.includes(rec.category)) {
        return acc + parseFloat(rec.amount || 0);
      }
      return acc;
    }, 0);

  // Run simulation: subtract removed income from total and display result
  const runSimulation = () => {
    if (selectedCategories.length === 0) {
      setSimulationResult('Please select at least one income category to remove.');
      return;
    }
    const total = computeTotalIncome();
    const removed = computeRemovedIncome();
    const newTotal = total - removed;
    setSimulationResult(
      `Original total income: $${total.toLocaleString()}. If you remove income from the following categories: ${selectedCategories.join(
        ', '
      )}, your predicted next month income would be $${newTotal.toLocaleString()}.`
    );
  };

  return (
    <Container sx={{ my: 4 }}>
      {/* Top Welcome Banner */}
      <Box
        sx={{
          mb: 3,
          p: 3,
          backgroundColor: '#f4f4f4',
          borderRadius: 1,
          textAlign: 'center',
        }}
      >
        <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 1 }}>
          Welcome to What If Scenario Planner
        </Typography>
        <Typography variant="body1">
          What is the Scenario Planner? You can imagine if you lost some income next month—how it would affect your total income. 
          For example, if you lost your rent income next month, the system will recalculate your predicted income by removing that income field. 
          Use this tool to plan and manage your income scenarios.
        </Typography>
      </Box>

      {/* Page Heading */}
      <Typography variant="h4" gutterBottom>
        What If Scenario Planner
      </Typography>
      <Typography variant="body1" gutterBottom>
        Select one or more income categories to remove (e.g. Rent, Deposit, Other) to see how your next month income would be affected.
      </Typography>

      {/* Multi-select Dropdown for Categories */}
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel id="select-income-label">Remove Categories</InputLabel>
        <Select
          labelId="select-income-label"
          multiple
          value={selectedCategories}
          onChange={handleCategoryChange}
          open={selectOpen}
          onOpen={() => setSelectOpen(true)}
          onClose={() => setSelectOpen(false)}
          input={<OutlinedInput label="Remove Categories" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {categories.map((cat) => (
            <MenuItem key={cat} value={cat}>
              {cat}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Buttons */}
      <Box display="flex" gap={2} mb={2}>
        <Button variant="contained" onClick={runSimulation}>
          Run Simulation
        </Button>
        <Button variant="outlined" onClick={() => navigate('/records')}>
          Back to Records
        </Button>
      </Box>

      {/* Display Simulation Result */}
      {simulationResult && (
        <Paper sx={{ p: 2, mb: 2 }}>
          <Typography variant="body1">{simulationResult}</Typography>
        </Paper>
      )}
    </Container>
  );
};

export default WhatIfScenarioPlanner;
