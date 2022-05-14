import { Container, Typography } from "@mui/material";
import React from "react";
import { Form } from "../../containers";

const Vacancy = () => {
  return (
    <Container maxWidth="md">
      <Typography variant="h3" component="div" gutterBottom={true}>
        Создать вакансию
      </Typography>

      <Form />
    </Container>
  );
};

export { Vacancy };
