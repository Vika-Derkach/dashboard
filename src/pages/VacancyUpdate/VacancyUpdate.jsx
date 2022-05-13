import { Container } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import { Form } from "../../containers";

const VacancyUpdate = () => {
  let { id } = useParams();
  return (
    <Container maxWidth="md">
      <h1>Редактировать вакансию {id}</h1>
      <Form />
    </Container>
  );
};

export { VacancyUpdate };
