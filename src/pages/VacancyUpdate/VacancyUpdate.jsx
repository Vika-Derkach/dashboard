import { Container } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchVacancies } from "../../actions/ActionCreators";
import { Form } from "../../containers";

const VacancyUpdate = () => {
  let { id } = useParams();
  const { isLoadeing, error, vacancies } = useSelector(
    (state) => state.VacanciesReducer
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchVacancies());
  }, [dispatch]);

  console.log(vacancies);

  const vacancyToUbdate = vacancies?.find((o) => o.id === id);

  return (
    <Container maxWidth="md">
      <h1>Редактировать вакансию {id}</h1>
      {isLoadeing && <div>Wait a little bit</div>}
      {!isLoadeing && !error && (
        <Form defaultValues={vacancyToUbdate} toUpdate={true} />
      )}
    </Container>
  );
};

export { VacancyUpdate };
