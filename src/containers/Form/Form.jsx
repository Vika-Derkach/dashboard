import { yupResolver } from "@hookform/resolvers/yup";
import ClearIcon from "@mui/icons-material/Clear";
import {
  Button,
  Card,
  FormControl,
  FormLabel,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import React, { memo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { vacancyModifiy } from "../../actions/ActionCreators";
import { AutocompleteCity, PriceGroup } from "../../components";
import "./Form.css";
import { FormSchema } from "./FormSchema";

const Form = memo(({ defaultValues, toUpdate }) => {
  const dispatch = useDispatch();
  const [isSuccess, setIsSuccess] = useState(false);
  const history = useHistory();
  console.log({ isSuccess });
  const { isLoadeing, error, vacancies } = useSelector(
    (state) => state.VacanciesReducer
  );

  const methods = useForm({ defaultValues, resolver: yupResolver(FormSchema) });

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
    clearErrors,
  } = methods;

  const onSubmit = async (formData) => {
    console.log(formData);
    console.log("update");

    if (!error) {
      console.log({ toUpdate });
      if (toUpdate) {
        dispatch(vacancyModifiy(formData, true));
      } else {
        dispatch(vacancyModifiy(formData));
        reset();
      }

      setIsSuccess(true);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {error && (
          <Card
            sx={{
              backgroundColor: "#ff5f52",
              display: "flex",
              justifyContent: "space-around",
              color: "red",
              p: 1.5,
            }}
          >
            <Typography color="text.secondary">
              Что-то пошло не так, попробуйте обновить страницу, або подивіться
              на поля
            </Typography>
          </Card>
        )}
        <FormControl>
          <div className="label-wrapper">
            <FormLabel htmlFor="name">Название должности*</FormLabel>
            <TextField
              {...register("name")}
              autoComplete="off"
              id="outlined-basic"
              variant="outlined"
              color="info"
              placeholder="Название комментарий"
            />
            {errors.name && (
              <span role="alert" className="errorMessage">
                {errors.name.message}
              </span>
            )}
          </div>
          <Typography sx={{ mb: 1.5 }} variant="body1">
            Условия работы
          </Typography>
          <div className="label-wrapper">
            <FormLabel>Город работы*:</FormLabel>

            <AutocompleteCity
              {...register("city")}
              updateCityName={defaultValues?.city}
            />
            {errors.city && (
              <span role="alert" className="errorMessage">
                {errors.city.message}
              </span>
            )}
          </div>
          <div className="label-wrapper">
            <FormLabel>Адрес работы*:</FormLabel>
            <TextField
              {...register("address")}
              id="outlined-basic"
              variant="outlined"
              color="info"
              placeholder="Улица и дом"
              autoComplete="off"
            />
            {errors.address && (
              <span role="alert" className="errorMessage">
                {errors.address.message}
              </span>
            )}
          </div>
          <FormLabel id="demo-radio-buttons-group-label">Зарплата*</FormLabel>
          <PriceGroup defaultValues={defaultValues} />
          <div className="label-wrapper">
            <FormLabel>Комментарий к зарплате</FormLabel>
            <TextField
              {...register("comment")}
              id="outlined-basic"
              variant="outlined"
              color="info"
            />
            {errors.comment && (
              <span role="alert" className="errorMessage">
                {errors.comment.message}
              </span>
            )}
          </div>
          <Button type="submit">Сохранить</Button>
          или
          <Button
            color="success"
            variant="text"
            onClick={() => history.push("/vacancies")}
          >
            Отменить
          </Button>
          {isSuccess && !error && (
            <Card
              sx={{
                backgroundColor: "#aee571",
                display: "flex",
                justifyContent: "space-around",
                color: "green",
                p: 1.5,
              }}
            >
              {toUpdate ? (
                <Typography color="text.secondary">
                  Вакансія редагована
                </Typography>
              ) : (
                <Typography color="text.secondary">
                  Вакансія створена
                </Typography>
              )}
              <IconButton
                aria-label="delete"
                size="small"
                onClick={() => setIsSuccess(false)}
                color="success"
              >
                <ClearIcon fontSize="inherit" />
              </IconButton>
            </Card>
          )}
        </FormControl>
      </form>
    </FormProvider>
  );
});

export { Form };
