import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import React, { forwardRef, useEffect, useMemo, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { fetchCities } from "../../actions/ActionCreators";

const AutocompleteCity = forwardRef(({ updateCityName, ...props }, ref) => {
  const { setValue } = useFormContext();

  const { isLoadeing, error, cities } = useSelector(
    (state) => state.CitiesReducer
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCities());
  }, [dispatch]);

  const defaultValue = useMemo(() => {
    return cities?.find((city) => city.id === updateCityName);
  }, [cities, updateCityName]);
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const loading = open && options.length === 0;

  useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    if (active) {
      setOptions([...cities]);
    }

    return () => {
      active = false;
    };
  }, [loading, cities]);

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <Autocomplete
      id="asynchronous-demo"
      sx={{ width: 300 }}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onChange={(e, value) => setValue("city", value?.id || null)}
      onClose={() => {
        setOpen(false);
      }}
      defaultValue={defaultValue || null}
      isOptionEqualToValue={(option, value) => option.name === value.name}
      getOptionLabel={(option) => option.name}
      // defaultValue={updateCityName ? updateCityName : null}
      options={options}
      loading={isLoadeing}
      renderInput={(params) => (
        <TextField
          autoComplete="off"
          ref={ref}
          {...params}
          placeholder="Город"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {isLoadeing ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
                {error && <div>Cities aren't loaded</div>}
              </>
            ),
          }}
        />
      )}
    />
  );
});

export { AutocompleteCity };
