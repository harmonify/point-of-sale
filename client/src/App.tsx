import store, { persistor } from "@/app/store"
import SnackbarWrapper from "@/features/snackbar/SnackbarWrapper"
import { router } from "@/router"
import { theme } from "@/theme"
import LuxonUtils from "@date-io/luxon"
import {
  CircularProgress,
  StylesProvider,
  ThemeProvider,
} from "@material-ui/core"
import { MuiPickersUtilsProvider } from "@material-ui/pickers"
import { Suspense } from "react"
import { Provider } from "react-redux"
import { RouterProvider } from "react-router-dom"
import { PersistGate } from "redux-persist/integration/react"
import ConfirmationDialogProvider from "./features/dialog/ConfirmationDialogProvider"

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
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
      </PersistGate>
    </Provider>
  )
}

export default App
