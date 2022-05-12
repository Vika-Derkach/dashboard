import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const FormSchema = yup.object().shape({
  name: yup
    .string()
    .min(2, "Must be bigger than one letter")
    .max(20, "Must be shorted")
    .required("Enter a name"),
  city: yup.string().min(2, "Too short city name").max(200, "Must be shorted"),
  address: yup.string().min(2, "Too short address").max(100, "Must be shorted"),
  comment: yup.string().max(200, "Must be shorted"),
});

const Form = () => {
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
      console.log(formData);

      reset();
    } catch (e) {
      console.error(e);
    }
  };

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
          <TextField
            {...register("city")}
            id="outlined-basic"
            variant="outlined"
            color="info"
            placeholder="Город"
          />
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
          />
          <FormControlLabel
            value="one_value"
            control={<Radio />}
            label="Одно значение"
          />
          <FormControlLabel
            value="without_salary"
            control={<Radio />}
            label="Не указывать (не рекомендуется)"
          />
        </RadioGroup>
        <TextField
          {...register("comment")}
          id="outlined-basic"
          variant="outlined"
          color="info"
        />
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
