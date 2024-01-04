import { Box, Button } from "@mui/material"
import { makeStyles } from "@mui/styles"
import { Save } from "@mui/icons-material"
import { Form as FormikForm } from "formik"
import { t } from "i18next"
import React, { useEffect } from "react"

// eslint-disable-next-line
const useStyles = makeStyles((theme) => ({
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

  disableSubmitButton?: boolean
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
      className={props.className}
      style={props.style}
    >
      {props.children}

      <Box>
        {props.disableSubmitButton ? null : (
          <Button
            type="submit"
            startIcon={<Save />}
            className={classes.buttonSubmit}
            color="primary"
            variant="contained"
            disabled={props.submitDisabled}
          >
            {props.submitText || t("Save", { ns: "action" })}
          </Button>
        )}

        {props.onCancel ? (
          <Button
            className={classes.buttonCancel}
            onClick={props.onCancel}
            disabled={props.cancelDisabled}
          >
            {props.cancelText || t("Cancel", { ns: "action" })}
          </Button>
        ) : null}
      </Box>
    </FormikForm>
  )
}

export default Form
