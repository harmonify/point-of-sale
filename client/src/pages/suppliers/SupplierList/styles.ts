import { makeStyles } from "@material-ui/core"

export const useStyles = makeStyles((theme) => ({
  leftIcon: {
    marginRight: theme.spacing(1),
  },
  createButton: {
    marginBottom: theme.spacing(2),
  },
  iconSmall: {
    fontSize: 20,
  },
  wrapper: {
    position: "relative",
    width: "100%",
    height: 600,
  },
  datagrid: {
    display: "flex",
    flexDirection: "column",
    "& .MuiFormGroup-options": {
      alignItems: "center",
      paddingBottom: theme.spacing(1),
      "& > div": {
        minWidth: 100,
        margin: theme.spacing(2, 2, 2, 0),
      },
    },
  },
}))
