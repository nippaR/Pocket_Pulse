import React from "react";
import { Card, CardContent, CardActions, Button, Typography } from "@mui/material";

const ProjectCard = ({ project }) => {
  return (
    <Card
      sx={{
        backgroundColor: "#FFDAB9", // Peach color
        borderRadius: 3,
        boxShadow: 3,
        textAlign: "center",
      }}
    >
      {/* Image Placeholder */}
      <div style={{ height: "120px", backgroundColor: "#fff", borderRadius: "8px 8px 0 0" }}></div>

      <CardContent>
        <Typography variant="h6" fontWeight="bold">
          {project.title}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {project.description}
        </Typography>
      </CardContent>

      <CardActions sx={{ justifyContent: "center" }}>
        <Button variant="contained" color="primary" size="small">
          Invest
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProjectCard;
