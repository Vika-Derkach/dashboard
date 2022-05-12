import { Container } from "@mui/material";
import React from "react";
import { Form } from "../../containers";

const Vacancy = () => {
  return (
    <Container maxWidth="md">
      <h1>Создать вакансию</h1>
      <Form />
    </Container>
  );
};

export { Vacancy };
