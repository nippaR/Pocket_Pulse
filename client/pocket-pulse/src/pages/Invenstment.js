import React, { useState, useEffect } from "react";
import { Container, Grid, Typography, TextField } from "@mui/material";
import ProjectCard from "../components/Investment_project_card";

const InvestmentProjects = () => {
  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    // Fetch investment projects (replace with API call)
    setProjects([
      {
        id: 1,
        title: "Startup A",
        description: "An innovative tech startup for AI solutions.",
      },
      {
        id: 2,
        title: "Eco Farming",
        description: "Sustainable organic farming project.",
      },
      {
        id: 3,
        title: "Solar Energy",
        description: "Invest in renewable solar energy infrastructure.",
      },
    ]);
  }, []);

  const filteredProjects = projects.filter((project) =>
    project.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" fontWeight="bold" sx={{ mt: 3, mb: 2 }}>
        Investment Projects
      </Typography>
      
      {/* Search Bar */}
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search projects..."
        onChange={(e) => setSearch(e.target.value)}
        sx={{ mb: 3, backgroundColor: "white", borderRadius: 1 }}
      />

      {/* Projects Grid */}
      <Grid container spacing={3}>
        {filteredProjects.map((project) => (
          <Grid item xs={12} sm={6} md={4} key={project.id}>
            <ProjectCard project={project} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default InvestmentProjects;
