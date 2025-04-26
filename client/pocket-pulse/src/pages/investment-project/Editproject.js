import React, { useState } from 'react';
import { TextField, MenuItem, Select, InputLabel, FormControl, Button, Grid, Typography } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

const EditProject = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { project, index } = location.state;

  const [formData, setFormData] = useState(project);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Get the existing projects from localStorage
    const existingProjects = JSON.parse(localStorage.getItem('projects')) || [];

    // Update the project at the given index
    existingProjects[index] = formData;

    // Save the updated array back to localStorage
    localStorage.setItem('projects', JSON.stringify(existingProjects));

    // Navigate back to the ProjectDetails page
    navigate('/view-pro');
  };

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>Edit Project</Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Project Title"
              fullWidth
              variant="outlined"
              name="projectTitle"
              value={formData.projectTitle}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Project Description"
              fullWidth
              variant="outlined"
              name="projectDescription"
              value={formData.projectDescription}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Required Amount"
              fullWidth
              variant="outlined"
              type="number"
              name="requiredAmount"
              value={formData.requiredAmount}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Loan to Value without VAT"
              fullWidth
              variant="outlined"
              type="number"
              name="loanToValue"
              value={formData.loanToValue}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Project Duration (in months)</InputLabel>
              <Select
                label="Project Duration (in months)"
                name="projectDuration"
                value={formData.projectDuration}
                onChange={handleChange}
                required
              >
                <MenuItem value={6}>6 months</MenuItem>
                <MenuItem value={12}>12 months</MenuItem>
                <MenuItem value={18}>18 months</MenuItem>
                <MenuItem value={24}>24 months</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Interest Rate (%)"
              fullWidth
              variant="outlined"
              type="number"
              name="interestRate"
              value={formData.interestRate}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Interest Frequency</InputLabel>
              <Select
                label="Interest Frequency"
                name="interestFrequency"
                value={formData.interestFrequency}
                onChange={handleChange}
                required
              >
                <MenuItem value="Monthly">Monthly</MenuItem>
                <MenuItem value="Quarterly">Quarterly</MenuItem>
                <MenuItem value="Annually">Annually</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" type="submit">
              Save Changes
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default EditProject;
