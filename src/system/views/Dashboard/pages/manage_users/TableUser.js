import React from "react";
import { filter } from "lodash";
import {
  Box,
  Card,
  Table,
  Stack,
  Avatar,
  TableRow,
  TableBody,
  TableCell,
  Typography,
  TableContainer,
  LinearProgress,
  TablePagination,
} from "@mui/material";

import MoreMenu from "./MoreMenu";
import Label from "../../components/Label";
import Scrollbar from "../../components/Scrollbar";
import SearchNotFound from "../../components/SearchNotFound";
import { TableHeadOveride, TableToolbar } from "../../components/table";

export default function TableUser({ data }) {
  const [page, setPage] = React.useState(0);
  const [order, setOrder] = React.useState("asc");
  const [selected, setSelected] = React.useState([]);
  const [orderBy, setOrderBy] = React.useState("name");
  const [userData, setUserData] = React.useState([]);
  const [filterName, setFilterName] = React.useState("");
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [swapUserData, setSwapUserData] = React.useState({});
  const [filteredUsers, setFilteredUsers] = React.useState([]);
  const [isDataMounted, setIsDataMounted] = React.useState(false);
  const [isUserNotFound, setIsUserNotFound] = React.useState(false);

  React.useEffect(() => {
    setUserData(data.users);
    if (userData !== undefined) {
      if (userData.length !== 0) {
        setFilteredUsers(
          applySortFilter(data.users, getComparator(order, orderBy), filterName)
        );
        setIsUserNotFound(filteredUsers.length === 0);
        if (filteredUsers !== undefined) {
          setIsUserNotFound(filteredUsers.length === 0);
          setIsDataMounted(true);
        }
      }
    }

    if (filterName === "") {
      setIsUserNotFound(false);
    }
  }, [userData, filterName, order, orderBy]);

  const TABLE_HEAD = [
    { id: "name", label: "Akun", alignRight: false },
    { id: "role", label: "Role", alignRight: false },
    { id: "kelas", label: "Murid Aktif", alignRight: false },
    { id: "email", label: "Email", alignRight: false },
    { id: "phone", label: "No Tlp", alignRight: false },
  ];

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = userData.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - userData.length) : 0;

  return (
    <>
      {isDataMounted ? (
        <Box>
          <Card>
            <TableToolbar
              numSelected={selected.length}
              filterName={filterName}
              onFilterName={handleFilterByName}
            />
            <Scrollbar>
              <TableContainer sx={{ minWidth: 800 }}>
                <Table>
                  <TableHeadOveride
                    order={order}
                    orderBy={orderBy}
                    headLabel={TABLE_HEAD}
                    rowCount={userData ? userData.length : 0}
                    numSelected={selected.length}
                    onRequestSort={handleRequestSort}
                    onSelectAllClick={handleSelectAllClick}
                  />
                  <TableBody>
                    {filteredUsers
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row) => {
                        const {
                          _id,
                          _verified,
                          address,
                          addressGeoLocation,
                          birthdate,
                          city,
                          classID,
                          email,
                          imageURL,
                          name,
                          phone,
                          role,
                          sex,
                        } = row;
                        const isItemSelected = selected.indexOf(name) !== -1;
                        return (
                          <TableRow
                            hover
                            key={_id}
                            tabIndex={-1}
                            role="checkbox"
                            selected={isItemSelected}
                            aria-checked={isItemSelected}
                            sx={{ pl: 0 }}
                          >
                            <TableCell padding="checkbox">
                              <Box/>
                            </TableCell>
                            <TableCell
                              component="th"
                              scope="row"
                              padding="none"
                            >
                              <Stack
                                direction="row"
                                alignItems="center"
                                spacing={2}
                              >
                                <Avatar alt={name} src={imageURL} />
                                <Typography variant="subtitle2" noWrap>
                                  {name}
                                </Typography>
                              </Stack>
                            </TableCell>
                            <TableCell align="left">{role}</TableCell>
                            <TableCell align="left">
                              {activeClass(classID)}
                            </TableCell>
                            <TableCell align="left">{email}</TableCell>
                            <TableCell align="left">{phone}</TableCell>
                            <TableCell
                              align="right"
                              onClick={() => {
                                setSwapUserData({
                                  _id: _id,
                                  _verified: _verified,
                                  address: address,
                                  addressGeoLocation: addressGeoLocation,
                                  birthdate: birthdate,
                                  city: city,
                                  classID: classID,
                                  email: email,
                                  imageURL: imageURL,
                                  name: name,
                                  phone: phone,
                                  role: role,
                                  sex: sex,
                                });
                              }}
                            >
                              <MoreMenu swapData={swapUserData} />
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    {emptyRows > 0 && (
                      <TableRow style={{ height: 53 * emptyRows }}>
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>
                  {isUserNotFound && (
                    <TableBody>
                      <TableRow>
                        <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                          <SearchNotFound searchQuery={filterName} />
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  )}
                </Table>
              </TableContainer>
            </Scrollbar>

            <TablePagination
              rowsPerPageOptions={[10, 25, 50]}
              component="div"
              count={userData ? userData.length : 0}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Card>
        </Box>
      ) : (
        <LinearProgress />
      )}
    </>
  );
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(
      array,
      (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

function activeClass(text) {
  if (text !== undefined) {
    let activeClass = text.student.split("@")[1];
    switch (activeClass) {
      case "mk":
        return (
          <Label variant="ghost" color="secondary">
            Murid Kristus
          </Label>
        );
        break;
      case "pk":
        return (
          <Label variant="ghost" color="warning">
            Pekerja Kristus
          </Label>
        );
        break;
      case "hk":
        return (
          <Label variant="ghost" color="primary">
            Hamba Kristus
          </Label>
        );
        break;
      default:
        return (
          <Label variant="ghost" >
            Tidak Aktif
          </Label>
        );
    }
  } else {
    return <Label variant="ghost">Tidak Aktif</Label>;
  }
}
