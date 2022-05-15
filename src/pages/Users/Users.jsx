import { Container } from "@mui/material";
import React from "react";
import { Spinner, TableDataGrid } from "../../components";
import { userAPI } from "../../services/UserService";

const Users = () => {
  // const { users, isLoadeing, error } = useSelector(
  //   (state) => state.UsersReducer
  // );
  // const dispatch = useDispatch();
  // console.log(increment(5));

  // useEffect(() => {
  //   dispatch(fetchUsers());
  // }, []);
  const {
    data: users,
    isLoading,
    isFetching,
    isError,
  } = userAPI.useFetchAllUsersQuery();

  const UsersTable = () => {
    if (isLoading) {
      return <Spinner />;
    } else if (isError) {
      return <div>Something went wrong</div>;
    }
    return <TableDataGrid users={users} />;
  };

  return (
    <Container maxWidth="xl" sx={{ height: 371 }}>
      <UsersTable />
    </Container>
  );
};
export { Users };
