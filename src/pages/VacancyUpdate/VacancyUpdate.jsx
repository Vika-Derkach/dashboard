import { Container } from "@mui/material";
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
  const {
    cities,
    isLoadeing: cityLoading,
    error: cityError,
  } = useSelector((state) => state.CitiesReducer);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCities());
    dispatch(fetchVacancies());
  }, [dispatch]);

  console.log(vacancies);

  const vacancyToUbdate = vacancies?.find((o) => o.id === id);

  const cityName = cities?.find((o) => o.id === vacancyToUbdate?.city);
  console.log(cityName, "cityName");
  console.log(vacancyToUbdate, "vacancyToUbdate");

  return (
    <Container maxWidth="md">
      <h1>Редактировать вакансию {id}</h1>
      {isLoadeing && <div>Wait a little bit</div>}
      {!isLoadeing && !error && (
        <Form
          defaultValues={vacancyToUbdate}
          toUpdate={true}
          updateCityName={cityName}
        />
      )}
    </Container>
  );
};

export { VacancyUpdate };
