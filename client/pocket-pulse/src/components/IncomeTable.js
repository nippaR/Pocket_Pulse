// src/components/IncomeTable.js
import React from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const IncomeTable = ({ incomeList, onDeleteIncome }) => (
  <TableContainer component={Paper} sx={{ mt: 3 }}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Amount</TableCell>
          <TableCell>Category</TableCell>
          <TableCell>Payer</TableCell>
          <TableCell>Date&nbsp;Received</TableCell>
          <TableCell>Rental</TableCell>
          <TableCell>Description</TableCell>
          <TableCell>Receipt / Invoice</TableCell>
          <TableCell>Action</TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {incomeList.map((inc) => (
          <TableRow key={inc._id}>
            <TableCell>
              {inc.amount ? `$ ${Number(inc.amount).toLocaleString()}` : '--'}
            </TableCell>
            <TableCell>{inc.category}</TableCell>
            <TableCell>{inc.payer}</TableCell>
            <TableCell>
              {inc.dateReceived ? new Date(inc.dateReceived).toISOString().split('T')[0] : '--'}
            </TableCell>
            <TableCell>{inc.associatedRental}</TableCell>
            <TableCell>{inc.description}</TableCell>

            {/* File column: show link if back‑end sends receiptUrl, else filename */}
            <TableCell>
              {inc.receiptUrl
                ? <a href={inc.receiptUrl} target="_blank" rel="noopener noreferrer">View</a>
                : inc.fileName || '—'}
            </TableCell>

            <TableCell>
              <IconButton onClick={() => onDeleteIncome(inc._id)}>
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

export default IncomeTable;
