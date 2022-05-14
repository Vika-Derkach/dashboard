import { Button, ButtonGroup, Card, Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import {
  deleteVacancy,
  fetchCities,
  fetchVacancies,
} from "../../actions/ActionCreators";

const Vacancies = () => {
  const [redirectToAddVacPage, setRedirectToAddVacPage] = useState(false);
  const [redirectToUpdatePage, setRedirectToUpdatePage] = useState(false);
  const { isLoadeing, error, vacancies } = useSelector(
    (state) => state.VacanciesReducer
  );
  const { cities } = useSelector((state) => state.CitiesReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCities());
    dispatch(fetchVacancies());
  }, [dispatch]);

  console.log(vacancies, "vacancies");

  return (
    <div>
      {redirectToAddVacPage && <Redirect to="/vacancy" />}
      <Container maxWidth="md">
        <h1>Вакансии и отклики</h1>
        <Button
          color="success"
          variant="contained"
          onClick={() => setRedirectToAddVacPage(true)}
        >
          Создать вакансию
        </Button>

        {isLoadeing ? (
          <div>loading</div>
        ) : (
          <>
            {!!vacancies.length ? (
              vacancies.map((vac) => {
                const cityName = cities?.find((o) => o.id === vac.city);

                return (
                  <Card variant="outlined" key={vac.id}>
                    {redirectToUpdatePage && (
                      <Redirect to={`/vacancy/${vac.id}`} />
                    )}
                    <div> {vac.name}</div>
                    {vac.price && vac.price !== "withoutSalary" && (
                      <div>
                        {typeof vac.price === "object" ? (
                          <>
                            {vac.price.from} - {vac.price.to}
                          </>
                        ) : (
                          <> {vac.price}</>
                        )}{" "}
                        грн {vac.comment && <>· {vac.comment}</>}
                      </div>
                    )}

                    <div>
                      {cityName && <>{cityName.name}</>}

                      {vac.address && <span>, {vac.address}</span>}
                    </div>

                    <ButtonGroup
                      variant="outlined"
                      aria-label="outlined button group"
                    >
                      <Button onClick={() => setRedirectToUpdatePage(true)}>
                        Редактировать
                      </Button>
                      <Button onClick={() => dispatch(deleteVacancy(vac))}>
                        Удалить
                      </Button>
                    </ButtonGroup>
                  </Card>
                );
              })
            ) : (
              <Card>Нет вакансий.</Card>
            )}
            {error && <div>Something went wrong</div>}
          </>
        )}
      </Container>
    </div>
  );
};

export { Vacancies };
