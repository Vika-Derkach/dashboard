import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import { Link } from "react-router-dom";
const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "username", headerName: "Name", width: 130 },
  {
    field: "address",
    headerName: "Address",
    description: "This address is not sortable.",
    sortable: false,
    width: 160,
    renderCell: (params) =>
      `${params.row.address.street}, ${params.row.address.suite}`,
  },
  { field: "phone", headerName: "Phone", width: 200, type: "phone" },
  {
    field: "email",
    headerName: "Email",
    type: "email",
    width: 220,
  },
  {
    field: "company",
    headerName: "Company",
    description: "Company is not sortable.",
    sortable: false,
    width: 160,
    renderCell: (params) => `${params.row.company.name}`,
  },
  {
    field: "Route",
    renderCell: (cellValues) => {
      return <Link to={`/users/${cellValues.row.id}`}>Details</Link>;
    },
  },
];
const TableDataGrid = ({ users }) => {
  return (
    <DataGrid
      rows={users}
      columns={columns}
      pageSize={5}
      rowsPerPageOptions={[5]}
      disableColumnFilter={true}
      disableColumnMenu={true}
      // checkboxSelection
    />
  );
};

export { TableDataGrid };
