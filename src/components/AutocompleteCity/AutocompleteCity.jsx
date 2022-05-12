import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import React, { forwardRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCities } from "../../actions/ActionCreators";

const AutocompleteCity = forwardRef(({ ...props }, ref) => {
  const { isLoadeing, error, cities } = useSelector(
    (state) => state.CitiesReducer
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCities());
  }, [dispatch]);

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
      onClose={() => {
        setOpen(false);
      }}
      isOptionEqualToValue={(option, value) => option.name === value.name}
      getOptionLabel={(option) => option.name}
      options={options}
      loading={isLoadeing}
      renderInput={(params) => (
        <TextField
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
          {...props}
        />
      )}
    />
  );
});

export { AutocompleteCity };
