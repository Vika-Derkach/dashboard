import { yupResolver } from "@hookform/resolvers/yup";
import ClearIcon from "@mui/icons-material/Clear";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import { fetchCreateVacancy } from "../../actions/ActionCreators";
import { AutocompleteCity } from "../../components";
import "./Form.css";

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
  price: yup.lazy((value) => {
    switch (typeof value) {
      case "object":
        return yup.object().shape({
          from: yup.string().nullable(),
          to: yup.string().nullable(),
        }); // schema for object
      case "number":
        return yup.number(); // schema for number
      case "string":
        return yup.string(); // schema for string

      default:
        return yup.mixed().nullable(); // here you can decide what is the default
    }
  }),
});

const Form = () => {
  const [isRange, setIsRange] = useState(false);
  const [isOneWage, setIsOneWage] = useState(true);
  const [isWithoutWage, setIsWithoutWage] = useState(false);
  const [priceFrom, setPriceFrom] = useState("");
  const [priceTo, setPriceTo] = useState("");
  const dispatch = useDispatch();
  const [openedItem, setOpenedItem] = useState("OneWage");

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
    clearErrors,
  } = useForm({
    resolver: yupResolver(FormSchema),
  });

  const onSubmit = async (formData) => {
    try {
      dispatch(fetchCreateVacancy(formData));
      console.log(formData);

      reset();
    } catch (e) {
      console.error(e);
    }
  };

  function handleIsRangeChange(e) {
    setIsRange(e.target.checked);
    setIsOneWage(false);
    setIsWithoutWage(false);
  }

  function handleIsOneWageChange(e) {
    setIsOneWage(e.target.checked);
    setIsRange(false);
    setIsWithoutWage(false);
  }

  function handleIsWithoutWageChange(e) {
    setIsWithoutWage(e.target.checked);
    setIsRange(false);
    setIsOneWage(false);
  }

  // useEffect(() => {
  //   if (inProgress === true) {
  //     alert(`inProgress is ${inProgress}`);
  //   }
  // });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
          <AutocompleteCity {...register("city")} />
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
            onChange={handleIsRangeChange}
            checked={isRange}
          />
          {isRange && (
            <div>
              <TextField
                {...register("price.from")}
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
                {...register("price.to")}
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
            onChange={handleIsOneWageChange}
            checked={isOneWage}
          />
          {isOneWage && (
            <>
              {" "}
              <TextField
                {...register("price")}
                placeholder="Сумма"
                type="number"
                variant="outlined"
                size="small"
                onChange={(e) => Number(e.target.value)}
              />{" "}
              грн в месяц
              {/* {errors.price && (
                <span role="alert" className="errorMessage">
                  {errors.price.message}
                </span>
              )} */}
            </>
          )}
          <FormControlLabel
            {...register("price")}
            value="withoutSalary"
            control={<Radio />}
            label="Не указывать (не рекомендуется)"
            onChange={handleIsWithoutWageChange}
            checked={isWithoutWage}
          />
          {errors.price && (
            <span role="alert" className="errorMessage">
              {errors.price.message}
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
        <Button color="success" variant="text" onClick={() => clearErrors()}>
          Отменить
        </Button>
      </FormControl>
    </form>
  );
};

export { Form };
