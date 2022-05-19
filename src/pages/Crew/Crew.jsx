import { Container, TextField } from "@mui/material";
import React, { useState } from "react";
import { CrewCard, Spinner } from "../../components";
import { CrewForm } from "../../containers";
import { crewAPI } from "../../services/CrewServer";

const Crew = () => {
  const [limit, setLimit] = useState("");

  const { data: crew, error, isLoading } = crewAPI.useFetchAllCrewQuery(limit);

  console.log(crew, "crew");
  return (
    <Container maxWidth="md" sx={{ pt: 4, pb: 4 }}>
      <TextField
        type="number"
        value={limit}
        onChange={(e) => setLimit(e.target.value)}
        error={limit.includes("-") || limit.includes(".") ? true : false}
        helperText={
          limit.includes("-")
            ? "Can't be negative"
            : " " && limit.includes(".")
            ? "Can't be decimal"
            : " "
        }
        placeholder="to display..."
      />{" "}
      <CrewForm />
      {!isLoading && crew && (
        <>
          {crew.map((crewMember) => (
            <CrewCard crewMember={crewMember} key={crewMember.id} />
          ))}
        </>
      )}
      {isLoading && <Spinner />}
    </Container>
  );
};

export { Crew };
