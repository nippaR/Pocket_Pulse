// src/pages/IncomeRecordsPage.js
import React, { useState, useEffect } from 'react';
import {
  Box, Container, Paper, Typography, IconButton, Table, TableHead, TableRow,
  TableCell, TableBody, TableContainer, Checkbox, Button, Avatar, List,
  ListItem, ListItemButton, ListItemText, Divider, Badge, TextField
} from '@mui/material';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import RefreshIcon from '@mui/icons-material/Refresh';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import SummarizeIcon from '@mui/icons-material/Summarize';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import api from '../services/api';                       // <-- Axios instance

/* ---------------------------------------------------------------- Sidebar */
const Sidebar = () => (
  <Box sx={{
    width: 240, backgroundColor: '#f4f8fb', height: '100vh',
    display: { xs: 'none', md: 'flex' }, flexDirection: 'column',
    borderRight: '1px solid #e0e0e0'
  }}>
    <Box sx={{
      display: 'flex', alignItems: 'center', height: 64, px: 2,
      borderBottom: '1px solid #e0e0e0'
    }}>
      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
        <span style={{ color: '#3f51b5' }}>A</span>
      </Typography>
    </Box>

    <Box sx={{ flex: 1, overflowY: 'auto', p: 1 }}>
      <List disablePadding>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/">
            <ListItemText primary="Home" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding><ListItemButton><ListItemText primary="Goal setting" /></ListItemButton></ListItem>
        <ListItem disablePadding><ListItemButton><ListItemText primary="Investment planning" /></ListItemButton></ListItem>
        <ListItem disablePadding><ListItemButton><ListItemText primary="Transactions" /></ListItemButton></ListItem>
        <ListItem disablePadding>
          <ListItemButton sx={{ backgroundColor: '#2f4ebc', '&:hover': { backgroundColor: '#324ea8' } }}>
            <ListItemText primary={<Typography sx={{ color: '#fff', fontWeight: 'bold' }}>Income & Expense</Typography>} />
          </ListItemButton>
        </ListItem>
      </List>

      <Divider sx={{ my: 2 }} />

      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 2, mb: 1 }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: '#777' }}>PROPERTIES</Typography>
        <IconButton size="small" sx={{ color: '#777' }}><AddIcon fontSize="small" /></IconButton>
      </Box>
      <List disablePadding>
        <ListItem disablePadding sx={{ pl: 2 }}>
          <ListItemButton sx={{ py: 0.5 }}><ListItemText primary="123 Main St" primaryTypographyProps={{ fontSize: 14 }} /></ListItemButton>
        </ListItem>
      </List>
    </Box>

    <Box sx={{ borderTop: '1px solid #e0e0e0', p: 2, display: 'flex', alignItems: 'center' }}>
      <Badge color="success" badgeContent="New" anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
             sx={{ '& .MuiBadge-badge': { transform: 'scale(0.8) translate(50%, -50%)' } }}>
        <Typography variant="body2" sx={{ fontWeight: 'medium' }}>My Referrals</Typography>
      </Badge>
    </Box>
  </Box>
);

