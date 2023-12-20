import { Box, Button } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { Save } from "@material-ui/icons"
import classNames from "classnames"
import { Form as FormikForm } from "formik"
import React, { useEffect } from "react"

// eslint-disable-next-line
const useStyles = makeStyles((theme) => ({
  form: {
    padding: ".75em .2em",
    "& > *": {
      marginBottom: "1em",
    },
  },
  buttonSubmit: {
    marginTop: "1.5em",
    marginRight: ".5em",
    color: theme.palette.primary.contrastText,
  },
  buttonCancel: {
    marginTop: "1.5em",
    marginRight: ".5em",
    padding: "6px 16px",
    color: theme.palette.error.main,
  },
}))

const Form: React.FC<{
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties

  // onSubmit: React.FormEventHandler
  submitText?: string
  submitDisabled?: boolean

  /** The cancel button will only render when this function is provided */
  onCancel?: React.MouseEventHandler
  cancelText?: string
  cancelDisabled?: boolean
}> = (props) => {
  const classes = useStyles()

  return (
    <FormikForm
      // On submit will take on the parent `Formik` component
      // onSubmit={props.onSubmit}
      className={
        props.className
          ? classNames(classes.form, props.className)
          : classes.form
      }
      style={props.style}
    >
      {props.children}

      <Box>
        <Button
          type="submit"
          startIcon={<Save />}
          className={classes.buttonSubmit}
          color="primary"
          variant="contained"
          disabled={props.submitDisabled}
        >
          {props.submitText || "Submit"}
        </Button>

        {props.onCancel && (
          <Button
            className={classes.buttonCancel}
            onClick={props.onCancel}
            disabled={props.cancelDisabled}
          >
            {props.cancelText || "Cancel"}
          </Button>
        )}
      </Box>
    </FormikForm>
  )
}

export default Form
