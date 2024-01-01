import store, { persistor } from "@/app/store"
import { router } from "@/router"

import { setLogout } from "."

export const purgeStoreAndNavigate = async (
  /** default: `/login` */
  navigateTo: string | null = "/login",
) => {
  store.dispatch(setLogout())
  await persistor.purge()
  if (typeof navigateTo === "string") {
    router.navigate(navigateTo)
  }
}
