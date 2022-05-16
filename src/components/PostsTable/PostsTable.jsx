// A great library for fuzzy filtering/sorting items
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import {
  Button,
  IconButton,
  NativeSelect,
  TextField,
  Typography,
} from "@mui/material";
import { matchSorter } from "match-sorter";
import React, { useMemo } from "react";
import {
  useFilters,
  useGlobalFilter,
  usePagination,
  useTable,
} from "react-table";
import { ErrorIndicator } from "../../components";
import { postAPI } from "../../services/PostsService";
import { Spinner } from "../Spinner/Spinner";
import "./PostsTable.css";
// Define a default UI for filtering
function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter },
}) {
  const count = preFilteredRows.length;

  return (
    <TextField
      id="outlined-basic"
      variant="outlined"
      color="info"
      size="small"
      sx={{ backgroundColor: "white" }}
      value={filterValue || ""}
      onChange={(e) => {
        setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
      }}
      placeholder={`Search ${count} records...`}
    />
  );
}

// This is a custom filter UI that uses a
// slider to set the filter value between a column's
// min and max values
function SliderColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id },
}) {
  // Calculate the min and max
  // using the preFilteredRows

  const [min, max] = useMemo(() => {
    let min = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
    let max = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
    preFilteredRows.forEach((row) => {
      min = Math.min(row.values[id], min);
      max = Math.max(row.values[id], max);
    });
    return [min, max];
  }, [id, preFilteredRows]);

  return (
    <>
      <input
        type="range"
        min={min}
        max={max}
        value={filterValue || min}
        onChange={(e) => {
          setFilter(parseInt(e.target.value, 10));
        }}
      />
      <Button
        variant="contained"
        color="info"
        onClick={() => setFilter(undefined)}
      >
        Off
      </Button>
    </>
  );
}

function fuzzyTextFilterFn(rows, id, filterValue) {
  return matchSorter(rows, filterValue, { keys: [(row) => row.values[id]] });
}

// Let the table remove the filter if the string is empty
fuzzyTextFilterFn.autoRemove = (val) => !val;

// Our table component
function Table({ columns, data }) {
  const filterTypes = useMemo(
    () => ({
      // Add a new fuzzyTextFilterFn filter type.
      fuzzyText: fuzzyTextFilterFn,
      // Or, override the default text filter to use
      // "startWith"
      text: (rows, id, filterValue) => {
        return rows.filter((row) => {
          const rowValue = row.values[id];
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true;
        });
      },
    }),
    []
  );

  const defaultColumn = useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter,
    }),
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      defaultColumn, // Be sure to pass the defaultColumn option
      filterTypes,
      initialState: { pageIndex: 0, pageSize: 5 },
    },
    useFilters, // useFilters!
    useGlobalFilter, // useGlobalFilter!
    usePagination
  );

  return (
    <>
      <table {...getTableProps()} className="post-table">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>
                  {column.render("Header")}
                  <div>{column.canFilter ? column.render("Filter") : null}</div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <br />
      <div className="pagination">
        <IconButton
          color="info"
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
        >
          <ArrowBackIosNewIcon />
        </IconButton>{" "}
        <IconButton
          color="info"
          onClick={() => nextPage()}
          disabled={!canNextPage}
        >
          <ArrowForwardIosIcon />
        </IconButton>{" "}
        <Typography variant="body1" component="span">
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </Typography>
        <Typography variant="body1" component="span">
          | Go to page:{" "}
          <TextField
            id="outlined-number"
            type="number"
            size="small"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            style={{ width: "100px" }}
          />
        </Typography>{" "}
        <NativeSelect
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
          inputProps={{
            name: "age",
            id: "uncontrolled-native",
          }}
        >
          {[2, 5, 10, 20].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </NativeSelect>
      </div>
    </>
  );
}

// Define a custom filter filter function!
function filterGreaterThan(rows, id, filterValue) {
  return rows.filter((row) => {
    const rowValue = row.values[id];
    return rowValue >= filterValue;
  });
}

// This is an autoRemove method on the filter function that
// when given the new filter value and returns true, the filter
// will be automatically removed. Normally this is just an undefined
// check, but here, we want to remove the filter if it's not a number
filterGreaterThan.autoRemove = (val) => typeof val !== "number";

const PostsTable = ({ user }) => {
  const { data: posts, error, isLoading } = postAPI.useFetchAllPostsQuery();
  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
        Filter: SliderColumnFilter,
        filter: "equals",
      },
      {
        Header: "Title",
        accessor: "title",
        filter: "fuzzyText",
      },
      {
        Header: "Text",
        accessor: "body",
        filter: "fuzzyText",
      },
    ],
    []
  );
  const userPosts = useMemo(
    () => posts?.filter((elem) => elem.userId === user.id),
    [posts, user.id]
  );

  const data = useMemo(() => userPosts, [userPosts]);

  return (
    <>
      <Typography variant="h5" component="div" sx={{ m: 1 }}>
        Posts
      </Typography>
      {isLoading && <Spinner />}
      {!isLoading && !error && posts && <Table columns={columns} data={data} />}
      {error && <ErrorIndicator />}
    </>
  );
};

export { PostsTable };
