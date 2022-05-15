import { Button, Card, Container, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { fetchCities, fetchVacancies } from "../../actions/ActionCreators";
import { Spinner, VacancyCard } from "../../components";

const Vacancies = () => {
  const history = useHistory();
  const { isLoadeing, error, vacancies } = useSelector(
    (state) => state.VacanciesReducer
  );
  const { cities } = useSelector((state) => state.CitiesReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCities());
    dispatch(fetchVacancies());
  }, [dispatch]);

  return (
    <div>
      <Container maxWidth="md">
        <Typography variant="h3" component="div" gutterBottom={true}>
          Вакансии и отклики
        </Typography>

        <Button
          color="success"
          variant="contained"
          onClick={() => history.push("/vacancy")}
        >
          Создать вакансию
        </Button>

        {isLoadeing ? (
          <Spinner />
        ) : (
          <>
            {!!vacancies.length ? (
              vacancies.map((vac) => {
                const cityName = cities?.find((o) => o.id === vac.city);

                return (
                  <VacancyCard vac={vac} key={vac.id} cityName={cityName} />
                );
              })
            ) : (
              <Card>Нет вакансий.</Card>
            )}
          </>
        )}
        {error && <div>Something went wrong</div>}
      </Container>
    </div>
  );
};

export { Vacancies };
