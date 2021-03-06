import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import React from "react";
import { CrewForm } from "../../containers";
import { crewAPI } from "../../services/CrewServer";

const CrewCard = ({ crewMember }) => {
  const [deleteCrewMember, {}] = crewAPI.useDeleteCrewMemberMutation();
  const handleRemove = (event) => {
    // event.stopPropagation();
    deleteCrewMember(crewMember);
  };

  return (
    <Card sx={{ minWidth: 275 }} variant="outlined">
      <CardContent>
        {crewMember.credit_id && (
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {crewMember.credit_id}
          </Typography>
        )}
        <Typography variant="h5" component="div">
          {crewMember.name}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          from {crewMember.department} department
        </Typography>
        <Typography variant="body2">
          {crewMember.job}
          {crewMember.popularity && <>, popularity: {crewMember.popularity}</>}
        </Typography>
        <Typography sx={{ mt: 1.5 }} color="text.secondary">
          Gender {crewMember.gender}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleRemove}>
          Delete
        </Button>
        <CrewForm defaultValues={crewMember} buttonText="Edit crew member" />
      </CardActions>
    </Card>
  );
};

export { CrewCard };
