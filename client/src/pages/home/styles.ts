import { makeStyles } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
  root: {
    // zIndex: 1,
    // overflow: "auto",
    display: "flex",
    height: "calc(100vh - 1px)", // TODO needs to figure why. For now its a hack :)
    // borderBottom: "1px solid #e0e0e0",
  },
  logo: {
    height: "64px",
    background: "#3f51b5",
  },
  logoContainer: {
    padding: '1em .5em',
    display: "flex",
    color: "white",
    "&:only-child > span": {
      padding: "4px 0px 0px 10px",
      fontWeight: "lighter",
    },
  },
}))

export default useStyles
