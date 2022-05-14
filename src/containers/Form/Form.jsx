import { yupResolver } from "@hookform/resolvers/yup";
import ClearIcon from "@mui/icons-material/Clear";
import {
  Button,
  Card,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as yup from "yup";
import { createNewVacancy, updateVacancy } from "../../actions/ActionCreators";
import { AutocompleteCity } from "../../components";
import "./Form.css";

const priceTypes = {
  range: "range",
  one: "one",
  empty: "empty",
};

const FormSchema = yup.object().shape({
  name: yup
    .string()
    .required("Enter a name")
    .min(2, "Must be bigger than one letter")
    .max(100, "Must be shorted"),

  city: yup
    .string()
    .required("Enter a city")
    .min(2, "Too short city name")
    .max(30, "Must be shorted"),
  address: yup
    .string()
    .required("Enter an address")
    .min(2, "Too short address")
    .max(100, "Must be shorted"),
  comment: yup.string().max(200, "Must be shorter"),
  priceFromTo: yup.object().shape({
    from: yup.string(),
    to: yup.string(),
  }),
  priceOne: yup.string(),

  priceEmtpy: yup.string().nullable(true),

  // yup.lazy((value) => {
  //   switch (typeof value) {
  //     case "object":
  //       return yup.object().shape({
  //         from: yup.string(),
  //         to: yup.string(),
  //       }); // schema for object
  //     case "number":
  //       return yup.number(); // schema for number
  //     case "string":
  //       return yup.string(); // schema for string

  //     default:
  //       return yup.mixed().notRequired(); // here you can decide what is the default
  //   }
  // }),
});

const checkTypes = (vacancy) => {
  if (!vacancy) {
    return priceTypes.one;
  } else if (vacancy.price === "withoutSalary") {
    return priceTypes.empty;
  }
  return vacancy.price.from && vacancy.price.to
    ? priceTypes.range
    : priceTypes.one;
};

const Form = ({ defaultValues, toUpdate, updateCityName }) => {
  const [redirectToVacanciesPage, setRedirectToVacanciesPage] = useState(false);
  const [currentPriceType, setCurrentPriceType] = useState(
    checkTypes(defaultValues)
  );
  const [priceFrom, setPriceFrom] = useState("");
  const [priceTo, setPriceTo] = useState("");
  const [priceOne, setPriceOne] = useState("");
  const dispatch = useDispatch();
  const [isSuccess, setIsSuccess] = useState(false);

  const { isLoadeing, error, vacancies } = useSelector(
    (state) => state.VacanciesReducer
  );
  // const [errorRes, setErrorRes] = useState(error);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
    clearErrors,
  } = useForm({ defaultValues, resolver: yupResolver(FormSchema) });

  const onSubmit = async (formData) => {
    console.log(formData);

    if (!error) {
      if (toUpdate) {
        dispatch(updateVacancy(formData));
      }
      dispatch(createNewVacancy(formData));
      setIsSuccess(true);
      reset();
    }
    // else {
    //   setError("something went wrong");
    // }
  };

  const setPrice = () => {
    if (currentPriceType === priceTypes.one) {
      if (defaultValues) {
        setPriceOne(defaultValues.price);
      }
      setPriceFrom("");
      setPriceTo("");
    } else if (currentPriceType === priceTypes.range) {
      if (defaultValues) {
        setPriceFrom(defaultValues.price.from);
        setPriceTo(defaultValues.price.to);
      }
      setPriceOne("");
    } else {
      setPriceOne("");
      setPriceFrom("");
      setPriceTo("");
    }
  };

  const handleChange = (type) => (e) => {
    setCurrentPriceType(type);
    setPrice();
  };

  useEffect(() => {
    setPrice();
  }, []);

  const isChacked = (type) => {
    return type === currentPriceType;
  };
  console.log(defaultValues, "defaultValues");
  console.log(error);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {redirectToVacanciesPage && <Redirect to="/vacancies" />}
      {isSuccess && !error && (
        <Card>
          <div>Вакансія створена</div>

          <button
            aria-label="Закрить оповещение"
            onClick={() => setIsSuccess(false)}
          >
            <ClearIcon />
          </button>
        </Card>
      )}
      {error && (
        <Card>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Что-то пошло не так, попробуйте обновить страницу, або подивіться на
            поля
          </Typography>
        </Card>
      )}
      <FormControl>
        <div className="label-wrapper">
          <label htmlFor="name">Название должности*</label>
          <TextField
            {...register("name")}
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
        <div>Условия работы</div>
        <div className="label-wrapper">
          <label>Город работы*:</label>
          {/* <TextField
            {...register("city")}
            id="outlined-basic"
            variant="outlined"
            color="info"
            placeholder="Город" 
          /> */}
          <AutocompleteCity
            {...register("city")}
            updateCityName={updateCityName}
          />
          {errors.city && (
            <span role="alert" className="errorMessage">
              {errors.city.message}
            </span>
          )}
        </div>
        <div className="label-wrapper">
          <label>Условия работы</label>
          <TextField
            {...register("address")}
            id="outlined-basic"
            variant="outlined"
            color="info"
            placeholder="Улица и дом"
          />
          {errors.address && (
            <span role="alert" className="errorMessage">
              {errors.address.message}
            </span>
          )}
        </div>
        <FormLabel id="demo-radio-buttons-group-label">Зарплата*</FormLabel>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="one_value"
          name="radio-buttons-group"
        >
          <FormControlLabel
            value="range"
            control={<Radio />}
            label="Диапазон"
            onChange={handleChange(priceTypes.range)}
            checked={isChacked(priceTypes.range)}
          />
          {currentPriceType === priceTypes.range && (
            <div>
              <TextField
                {...register("priceFromTo.from")}
                placeholder="From"
                type="number"
                variant="outlined"
                size="small"
                onChange={(e) => setPriceFrom(e.target.value)}
                value={priceFrom}
                InputProps={{
                  endAdornment: priceFrom && (
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setPriceFrom("")}
                    >
                      <ClearIcon />
                    </IconButton>
                  ),
                }}
              />
              -
              <TextField
                {...register("priceFromTo.to")}
                placeholder="To"
                type="number"
                variant="outlined"
                size="small"
                onChange={(e) => setPriceTo(e.target.value)}
                value={priceTo}
                InputProps={{
                  endAdornment: priceTo && (
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setPriceTo("")}
                    >
                      <ClearIcon />
                    </IconButton>
                  ),
                }}
              />
            </div>
          )}
          <FormControlLabel
            value="oneValue"
            control={<Radio />}
            label="Одно значение"
            onChange={handleChange(priceTypes.one)}
            checked={isChacked(priceTypes.one)}
          />
          {currentPriceType === priceTypes.one && (
            <>
              {" "}
              <TextField
                {...register("priceOne")}
                placeholder="Сумма"
                type="number"
                variant="outlined"
                size="small"
                onChange={(e) => setPriceOne(e.target.value)}
                value={priceOne}
              />{" "}
              грн в месяц
              {errors.priceOne && (
                <span role="alert" className="errorMessage">
                  {errors.priceOne.message}
                </span>
              )}
            </>
          )}
          <FormControlLabel
            {...register("priceEmtpy")}
            value="withoutSalary"
            control={<Radio />}
            label="Не указывать (не рекомендуется)"
            onChange={handleChange(priceTypes.empty)}
            checked={isChacked(priceTypes.empty)}
          />
          {errors.priceOne && (
            <span role="alert" className="errorMessage">
              {errors.priceOne.message}
            </span>
          )}
          {errors.priceFromTo && (
            <span role="alert" className="errorMessage">
              {errors.priceFromTo.message}
            </span>
          )}
          {errors.priceEmtpy && (
            <span role="alert" className="errorMessage">
              {errors.priceEmtpy.message}
            </span>
          )}
        </RadioGroup>
        <div className="label-wrapper">
          <label>Комментарий к зарплате</label>
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
          onClick={() => setRedirectToVacanciesPage(true)}
        >
          Отменить
        </Button>
      </FormControl>
    </form>
  );
};

export { Form };
