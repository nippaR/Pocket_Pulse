import React, { useState } from 'react';
import { TextField, MenuItem, Select, InputLabel, FormControl, Button, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const CreateProject = () => {
  const [formData, setFormData] = useState({
    projectTitle: '',
    projectDescription: '',
    requiredAmount: '',
    loanToValue: '',
    projectDuration: '',
    interestRate: '',
    interestFrequency: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Get existing projects from localStorage or create an empty array if none exist
    const existingProjects = JSON.parse(localStorage.getItem('projects')) || [];

    // Add new project to the array
    existingProjects.push(formData);

    // Limit the number of projects stored to 5
    if (existingProjects.length > 5) {
      existingProjects.shift(); // Remove the oldest project
    }

    // Save the updated projects array to localStorage
    localStorage.setItem('projects', JSON.stringify(existingProjects));

    // Navigate to the ProjectDetails page and pass the newly created project data
    navigate('/view-pro', { state: { project: formData } });
  };

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>Create a New Project</Typography>
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
              Create Project
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default CreateProject;
