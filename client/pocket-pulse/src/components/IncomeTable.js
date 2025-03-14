import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const IncomeTable = ({ incomeList, onDeleteIncome }) => {
  return (
    <TableContainer component={Paper} sx={{ marginTop: 3 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Amount</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Payer</TableCell>
            <TableCell>Date Received</TableCell>
            <TableCell>Rental</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Receipt/Invoice</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {incomeList.map((income, index) => (
            <TableRow key={index}>
              <TableCell>{income.amount}</TableCell>
              <TableCell>{income.category}</TableCell>
              <TableCell>{income.payer}</TableCell>
              <TableCell>{income.dateReceived}</TableCell>
              <TableCell>{income.associatedRental}</TableCell>
              <TableCell>{income.description}</TableCell>
              <TableCell>
                {income.file ? income.file.name : 'No file'}
              </TableCell>
              <TableCell>
                <IconButton onClick={() => onDeleteIncome(index)}>
                  <DeleteIcon color="error" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}

          {incomeList.length === 0 && (
            <TableRow>
              <TableCell colSpan={8} align="center">
                No income records found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default IncomeTable;
