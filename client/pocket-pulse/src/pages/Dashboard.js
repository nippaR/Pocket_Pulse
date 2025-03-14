import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div style={{ padding: '2rem' }}>
      <h2>Dashboard</h2>
      <p>Welcome! This is the dashboard page.</p>

      {/* Link to the Income Management page */}
      <Link to="/income">Go to Income Management</Link>
    </div>
  );
};

export default Dashboard;
