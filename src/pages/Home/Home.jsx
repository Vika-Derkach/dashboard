import { Container, Typography } from "@mui/material";
import React from "react";

const Home = () => {
  return (
    <Container maxWidth="md" sx={{ pt: 4, pb: 4, height: 500 }}>
      <Typography variant="h5" component="div" sx={{ m: 1.5 }}>
        Home
      </Typography>
    </Container>
  );
};

export { Home };
