import SnackbarWrapper from "@/features/snackbar/SnackbarWrapper"
import { router } from "@/router"
import { getThemeToken } from "@/theme"
import LuxonUtils from "@date-io/luxon"
import {
  CircularProgress,
  createTheme,
  StylesProvider,
  ThemeProvider,
} from "@material-ui/core"
import { MuiPickersUtilsProvider } from "@material-ui/pickers"
import { Suspense, useMemo } from "react"
import { RouterProvider } from "react-router-dom"

import CssBaseline from "@material-ui/core/CssBaseline"
import { useAppDispatch, useAppSelector } from "./app/hooks"
import { selectDarkMode, setDarkMode } from "./features/app"
import ConfirmationDialogProvider from "./features/dialog/ConfirmationDialogProvider"

function App() {
  const dispatch = useAppDispatch()
  const darkMode = useAppSelector(selectDarkMode)

  useMemo(() => {
    dispatch(setDarkMode(darkMode))
  }, [darkMode])

  const theme = useMemo(
    () => createTheme(getThemeToken({ darkMode })),
    [darkMode],
  )

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <StylesProvider>
        <MuiPickersUtilsProvider utils={LuxonUtils}>
          <Suspense
            fallback={
              <div
                style={{
                  width: "100%",
                  textAlign: "center",
                  marginTop: 64,
                }}
              >
                <CircularProgress />
              </div>
            }
          >
            <ConfirmationDialogProvider>
              <RouterProvider router={router} />
            </ConfirmationDialogProvider>
            <SnackbarWrapper />
          </Suspense>
        </MuiPickersUtilsProvider>
      </StylesProvider>
    </ThemeProvider>
  )
}

export default App
