// src/pages/GraphViewPage.js
import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Button,
} from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

// Helper function to get ISO week number
const getWeekNumber = (date) => {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
};

const GraphViewPage = () => {
  const [records, setRecords] = useState([]);
  const [graphType, setGraphType] = useState('Bar');
  const [timeframe, setTimeframe] = useState('Annual'); // Annual, Monthly, Weekly
  const [barData, setBarData] = useState([]);
  const [pieData, setPieData] = useState([]);

  // Colors for pie slices
  const COLORS = ['#4caf50', '#f44336'];

  // Load records from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('incomesRecords');
    if (stored) {
      setRecords(JSON.parse(stored));
    }
  }, []);

  // Filter records based on timeframe selection.
  // - Annual: records for current year.
  // - Monthly: records for current month & year.
  // - Weekly: records for current week (using ISO week number).
  const getFilteredRecords = () => {
    const now = new Date();
    return records.filter((r) => {
      if (!r.dateReceived) return false;
      const recDate = new Date(r.dateReceived);
      if (timeframe === 'Annual') {
        return recDate.getFullYear() === now.getFullYear();
      } else if (timeframe === 'Monthly') {
        return (
          recDate.getFullYear() === now.getFullYear() &&
          recDate.getMonth() === now.getMonth()
        );
      } else if (timeframe === 'Weekly') {
        return (
          recDate.getFullYear() === now.getFullYear() &&
          getWeekNumber(recDate) === getWeekNumber(now)
        );
      }
      return true;
    });
  };

  // Aggregate data for Bar Chart
  const aggregateBarData = () => {
    const filtered = getFilteredRecords();
    const grouped = {};

    if (timeframe === 'Annual') {
      // Group by month (short name)
      filtered.forEach((r) => {
        const date = new Date(r.dateReceived);
        const label = date.toLocaleString('default', { month: 'short' });
        if (!grouped[label]) {
          grouped[label] = { label, Income: 0, Expense: 0 };
        }
        const amt = parseFloat(r.amount) || 0;
        if (r.type === 'Expense') {
          grouped[label].Expense += amt;
        } else {
          grouped[label].Income += amt;
        }
      });
      return Object.values(grouped);
    } else if (timeframe === 'Monthly') {
      // Group by day (using full date string)
      filtered.forEach((r) => {
        const date = new Date(r.dateReceived);
        const label = date.toLocaleDateString();
        if (!grouped[label]) {
          grouped[label] = { label, Income: 0, Expense: 0 };
        }
        const amt = parseFloat(r.amount) || 0;
        if (r.type === 'Expense') {
          grouped[label].Expense += amt;
        } else {
          grouped[label].Income += amt;
        }
      });
      return Object.values(grouped);
    } else if (timeframe === 'Weekly') {
      // For weekly, generate data for each day of current week (Monday to Sunday)
      const now = new Date();
      const currentDay = now.getDay() === 0 ? 7 : now.getDay(); // Treat Sunday as 7
      const monday = new Date(now);
      monday.setDate(now.getDate() - (currentDay - 1));
      // Create an array for all 7 days with initial zeros
      const weekData = [];
      for (let i = 0; i < 7; i++) {
        const day = new Date(monday);
        day.setDate(monday.getDate() + i);
        const label = day.toLocaleString('default', { weekday: 'short' });
        weekData.push({ label, Income: 0, Expense: 0 });
      }
      // Aggregate records into the appropriate day
      filtered.forEach((r) => {
        const recDate = new Date(r.dateReceived);
        if (recDate >= monday && recDate <= new Date(monday.getTime() + 6 * 24 * 60 * 60 * 1000)) {
          const dayLabel = recDate.toLocaleString('default', { weekday: 'short' });
          const index = weekData.findIndex((d) => d.label === dayLabel);
          if (index !== -1) {
            const amt = parseFloat(r.amount) || 0;
            if (r.type === 'Expense') {
              weekData[index].Expense += amt;
            } else {
              weekData[index].Income += amt;
            }
          }
        }
      });
      return weekData;
    }
  };

  // Aggregate data for Pie Chart: overall totals in filtered records
  const aggregatePieData = () => {
    const filtered = getFilteredRecords();
    let incomeTotal = 0;
    let expenseTotal = 0;
    filtered.forEach((r) => {
      const amt = parseFloat(r.amount) || 0;
      if (r.type === 'Expense') {
        expenseTotal += amt;
      } else {
        incomeTotal += amt;
      }
    });
    return [
      { name: 'Income', value: incomeTotal },
      { name: 'Expense', value: expenseTotal },
    ];
  };

  // Update aggregated data whenever records, graphType, or timeframe change.
  useEffect(() => {
    if (graphType === 'Bar') {
      setBarData(aggregateBarData());
    } else if (graphType === 'Pie') {
      setPieData(aggregatePieData());
    }
  }, [records, graphType, timeframe]);

  // Determine description text based on timeframe selection
  const descriptionText = {
    Annual: 'Annual Income & Expense Details',
    Monthly: 'Monthly Income & Expense Details',
    Weekly: 'Weekly Income & Expense Details',
  }[timeframe];

  return (
    <Container sx={{ my: 4 }}>
      <Typography variant="h4" gutterBottom>
        Income & Expense Graphs
      </Typography>

      {/* Controls */}
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel id="graph-type-label">Graph Type</InputLabel>
          <Select
            labelId="graph-type-label"
            value={graphType}
            label="Graph Type"
            onChange={(e) => setGraphType(e.target.value)}
          >
            <MenuItem value="Bar">Bar Chart</MenuItem>
            <MenuItem value="Pie">Pie Chart</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel id="timeframe-label">Timeframe</InputLabel>
          <Select
            labelId="timeframe-label"
            value={timeframe}
            label="Timeframe"
            onChange={(e) => setTimeframe(e.target.value)}
          >
            <MenuItem value="Annual">Annual</MenuItem>
            <MenuItem value="Monthly">Monthly</MenuItem>
            <MenuItem value="Weekly">Weekly</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Chart display */}
      <Box sx={{ width: '100%', height: 400 }}>
        {graphType === 'Bar' ? (
          <ResponsiveContainer>
            <BarChart data={barData}>
              <XAxis dataKey="label" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Income" fill="#4caf50" />
              <Bar dataKey="Expense" fill="#f44336" />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        )}
      </Box>

      {/* Description under the chart */}
      <Typography
        variant="h6"
        sx={{ color: 'green', fontWeight: 'bold', mt: 2, textAlign: 'center' }}
      >
        {descriptionText}
      </Typography>

      {/* Back button */}
      <Box sx={{ mt: 2 }}>
        <Button variant="outlined" onClick={() => window.history.back()}>
          Back to Records
        </Button>
      </Box>
    </Container>
  );
};

export default GraphViewPage;
