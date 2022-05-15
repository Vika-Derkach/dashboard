import { Container, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchCities, fetchVacancies } from "../../actions/ActionCreators";
import { Form } from "../../containers";

const VacancyUpdate = () => {
  let { id } = useParams();
  const { isLoadeing, error, vacancies } = useSelector(
    (state) => state.VacanciesReducer
  );
  console.log(vacancies);
  const vacancyToUbdate = useSelector((state) =>
    state.VacanciesReducer.vacancies.find((elem) => elem.id === id)
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCities());
    dispatch(fetchVacancies());
  }, [dispatch]);
  console.log(vacancies);

  return (
    <Container maxWidth="md">
      <Typography variant="h3" component="div" gutterBottom={true}>
        Редактировать вакансию
      </Typography>

      {isLoadeing && <div>Wait a little bit</div>}
      {!isLoadeing && !error && (
        <Form defaultValues={vacancyToUbdate} toUpdate={true} />
      )}
    </Container>
  );
};

export { VacancyUpdate };
