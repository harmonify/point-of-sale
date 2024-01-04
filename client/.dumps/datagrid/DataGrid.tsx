import {
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableRow,
} from "@mui/material"
import Button from "@mui/material/Button"
import IconButton from "@mui/material/IconButton"
import Paper from "@mui/material/Paper"
import { makeStyles, withStyles } from "@mui/styles"
import DeleteIcon from "@mui/icons-material/Delete"
import EditIcon from "@mui/icons-material/Edit"
import axios from "axios"
import classNames from "classnames"
import React, { Component, MouseEventHandler, useEffect, useState } from "react"

import Message from "../../src/components/controls/Message"
import Overlay from "../../src/components/controls/Overlay"
import CustomTableCell from "./CustomTableCell"
import CustomTablePagination from "./CustomTablePagination"

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    overflowX: "auto",
    flexShrink: 0,
  },
  table: {
    minWidth: 700,
  },
  head: {
    background: "#e0e0e0",
  },
  wrapper: {
    position: "relative",
  },
  overlay: {
    top: 0,
    position: "absolute",
    background: "#ffffffad",
    height: "100%",
    width: "100%",
    zIndex: 100,
  },
  gridEdit: {
    border: "none",
    minWidth: "29px",
    overflow: "hidden",
    outline: 0,
    lineHeight: 1,
    "&:focus": {
      outline: 0,
      backgroundColor: "#f3f9fd",
      borderRadius: "1px",
      boxShadow: "0 0 0 2px #f3f9fd, 0 0 0 4px #cdd4d9",
    },
  },
  gridNumberEdit: {
    textAlign: "right",
    width: "20px",
  },
}))

const TABLE_ACTION = {
  PREV: "prev",
  NEXT: "next",
  FIRST: "first",
  LAST: "last",
}

const getPaginationInfo = (linkHeaderString: string) => {
  if (!linkHeaderString) {
    return {}
  }

  const links = linkHeaderString.split(",")

  if (links.length === 0) {
    return {}
  }

  const paginationInfo = {
    next: links[0].split(";")[0],
    prev: links[1].split(";")[0],
    first: links[2].split(";")[0],
    last: links[3].split(";")[0],
    count: links[4].split(";")[0],
    current: links[5].split(";")[0],
  }
  return paginationInfo
}

