import React, { useEffect, useState } from "react"

import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableContainer from "@material-ui/core/TableContainer"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import Paper from "@material-ui/core/Paper"
import axiosFetch from "../../utils/axiosFetch"
import {
  Button,
  Container,
  Divider,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core"
import { useSelector } from "react-redux"
import Icon from "@material-ui/core/Icon"
import SaveIcon from "@material-ui/icons/Save"
import DeleteIcon from "@material-ui/icons/Delete"
import Grid from "@material-ui/core/Grid"
import UpdateIcon from "@material-ui/icons/Update"
import CreateIcon from "@material-ui/icons/Create"

const useStyles = makeStyles(theme => ({
  table: {
    minWidth: 650,
  },
  button: {
    margin: theme.spacing(1),
  },
  tablehead: {
    fontSize: 20,
    fontWeight: 800,
    fontFamily: "serif",
    textAlign: "center",
  },
  tableContent: {
    fontSize: 15,
    fontFmaily: "arial",
    textAlign: "center",
  },
}))

export default function TutData({ tutorial, setReload = f => f, reload }) {
  const [disabled, setDisabled] = useState(true)
  const [data, setData] = useState(tutorial)

  const handleChange = event => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    })
  }

  const updateData = async event => {
    try {
      const res = await axiosFetch.put(`api/tutorial/${data._id}`, data)
      if (res.data) {
        window.alert("updated")
        console.log(res.data)
        setDisabled(true);
        setReload(!reload);
      }
    } catch (error) {
      console.log(error.response.data.error)
    }
  }

  const deleteData = async event => {
    try {
      const res = await axiosFetch.delete(`api/tutorial/${data._id}`)
      if (res.data) {
        window.alert("deleted")
        console.log(res.data)
        setReload(!reload)
        
      }
    } catch (error) {
      console.log(error.response.data.error)
    }
  }

  const state = useSelector(({ auth }) => auth)
  const classes = useStyles()

  return (
    <TableRow>
      {/* <td>{event._id}</td> */}
      <TableCell className={classes.tableContent}>
        {" "}
        <TextField
          id="outlined-basic"
          disabled={disabled}
          value={data.title}
          name="title"
          onChange={handleChange}
          variant="outlined"
          fullWidth
        />{" "}
      </TableCell>
      <TableCell>
        <TextField
          id="outlined-basic"
          disabled={disabled}
          value={data.link}
          name="link"
          onChange={handleChange}
          variant="outlined"
          fullWidth
        />
      </TableCell>
      <TableCell className={classes.tableContent}>
        {" "}
        <TextField
          id="outlined-basic"
          disabled={disabled}
          value={data.category}
          name="category"
          onChange={handleChange}
          variant="outlined"
          fullWidth
        />{" "}
      </TableCell>

      {state.isLoggedin && (
        <TableCell>
          {disabled && (
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              startIcon={<UpdateIcon />}
              onClick={() => setDisabled(false)}
            >
              update
            </Button>
          )}
          {!disabled && (
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              startIcon={<UpdateIcon />}
              onClick={updateData}
            >
              update
            </Button>
          )}
        </TableCell>
      )}
      {state.isLoggedin && (
        <TableCell>
          <Button
            onClick={deleteData}
            value={data._id}
            variant="contained"
            color="secondary"
            className={classes.button}
            startIcon={<DeleteIcon />}
          >
            {" "}
            Delete{" "}
          </Button>{" "}
        </TableCell>
      )}
    </TableRow>
  )
}
