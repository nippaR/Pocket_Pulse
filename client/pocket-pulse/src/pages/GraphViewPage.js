// src/pages/GraphViewPage.js
import React, { useState, useEffect } from 'react';
import {
  Container, Typography, FormControl, InputLabel, Select,
  MenuItem, Box, Button
} from '@mui/material';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import api from '../services/api';

/* ISO week number helper */
const getWeekNumber = (date) => {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
};

const GraphViewPage = () => {
  const [records, setRecords]     = useState([]);
  const [graphType, setGraphType] = useState('Bar');      // Bar | Pie
  const [timeframe,  setTimeframe] = useState('Annual');  // Annual | Monthly | Weekly
  const [barData,  setBarData]  = useState([]);
  const [pieData,  setPieData]  = useState([]);

  const COLORS = ['#4caf50', '#f44336'];

  /* ---------------------- fetch records from API */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await api.get('/incomes');
        setRecords(data);
      } catch (err) { console.error(err); }
    };
    fetchData();
  }, []);

  /* ---------------------- helpers */
  const getFilteredRecords = () => {
    const now = new Date();
    return records.filter((r) => {
      if (!r.dateReceived) return false;
      const recDate = new Date(r.dateReceived);
      if (timeframe === 'Annual')
        return recDate.getFullYear() === now.getFullYear();
      if (timeframe === 'Monthly')
        return recDate.getFullYear() === now.getFullYear() &&
               recDate.getMonth() === now.getMonth();
      if (timeframe === 'Weekly')
        return recDate.getFullYear() === now.getFullYear() &&
               getWeekNumber(recDate) === getWeekNumber(now);
      return true;
    });
  };

  /* ---------------------- Bar aggregation */
  const aggregateBarData = () => {
    const filtered = getFilteredRecords();
    const grouped  = {};

    if (timeframe === 'Annual') {
      filtered.forEach((r) => {
        const month = new Date(r.dateReceived).toLocaleString('default', { month: 'short' });
        if (!grouped[month]) grouped[month] = { label: month, Income: 0, Expense: 0 };

        const amt = parseFloat(r.amount) || 0;
        if (r.type === 'Expense') grouped[month].Expense += amt;
        else                      grouped[month].Income  += amt;
      });
      return Object.values(grouped);
    }

    if (timeframe === 'Monthly') {
      filtered.forEach((r) => {
        const day = new Date(r.dateReceived).toLocaleDateString();
        if (!grouped[day]) grouped[day] = { label: day, Income: 0, Expense: 0 };

        const amt = parseFloat(r.amount) || 0;
        if (r.type === 'Expense') grouped[day].Expense += amt;
        else                      grouped[day].Income  += amt;
      });
      return Object.values(grouped);
    }

    /* Weekly */
    const now  = new Date();
    const mon  = new Date(now);
    mon.setDate(now.getDate() - ((now.getDay() || 7) - 1));
    const week = Array.from({ length: 7 }).map((_, i) => {
      const d = new Date(mon); d.setDate(mon.getDate() + i);
      return { label: d.toLocaleString('default', { weekday: 'short' }), Income: 0, Expense: 0 };
    });

    filtered.forEach((r) => {
      const d = new Date(r.dateReceived);
      const label = d.toLocaleString('default', { weekday: 'short' });
      const idx   = week.findIndex(w => w.label === label);
      if (idx !== -1) {
        const amt = parseFloat(r.amount) || 0;
        if (r.type === 'Expense') week[idx].Expense += amt;
        else                      week[idx].Income  += amt;
      }
    });
    return week;
  };

  /* ---------------------- Pie aggregation */
  const aggregatePieData = () => {
    const filtered = getFilteredRecords();
    let income = 0, expense = 0;
    filtered.forEach((r) => {
      const amt = parseFloat(r.amount) || 0;
      if (r.type === 'Expense') expense += amt;
      else                      income  += amt;
    });
    return [{ name: 'Income', value: income }, { name: 'Expense', value: expense }];
  };

  /* recalculate when deps change */
  useEffect(() => {
    if (graphType === 'Bar') setBarData(aggregateBarData());
    else                     setPieData(aggregatePieData());
  }, [records, graphType, timeframe]);

  const description = {
    Annual:  'Annual Income & Expense Details',
    Monthly: 'Monthly Income & Expense Details',
    Weekly:  'Weekly Income & Expense Details',
  }[timeframe];

  /* ---------------------- UI */
  return (
    <Container sx={{ my: 4 }}>
      <Typography variant="h4" gutterBottom>Income & Expense Graphs</Typography>

      {/* Controls */}
      <Box sx={{ display:'flex', gap:2, mb:2 }}>
        <FormControl sx={{ minWidth:120 }}>
          <InputLabel id="graph-type">Graph Type</InputLabel>
          <Select labelId="graph-type" value={graphType} label="Graph Type"
                  onChange={(e)=>setGraphType(e.target.value)}>
            <MenuItem value="Bar">Bar Chart</MenuItem>
            <MenuItem value="Pie">Pie Chart</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth:120 }}>
          <InputLabel id="timeframe">Timeframe</InputLabel>
          <Select labelId="timeframe" value={timeframe} label="Timeframe"
                  onChange={(e)=>setTimeframe(e.target.value)}>
            <MenuItem value="Annual">Annual</MenuItem>
            <MenuItem value="Monthly">Monthly</MenuItem>
            <MenuItem value="Weekly">Weekly</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Chart */}
      <Box sx={{ width:'100%', height:400 }}>
        {graphType === 'Bar' ? (
          <ResponsiveContainer>
            <BarChart data={barData}>
              <XAxis dataKey="label" /><YAxis /><Tooltip /><Legend />
              <Bar dataKey="Income"  fill="#4caf50" />
              <Bar dataKey="Expense" fill="#f44336" />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <ResponsiveContainer>
            <PieChart>
              <Pie data={pieData} dataKey="value" nameKey="name"
                   cx="50%" cy="50%" outerRadius={100} label>
                {pieData.map((_, i) =>
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                )}
              </Pie>
              <Tooltip /><Legend />
            </PieChart>
          </ResponsiveContainer>
        )}
      </Box>

      <Typography variant="h6" sx={{ color:'green', fontWeight:'bold', mt:2, textAlign:'center' }}>
        {description}
      </Typography>

      <Box sx={{ mt:2 }}>
        <Button variant="outlined" onClick={()=>window.history.back()}>
          Back to Records
        </Button>
      </Box>
    </Container>
  );
};

export default GraphViewPage;
