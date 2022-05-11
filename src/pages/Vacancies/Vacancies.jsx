import { Button, Card, Container } from "@mui/material";
import React from "react";

const Vacancies = () => {
  return (
    <div>
      <Container maxWidth="md">
        {" "}
        <h1>Вакансии и отклики</h1>
        <Button color="success" variant="contained">
          Создать вакансию
        </Button>
        <Card variant="outlined">fg</Card>
      </Container>
    </div>
  );
};

export { Vacancies };
