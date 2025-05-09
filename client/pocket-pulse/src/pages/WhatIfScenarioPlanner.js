// src/pages/WhatIfScenarioPlanner.js
import React, { useState, useEffect } from 'react';
import {
  Container, Typography, Button, Box, FormControl, InputLabel, Select,
  MenuItem, OutlinedInput, Chip, Paper
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';          // <-- Axios instance

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: { style: { maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP, width: 250 } },
};

const WhatIfScenarioPlanner = () => {
  const navigate = useNavigate();

  /* --------------------------------------------------- state */
  const [incomeList, setIncomeList]       = useState([]);   // records from API
  const [selectedCategories, setSelected] = useState([]);   // multi‑select
  const [simulationResult, setResult]     = useState('');   // output message
  const [selectOpen, setSelectOpen]       = useState(false);

  /* --------------------------------------------------- load records */
  useEffect(() => {
    const fetchIncomes = async () => {
      try { const { data } = await api.get('/incomes'); setIncomeList(data); }
      catch (err) { console.error(err); }
    };
    fetchIncomes();
  }, []);

  /* --------------------------------------------------- categories list */
  const defaultCategories = ['Rent', 'Deposit', 'Freelance', 'Other'];
  const extracted         = incomeList.map(r => r.category).filter(Boolean);
  const categories        = Array.from(new Set([...defaultCategories, ...extracted]));

  /* --------------------------------------------------- handlers */
  const handleCategoryChange = (e) => {
    const val = e.target.value;
    setSelected(typeof val === 'string' ? val.split(',') : val);
    setSelectOpen(false);
  };

  /* computations */
  const totalIncome   = () =>
    incomeList.reduce((sum, r) => sum + (parseFloat(r.amount) || 0), 0);

  const removedIncome = () =>
    incomeList.reduce((sum, r) =>
      selectedCategories.includes(r.category) ? sum + (parseFloat(r.amount)||0) : sum, 0);

  const runSimulation = () => {
    if (!selectedCategories.length) {
      setResult('Please select at least one income category to remove.');
      return;
    }
    const total   = totalIncome();
    const removed = removedIncome();
    const newTot  = total - removed;

    setResult(
      `Original total income: $${total.toLocaleString()}. If you remove income from ` +
      `${selectedCategories.join(', ')}, your predicted next‑month income would be ` +
      `$${newTot.toLocaleString()}.`
    );
  };

  /* --------------------------------------------------- JSX */
  return (
    <Container sx={{ my:4 }}>
      {/* Welcome banner */}
      <Box sx={{ mb:3, p:3, backgroundColor:'#f4f4f4', borderRadius:1, textAlign:'center' }}>
        <Typography variant="h3" sx={{ fontWeight:'bold', mb:1 }}>
          Welcome to What‑If Scenario Planner
        </Typography>
        <Typography variant="body1">
          Imagine losing an income stream next month—how would that impact your total?
          Select categories like “Rent”, “Deposit”, “Freelance”, etc., and let the planner
          recalculate your predicted income.
        </Typography>
      </Box>

      <Typography variant="h4" gutterBottom>What‑If Scenario Planner</Typography>
      <Typography variant="body1" gutterBottom>
        Choose one or more income categories to exclude and see the effect on next‑month
        income.
      </Typography>

      {/* Multi‑select */}
      <FormControl fullWidth sx={{ mb:2 }}>
        <InputLabel id="select-income-label">Remove Categories</InputLabel>
        <Select
          labelId="select-income-label"
          multiple
          open={selectOpen}
          onOpen={()=>setSelectOpen(true)}
          onClose={()=>setSelectOpen(false)}
          value={selectedCategories}
          onChange={handleCategoryChange}
          input={<OutlinedInput label="Remove Categories" />}
          renderValue={(selected)=>(
            <Box sx={{ display:'flex', flexWrap:'wrap', gap:0.5 }}>
              {selected.map(v => <Chip key={v} label={v} />)}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {categories.map(cat => (
            <MenuItem key={cat} value={cat}>{cat}</MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Buttons */}
      <Box display="flex" gap={2} mb={2}>
        <Button variant="contained" onClick={runSimulation}>Run Simulation</Button>
        <Button variant="outlined" onClick={()=>navigate('/records')}>Back to Records</Button>
      </Box>

      {/* Result */}
      {simulationResult &&
        <Paper sx={{ p:2, mb:2 }}><Typography>{simulationResult}</Typography></Paper>}
    </Container>
  );
};

export default WhatIfScenarioPlanner;
