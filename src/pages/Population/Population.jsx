import { Container, Typography } from "@mui/material";
import React, { useMemo } from "react";
import { ErrorIndicator, PopulationChart, Spinner } from "../../components";
import { populationAPI } from "../../services/PopulationServer";

const Population = () => {
  const { data, error, isLoading } = populationAPI.useFetchAllPopulationQuery();
  // useMemo(() => {
  //   data && data.data
  // }, [data]);

  const populationData = useMemo(() => data && data.data, [data]);

  console.log(populationData, "population");
  return (
    <Container maxWidth="md" sx={{ pt: 4, pb: 4, height: 500 }}>
      <Typography variant="h5" component="div">
        Population
      </Typography>
      {!isLoading && populationData && (
        <PopulationChart populationData={populationData} />
      )}
      {isLoading && <Spinner />}
      {error && <ErrorIndicator />}
    </Container>
  );
};

export { Population };
