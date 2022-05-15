import ClearIcon from "@mui/icons-material/Clear";
import {
  FormControlLabel,
  IconButton,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

const priceTypes = {
  range: "range",
  one: "one",
  empty: "empty",
};

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

const PriceGroup = ({ defaultValues }) => {
  const {
    register,
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext();
  const [priceFrom, setPriceFrom] = useState("");
  const [priceTo, setPriceTo] = useState("");
  const [currentPriceType, setCurrentPriceType] = useState(
    checkTypes(defaultValues)
  );

  console.log(defaultValues, "defaultValues in group");

  const setPrice = () => {
    if (currentPriceType === priceTypes.one) {
      if (defaultValues) {
        setValue("priceOne", defaultValues.price);
      }
      setValue("priceFromTo.from", "");
      setValue("priceFromTo.to", "");
    } else if (currentPriceType === priceTypes.range) {
      if (defaultValues) {
        setValue("priceFromTo.from", defaultValues.price.from);
        setValue("priceFromTo.to", defaultValues.price.to);
      }
      setValue("priceOne", "");
    } else {
      setValue("priceOne", "");
      setValue("priceFromTo.from", "");
      setValue("priceFromTo.to", "");
    }
  };

  const handleChange = (type) => () => {
    setCurrentPriceType(type);
    setPrice();
  };

  useEffect(() => {
    setPrice();
  }, []);

  const isChacked = (type) => {
    return type === currentPriceType;
  };
  return (
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
            InputProps={{
              endAdornment: priceFrom && (
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setValue("priceFromTo.from", "")}
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
            InputProps={{
              endAdornment: priceTo && (
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setValue("priceFromTo.to", "")}
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
  );
};

export { PriceGroup };
