import { makeStyles } from "@material-ui/core"

export const useStyles = makeStyles((theme) => ({
  leftIcon: {
    marginRight: theme.spacing(1),
  },
  button: {
    margin: theme.spacing(1),
  },
  iconSmall: {
    fontSize: 20,
  },
  wrapper: {
    position: "relative",
    width: "100%",
    height: 600,
    margin: "20px 5px 5px 5px",
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
