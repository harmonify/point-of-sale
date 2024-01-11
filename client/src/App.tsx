import SnackbarWrapper from "@/features/snackbar/SnackbarWrapper"
import { router } from "@/router"
import { getThemeToken } from "@/theme"
import {
  CircularProgress,
  createTheme,
  StyledEngineProvider,
  Theme,
  ThemeProvider,
} from "@mui/material"
import CssBaseline from "@mui/material/CssBaseline"
import { LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon"
import { Suspense, useMemo, useRef } from "react"
import { RouterProvider } from "react-router-dom"

import { useAppDispatch, useAppSelector } from "./app/hooks"
import { APP } from "./constants"
import { selectDarkMode, setDarkMode } from "./features/app"
import ConfirmationDialogProvider from "./features/dialog/ConfirmationDialogProvider"

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
        <LocalizationProvider
          dateAdapter={AdapterLuxon}
          adapterLocale={APP.defaultLang}
        >
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
