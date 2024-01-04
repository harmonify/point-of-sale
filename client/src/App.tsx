import SnackbarWrapper from "@/features/snackbar/SnackbarWrapper"
import { router } from "@/router"
import { getThemeToken } from "@/theme"
import LuxonUtils from "@date-io/luxon"
import {
  CircularProgress,
  createTheme,
  ThemeProvider,
  Theme,
  StyledEngineProvider,
} from "@mui/material"
import { Suspense, useMemo } from "react"
import { RouterProvider } from "react-router-dom"
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon"

import CssBaseline from "@mui/material/CssBaseline"
import { useAppDispatch, useAppSelector } from "./app/hooks"
import { selectDarkMode, setDarkMode } from "./features/app"
import ConfirmationDialogProvider from "./features/dialog/ConfirmationDialogProvider"
import { LocalizationProvider } from "@mui/x-date-pickers"

declare module "@mui/styles" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}

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
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <LocalizationProvider dateAdapter={AdapterLuxon}>
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
        </LocalizationProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  )
}

export default App
