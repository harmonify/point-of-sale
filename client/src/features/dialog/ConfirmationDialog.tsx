import {
  Box,
  Button,
  CircularProgress,
  colors,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Fade,
  FadeProps,
  Slide,
  SlideProps,
  Typography,
} from "@material-ui/core"
import MuiDialog from "@material-ui/core/Dialog"
import { makeStyles, useTheme } from "@material-ui/core/styles"
import React, {
  MouseEventHandler,
  ReactElement,
  ReactNode,
  useRef,
} from "react"
import { IConfirmationDialogState } from "./ConfirmationDialogProvider"
import { t } from "i18next"

const useStyles = makeStyles((theme) => ({
  dialogPaper: {
    borderRadius: theme.spacing(3),
    padding: "8px 0",
  },
  dialogContent: {
    minHeight: 72,
  },
  dialogActions: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "8px 24px",
  },
  buttonContainer: {
    flexGrow: 1,
  },
  button: {
    minWidth: 160,
  },
  content: {
    fontWeight: 300,
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(3),
  },
}))

const Transition = React.forwardRef(
  (props: FadeProps, ref: React.Ref<unknown>) => {
    return <Fade ref={ref} {...props} />
  },
)

const ConfirmationDialog: React.FC<IConfirmationDialogState> = (props) => {
  const theme = useTheme()
  const classes = useStyles()
  // const use

  return (
    <MuiDialog
      open={props.open}
      onClose={(e) => (props.onCancel ? props.onCancel() : null)}
      classes={{ paper: classes.dialogPaper }}
      maxWidth="xs"
      TransitionComponent={Transition}
      fullWidth
    >
      {props.title ? (
        <DialogTitle disableTypography color="textPrimary">
          <Typography variant="h4" color="textPrimary" gutterBottom>
            {props.title}
          </Typography>
          <Divider />
        </DialogTitle>
      ) : null}

      <DialogContent className={classes.dialogContent}>
        <>
          {props.render ? (
            props.render
          ) : (
            <Typography
              variant="h5"
              color="textPrimary"
              className={classes.content}
              gutterBottom
            >
              {props.content}
            </Typography>
          )}
          <Divider />
        </>
      </DialogContent>

      <DialogActions className={classes.dialogActions}>
        <Box className={classes.buttonContainer}>
          <Button
            id="confirmation-button"
            className={classes.button}
            onClick={(e) => (props.onConfirm ? props.onConfirm(e) : e)}
            disabled={props.isLoading}
            fullWidth={props.fullWidthBtn}
            style={{
              color:
                props.variant === "destructive"
                  ? theme.palette.error.main
                  : props.variant === "constructive"
                  ? colors.green[500]
                  : theme.palette.primary.main,
            }}
          >
            {props.isLoading ? (
              <CircularProgress size={18} color="inherit" />
            ) : (
              props.confirmText || t("OK", { ns: "action" })
            )}
          </Button>
        </Box>

        {props.disableCancelButton ? null : (
          <Box className={classes.buttonContainer}>
            <Button
              variant="text"
              onClick={(e) => (props.onCancel ? props.onCancel() : null)}
              className={classes.button}
              disabled={props.isLoading}
            >
              {props.cancelText || t("Cancel", { ns: "action" })}
            </Button>
          </Box>
        )}
      </DialogActions>
    </MuiDialog>
  )
}

export default ConfirmationDialog
