import { Button, ButtonGroup, Card, Container } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  deleteVacancy,
  fetchCities,
  fetchVacancies,
} from "../../actions/ActionCreators";

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

  console.log(vacancies, "vacancies");

  return (
    <div>
      <Container maxWidth="md">
        <h1>Вакансии и отклики</h1>
        <Button
          color="success"
          variant="contained"
          onClick={() => history.push("/vacancy")}
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
                      <Button
                        onClick={() => history.push(`/vacancy/${vac.id}`)}
                      >
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