/* ------------------------------------------------------ Main page component */
function IncomeRecordsPage() {
  const [incomeList, setIncomeList]   = useState([]);          // records from API
  const [selectedRows, setSelected]   = useState([]);          // array of _id
  const [showSync, setShowSync]       = useState(false);
  const [query, setQuery]             = useState('');
  const [searchVisible, setSearchVisible] = useState(false);

  const navigate  = useNavigate();
  const location  = useLocation();

  /* ------------------------- fetch list (on mount & on refresh flag) */
  const fetchList = async () => {
    try {
      const { data } = await api.get('/incomes');
      setIncomeList(data);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchList(); }, []);

  /* ------------------------- show banner if Edit page signalled update */
  useEffect(() => {
    if (location.state?.updated) {
      setShowSync(true);
      navigate('/records', { replace: true, state: {} });
    }
  }, [location, navigate]);

  /* ------------------------- handlers */
  const handleRefresh = () => { fetchList(); setShowSync(false); };

  const handleAddIncome  = () => navigate('/income');
  const handleDetails    = () => navigate('/graphs');
  const handleWhatIf     = () => navigate('/what-if');
  const handleSearchIcon = () => setSearchVisible(!searchVisible);
  const handleSearch     = (e) => setQuery(e.target.value);

  /* Delete */
  const handleDelete = async (id) => {
    try {
      await api.delete(`/incomes/${id}`);
      setIncomeList(prev => prev.filter(r => r._id !== id));
      setSelected(prev => prev.filter(sel => sel !== id));
    } catch (err) { console.error(err); }
  };

  /* Edit */
  const handleEdit = (id) => navigate(`/edit-income/${id}`);

  /* Select logic */
  const handleSelectAll = (e) =>
    setSelected(e.target.checked ? incomeList.map(r => r._id) : []);

  const toggleSelect = (id) =>
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  /* Filter list by search query */
  const filteredList = incomeList.filter((rec) => {
    const q = query.toLowerCase();
    return (
      rec.dateReceived?.toLowerCase().includes(q) ||
      rec.type?.toLowerCase().includes(q) ||
      rec.category?.toLowerCase().includes(q) ||
      rec.payer?.toLowerCase().includes(q)
    );
  });

  /* PDF export */
  const handleReport = () => {
    const doc = new jsPDF('p', 'pt', 'a4');
    doc.setFontSize(20).text('Pocket pulse.', 50, 40);
    doc.setFontSize(14).text('Income & Expense Records', 50, 60);
    const rows = incomeList.map(r => [
      r.dateReceived ? r.dateReceived.substring(0,10) : '',
      r.type, r.category, r.payer,
      r.amount ? `$${Number(r.amount).toLocaleString()}` : ''
    ]);
    doc.autoTable({ startY: 80, head: [['Date','Type','Category','Vendor/Payer','Amount']], body: rows,
                    theme: 'grid', headStyles: { fillColor: [220,220,220] } });
    doc.text('Pocket pulse.', 50, doc.internal.pageSize.getHeight() - 40);
    doc.output('dataurlnewwindow');
  };

  /* Profile click */
  const handleProfileClick = () => navigate('/signin');

  /* ------------------------------------------------------- JSX */
  return (
    <Box display="flex" width="100%">
      <Sidebar />

      <Container sx={{ flexGrow: 1, py: 3 }}>
        {/* Banner */}
        <Box display="flex" justifyContent="space-between" alignItems="center"
             sx={{ mb: 2, backgroundColor: '#1e407c', color:'#fff', p:2, borderRadius:1 }}>
          <Typography variant="h6" sx={{ fontWeight:'bold' }}>Income & Expense</Typography>
          <Box display="flex" alignItems="center" gap={2}>
            <Box sx={{ backgroundColor:'#ffeb99', color:'#000', px:2, py:0.5,
                       borderRadius:4, fontWeight:'bold' }}>$50 credit balance</Box>
            <IconButton sx={{ color:'#fff' }}><NotificationsNoneIcon /></IconButton>
            <IconButton onClick={handleProfileClick}><Avatar src="/images/profile.jpg" alt="Profile" /></IconButton>
          </Box>
        </Box>

        {/* Top bar */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h4">Income & Expense</Typography>
          <Box display="flex" alignItems="center" gap={1}>
            <Button variant="contained" sx={{ backgroundColor:'#283593' }} onClick={handleDetails}>Details</Button>
            <Button variant="contained" sx={{ backgroundColor:'#283593' }} onClick={handleWhatIf}>What If</Button>
            <IconButton onClick={handleSearchIcon}><SearchIcon /></IconButton>
            <IconButton onClick={handleReport}><SummarizeIcon /></IconButton>
            <Button variant="contained" sx={{ backgroundColor:'#283593' }} startIcon={<AddIcon />} onClick={handleAddIncome}>
              Add Record
            </Button>
          </Box>
        </Box>

        {/* Search bar */}
        {searchVisible &&
          <Box sx={{ mb:2 }}>
            <TextField fullWidth placeholder="Search by Date, Type, Category, Vendor/Payer"
                       value={query} onChange={handleSearch} />
          </Box>}

        {/* Sync banner */}
        {showSync &&
          <Paper sx={{ p:2, mb:2, backgroundColor:'#e8f5e9' }}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography>Your transactions have successfully been synced. Please refresh.</Typography>
              <IconButton color="primary" onClick={handleRefresh}><RefreshIcon /></IconButton>
            </Box>
          </Paper>}

        {/* Table */}
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedRows.length === incomeList.length && incomeList.length > 0}
                    indeterminate={selectedRows.length > 0 && selectedRows.length < incomeList.length}
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
              {filteredList.map((rec) => {
                const isSelected = selectedRows.includes(rec._id);
                return (
                  <TableRow key={rec._id}>
                    <TableCell padding="checkbox">
                      <Checkbox checked={isSelected} onChange={() => toggleSelect(rec._id)} />
                    </TableCell>
                    <TableCell>{rec.dateReceived?.substring(0,10) || 'N/A'}</TableCell>
                    <TableCell>
                      <Typography sx={{ color: rec.type === 'Expense' ? 'red' : 'green' }}>
                        {rec.type}
                      </Typography>
                    </TableCell>
                    <TableCell>{rec.category}</TableCell>
                    <TableCell>{rec.payer}</TableCell>
                    <TableCell>{rec.amount ? `$ ${Number(rec.amount).toLocaleString()}` : '--'}</TableCell>
                    <TableCell align="center">
                      {isSelected && (
                        <>
                          <IconButton sx={{ mr:1 }} onClick={() => handleEdit(rec._id)}><EditIcon /></IconButton>
                          <IconButton onClick={() => handleDelete(rec._id)}><DeleteIcon color="error" /></IconButton>
                        </>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
              {filteredList.length === 0 &&
                <TableRow><TableCell colSpan={7} align="center">No income records found.</TableCell></TableRow>}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </Box>
  );
}

export default IncomeRecordsPage;
