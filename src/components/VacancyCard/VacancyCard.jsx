import {
  Button,
  ButtonGroup,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { deleteVacancy } from "../../actions/ActionCreators";

const VacancyCard = ({ vac, cityName }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h5" component="div">
          {vac.name}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {vac.price && vac.price !== "withoutSalary" && (
            <>
              {typeof vac.price === "object" ? (
                <>
                  {vac.price.from} - {vac.price.to}
                </>
              ) : (
                <> {vac.price}</>
              )}{" "}
              грн {vac.comment && <>· {vac.comment}</>}
            </>
          )}
        </Typography>
        <Typography variant="body2">
          {cityName && <>{cityName.name}</>}

          {vac.address && <span>, {vac.address}</span>}
        </Typography>
      </CardContent>
      <CardActions>
        <ButtonGroup variant="outlined" aria-label="outlined button group">
          <Button onClick={() => history.push(`/vacancy/${vac.id}`)}>
            Редактировать
          </Button>
          <Button onClick={() => dispatch(deleteVacancy(vac))}>Удалить</Button>
        </ButtonGroup>
      </CardActions>
    </Card>
  );
};

export { VacancyCard };
