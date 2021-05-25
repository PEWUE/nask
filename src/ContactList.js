import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  TextField,
} from "@material-ui/core";

export default function ContactList() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    async function getAPI() {
      const result = await axios(`https://jsonplaceholder.typicode.com/users`);
      setContacts(
        result.data.sort((a, b) => {
          return a.name.localeCompare(b.name);
        })
      );
    }
    getAPI();
  }, []);

  const useStyles = makeStyles({
    container: {
      minWidth: 650,
      maxWidth: 800,
      margin: "auto",
      marginBottom: 100,
    },
    textForm: {
      maxWidth: 800,
      margin: "auto",
      display: "flex",
      marginTop: 50,
      marginBottom: 50,
    },
    textField: {
      width: "50%",
      margin: "auto",
    },
    headOfTable: {
      backgroundColor: "#ffb310",
    },
    bodyOfTable: {
      backgroundColor: "#f6f6f5",
    },
  });

  const classes = useStyles();

  const handleChange = (event) => {
    event.target.checked &&
      console.log(
        event.target.parentElement.parentElement.parentElement.parentElement
          .dataset.id
      );
  };

  const handleSearch = () => {
    const input = document.querySelector("#searchInput");
    const filter = input.value.toUpperCase();
    const bodyTable = document.querySelector("#bodyTable");
    const rows = bodyTable.querySelectorAll("tr");

    for (let row of rows) {
      const th = row.querySelector("th");
      if (th) {
        if (th.innerHTML.toUpperCase().indexOf(filter) > -1) {
          row.style.display = "";
        } else {
          row.style.display = "none";
        }
      }
    }
  };

  return (
    <>
      <form className={classes.textForm} noValidate autoComplete="off">
        <TextField
          onChange={handleSearch}
          className={classes.textField}
          id="searchInput"
          label="Search for names"
        />
      </form>
      <TableContainer component={Paper} className={classes.container}>
        <Table aria-label="simple table">
          <TableHead className={classes.headOfTable}>
            <TableRow>
              <TableCell style={{ width: "40%" }} align="center">
                Name
              </TableCell>
              <TableCell style={{ width: "50%" }} align="center">
                Phone
              </TableCell>
              <TableCell style={{ width: "10%" }} align="center">
                Checkbox
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody id="bodyTable" className={classes.bodyOfTable}>
            {contacts.map((contact) => (
              <TableRow key={contact.id} data-id={contact.id}>
                <TableCell component="th" scope="row" align="center">
                  {contact.name}
                </TableCell>
                <TableCell align="center">{contact.phone}</TableCell>
                <TableCell align="center">
                  <Checkbox onChange={handleChange} color="primary" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
