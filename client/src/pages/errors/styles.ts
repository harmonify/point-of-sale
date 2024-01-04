import { makeStyles } from "@mui/styles"

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(10),
    display: "flex",
    alignContent: "center",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh", // 100% of the viewport height
    width: "100vw", // 100% of the viewport width
    boxSizing: "border-box", // Include padding in the specified width and height
  },
  imageContainer: {
    marginTop: theme.spacing(6),
    display: "flex",
    justifyContent: "center",
    flexGrow: 1,
  },
  image: {
    maxWidth: "100%",
    minWidth: 560,
    maxHeight: 300,
    height: "auto",
  },
  buttonContainer: {
    marginTop: theme.spacing(6),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    marginRight: theme.spacing(.5),
    marginLeft: theme.spacing(.5),
  },
}))

export default useStyles
