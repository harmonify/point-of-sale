import { setLogout } from "."

export const purgeStoreAndNavigate = async (
  /** default: `/login` */
  navigateTo: string | null = "/login",
) => {
  const storeImport = await import("@/app/store")
  const { default: store, persistor } = storeImport
  const { router } = await import("@/router")
  store.dispatch(setLogout())
  await persistor.purge()
  if (typeof navigateTo === "string") {
    router.navigate(navigateTo)
  }
}
