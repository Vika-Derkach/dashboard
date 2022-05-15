import { Card, CardContent, Container, Typography } from "@mui/material";
import React, { useMemo } from "react";
import { useParams } from "react-router-dom";
import { PostsTable, Spinner } from "../../components";
import { userAPI } from "../../services/UserService";

const UserPage = () => {
  let { id } = useParams();
  const {
    data: users,
    isLoading,
    isFetching,
    isError,
  } = userAPI.useFetchAllUsersQuery();

  const user = useMemo(
    () => users?.find((elem) => elem.id === +id),
    [users, id]
  );
  console.log(users, "users");
  console.log(user, "user");

  return (
    <div>
      {id}
      {isLoading && <Spinner />}
      {!isLoading && !isError && user && (
        <Container maxWidth="md">
          <Card variant="outlined">
            {" "}
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                Our great user
              </Typography>
              <Typography variant="h5" component="div">
                Name: {user.username}
              </Typography>

              <Typography variant="body2">Email: {user.email}</Typography>
              <Typography variant="body2">Phone: {user.phone}</Typography>
              <Typography variant="body2">Website: {user.website}</Typography>
              <Typography sx={{ mb: 1, mt: 1 }} color="text.secondary">
                address
              </Typography>
              <Typography variant="body2">
                Street: {user.address.street}
              </Typography>
              <Typography variant="body2">
                Suite: {user.address.suite}
              </Typography>
              <Typography variant="body2">City: {user.address.city}</Typography>
            </CardContent>
          </Card>

          <PostsTable user={user} />
        </Container>
      )}
    </div>
  );
};

export { UserPage };
