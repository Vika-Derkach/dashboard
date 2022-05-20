import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Button, Container, TextField } from "@mui/material";
import React, { useState } from "react";
import { CrewCard, ErrorIndicator, Spinner } from "../../components";
import { CrewForm } from "../../containers";
import { crewAPI } from "../../services/CrewServer";

const Crew = () => {
  const [limit, setLimit] = useState("5");
  const [page, setPage] = useState(1);
  // const [noMoreResults, setNoMoreResults] = useState(false);
  const [users, setUsers] = useState([]);

  const {
    data: crew,
    error,
    isLoading,
    isFetching,
  } = crewAPI.useFetchAllCrewQuery({ page, limit });

  // useEffect(() => {
  //   if (crew?.length) {
  //     setUsers([...users, ...crew]);
  //   } else if (page > 1) {
  //     setNoMoreResults(true);
  //   }
  // }, [crew]);
  // console.log(users, "users");

  console.log(crew, "crew");
  return (
    <Container maxWidth="md" sx={{ pt: 4, pb: 4 }}>
      <TextField
        type="number"
        value={limit}
        onChange={(e) => setLimit(e.target.value)}
        error={limit.includes("-") || limit.includes(".")}
        helperText={
          limit.includes("-")
            ? "Can't be negative"
            : " " && limit.includes(".")
            ? "Can't be decimal"
            : " "
        }
        placeholder="to display..."
      />{" "}
      <CrewForm buttonText="Add crew member" />
      {!isLoading && crew && (
        <>
          {crew.map((crewMember) => (
            <CrewCard crewMember={crewMember} key={crewMember.id} />
          ))}
        </>
      )}
      {crew?.length <= 0 && <div>No more crew</div>}
      {page > 1 && (
        <Button
          sx={{ mr: 1 }}
          variant="contained"
          startIcon={<ArrowBackIosNewIcon />}
          onClick={() => setPage(page - 1)}
        >
          Prev page
        </Button>
      )}
      {crew?.length > 0 && (
        <Button
          variant="contained"
          endIcon={<ArrowForwardIosIcon />}
          onClick={() => setPage(page + 1)}
        >
          Next page
        </Button>
      )}
      {isLoading && <Spinner />}
      {error && <ErrorIndicator />}
    </Container>
  );
};

export { Crew };
