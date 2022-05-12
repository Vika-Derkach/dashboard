import { Button, ButtonGroup, Card, Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { fetchVacancies } from "../../actions/ActionCreators";

const Vacancies = () => {
  const [redirectToAddVacPage, setRedirectToAddVacPage] = useState(false);
  const { isLoadeing, error, vacancies } = useSelector(
    (state) => state.VacanciesReducer
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchVacancies());
  }, [dispatch]);

  console.log(vacancies);

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
            {vacancies?.map((vac) => {
              return (
                <Card variant="outlined" key={vac.id}>
                  <div> {vac.name}</div>
                  <div> {vac.city}</div>
                  {typeof vac.price === "object" ? (
                    <>
                      {vac.price.from} - {vac.price.to}
                    </>
                  ) : (
                    <div> {vac.price}</div>
                  )}
                  <ButtonGroup
                    variant="outlined"
                    aria-label="outlined button group"
                  >
                    <Button>Редактировать</Button>
                    <Button>Удалить</Button>
                  </ButtonGroup>
                </Card>
              );
            })}
            {error && <div>Something went wrong</div>}
          </>
        )}
      </Container>
    </div>
  );
};

export { Vacancies };
