import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Grid, Button, CardActions, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ProjectDetails = () => {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch projects from localStorage
    const storedProjects = JSON.parse(localStorage.getItem('projects')) || [];
    setProjects(storedProjects);
  }, []);

  const handleDelete = (index) => {
    // Remove the project from the array
    const updatedProjects = [...projects];
    updatedProjects.splice(index, 1);

    // Update localStorage
    localStorage.setItem('projects', JSON.stringify(updatedProjects));

    // Update the state
    setProjects(updatedProjects);
  };

  const handleEdit = (index) => {
    const projectToEdit = projects[index];

    // Navigate to the edit page and pass the project details to the form (optional)
    navigate('/edit-project', { state: { project: projectToEdit, index } });
  };

  return (
    <div style={{ padding: '20px' }}>

         <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button variant='outlined' onClick={ () =>navigate('/create-pro')}>
                      Add New Projects
                  </Button>
              </Box>
      <Typography variant="h4" gutterBottom>Projects</Typography>
      <Grid container spacing={3}>
        {projects.map((project, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <CardContent>
                <Typography variant="h5" gutterBottom>{project.projectTitle}</Typography>
                <Typography variant="body1" paragraph>{project.projectDescription}</Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="body2"><strong>Required Amount:</strong> {project.requiredAmount}</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body2"><strong>Loan to Value (without VAT):</strong> {project.loanToValue}</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body2"><strong>Project Duration:</strong> {project.projectDuration} months</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body2"><strong>Interest Rate:</strong> {project.interestRate}%</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body2"><strong>Interest Frequency:</strong> {project.interestFrequency}</Typography>
                  </Grid>
                </Grid>
              </CardContent>
              <CardActions>
                <Button variant="contained" color="primary" onClick={() => navigate('/investment-details')}>Invest in this Project</Button>
                <Button variant="outlined" color="secondary" onClick={() => handleEdit(index)}>Edit</Button>
                <Button variant="outlined" color="error" onClick={() => handleDelete(index)}>Delete</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt:5 }}>
        <Button variant='outlined' onClick={() => navigate('/investment-projects')}>
          Back
        </Button>
      </Box>
    </div>
  );
};

export default ProjectDetails;
