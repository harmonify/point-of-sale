import "@fontsource/roboto/100.css"
import "@fontsource/roboto/300.css"
import "@fontsource/roboto/400.css"
import "@fontsource/roboto/500.css"
import "@fontsource/roboto/700.css"
import "@fontsource/roboto/900.css"
import "@fontsource/roboto/100-italic.css"
import "@fontsource/roboto/300-italic.css"
import "@fontsource/roboto/400-italic.css"
import "@fontsource/roboto/500-italic.css"
import "@fontsource/roboto/700-italic.css"
import "@fontsource/roboto/900-italic.css"
import "@/styles/index.css"
import "@/services/lang/setup"

import App from "@/App"
import store, { persistor } from "@/app/store"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"

// import registerServiceWorker from "./registerServiceWorker"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
)

// registerServiceWorker()