const DataGrid: React.FC<{
  datasourcePromise: Function
  headers: string[]
  actions: ("sel" | "edit" | "del")[]
  onSelect: (data: T) => void
  onEdit: (data: T) => void
  onDelete: (data: T) => void
}> = (props) => {
  const classes = useStyles()

  const [state, setState] = useState({
    data: {
      list: [],
      paginationInfo: {},
    },
    isLoading: false,
  })
  const { isLoading } = state

  const init = async () => {
    setState({ isLoading: true })

    try {
      const res = await props.datasourcePromise()

      const paginationInfo = {}
      // const paginationInfo = getPaginationInfo(res.headers.link); // TODO:
      const list = res.data
      const data = {
        list,
        paginationInfo,
      }

      setState({ isLoading: false, data })
    } catch (error) {
      // TODO show error
      setState({ isLoading: false, data: { list: [] } })
    }
  }

  useEffect(() => {
    init()
  }, [])

  const onFirst = () => {
    fetch("first")
  }
  const onLast = () => {
    fetch("last")
  }
  const onNext = async () => {
    fetch("next")
  }
  const onPrev = () => {
    fetch("prev")
  }

  const fetch = async (action) => {
    try {
      setState({ isLoading: true })

      const url = state.data.paginationInfo[action]
      const res = await axios.get(url)
      const paginationInfo = getPaginationInfo(res.headers.link)
      const list = res.data
      const data = {
        list,
        paginationInfo,
      }

      setState({ isLoading: false, data })
    } catch (error) {
      props.onError(error.message, true)
      setState({ isLoading: false, data: {} })
    }
  }

  const renderHeader = () => (
    <TableHead className={classes.head}>
      <TableRow>
        {props.headers.map((h) => (
          <CustomTableCell key={h}>{h}</CustomTableCell>
        ))}
        {props.actions.length > 0 && <CustomTableCell>Actions</CustomTableCell>}
      </TableRow>
    </TableHead>
  )

  const renderCellValue = (key, val) => {
    if (props.transformers && props.transformers[key]) {
      return props.transformers[key](val)
    }
    return val
  }

  const renderRow = (row) => {
    const keys = Object.keys(row)

    return keys.map((k, idx) => {
      if (props.actions.includes("sel") && idx === 0) {
        return (
          // eslint-disable-next-line react/no-array-index-key
          <TableCell key={`${keys[idx]}${idx}`}>
            <Button color="primary" onClick={() => props.onSelect(row)}>
              {renderCellValue(k, row[k])}
            </Button>
          </TableCell>
        )
      }

      if (keys[idx] === "price") {
        return (
          // eslint-disable-next-line react/no-array-index-key
          <TableCell key={`${keys[idx]}${idx}`}>
            <input
              type="text"
              value={renderCellValue(k, row[k])}
              className={classNames(classes.gridEdit, classes.gridNumberEdit)}
            />
          </TableCell>
        )
      }

      return (
        // eslint-disable-next-line react/no-array-index-key
        <TableCell key={`${keys[idx]}${idx}`}>
          {renderCellValue(k, row[k])}
        </TableCell>
      )
    })
  }

  const renderActions = (row) => {
    if (props.actions.length === 0) {
      return null
    }

    return (
      <TableCell>
        {props.actions.includes("edit") && (
          <IconButton>
            <EditIcon onClick={() => props.onEdit(row)} />
          </IconButton>
        )}
        {props.actions.includes("del") && (
          <IconButton>
            <DeleteIcon onClick={() => props.onDelete(row)} />
          </IconButton>
        )}
      </TableCell>
    )
  }

  const renderBody = () => (
    <TableBody>
      {state.data.list.map((row, idx) => {
        const keys = Object.keys(row)
        return (
          // eslint-disable-next-line react/no-array-index-key
          <TableRow key={`${keys[0]}${idx}`}>
            {renderRow(row)}
            {renderActions(row)}
          </TableRow>
        )
      })}
    </TableBody>
  )

  const renderNoRecordsMessage = () => {
    const { isLoading } = props
    const { data } = state

    return (
      <Message
        style={{ width: "100%", marginLeft: 0 }}
        title="Info"
        message="No records found"
        show={data.list.length === 0 && isLoading === false}
      />
    )
  }

  const renderFooter = () => {
    const { rowsPerPage, headers } = props
    const { data } = state

    const paginationActions = {}
    paginationActions.onFirst = onFirst
    paginationActions.onNext = onNext
    paginationActions.onPrev = onPrev
    paginationActions.onLast = onLast

    if (data.list.length === 0 || !data.paginationInfo.count) {
      return null
    }

    return (
      <TableFooter>
        <TableRow>
          <CustomTablePagination
            colSpan={headers.length + 1}
            count={parseInt(data.paginationInfo.count, 10)}
            rowsPerPage={parseInt(rowsPerPage, 10)}
            page={parseInt(data.paginationInfo.current, 10)}
            paginationActions={paginationActions}
          />
        </TableRow>
      </TableFooter>
    )
  }

  return (
    <div className={classes.wrapper}>
      {isLoading === true && (
        <LinearProgress size={24} style={{ height: 1.5 }} />
      )}
      {isLoading === true && <Overlay />}

      <Paper className={classes.root}>
        <Table className={classes.table}>
          {renderHeader()}
          {renderBody()}
          {renderFooter()}
        </Table>
      </Paper>
      {renderNoRecordsMessage()}
    </div>
  )
}

export default DataGrid
