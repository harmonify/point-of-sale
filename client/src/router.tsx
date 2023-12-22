import { t } from "i18next"
import { Fragment, lazy } from "react"
import { Helmet } from "react-helmet"
import { createBrowserRouter, RouteObject } from "react-router-dom"

import AuthGuard from "./components/AuthGuard"
import { APP_ENV } from "./environment"
import { Error500 } from "./pages/errors"
import { Login } from "./pages/login"
import Home from "./pages/home/Home"
import HomeInfo from "./pages/home/HomeInfo"
import sales from "./pages/sales"

type IRoute = Omit<RouteObject, "children"> & {
  title: string
  Component: React.ComponentType
  children?: IRoute[]
  skipAuth?: boolean
  layout?: React.FC
}

const routeObjects: IRoute[] = [
  // {
  //   Component: UnderMaintenance,
  //   path: "maintenance",
  //   skipAuth: true,
  // },
  {
    Component: lazy(() => import("./pages/errors/Error500")),
    path: "error",
    title: t("error:FETCH_ERROR"),
    skipAuth: true,
  },
  {
    Component: lazy(() => import("./features/counter/Counter")),
    path: "test",
    title: "Test",
    skipAuth: true,
  },
  {
    Component: Login,
    path: "login",
    title: t("Login", { ns: "action" }),
    skipAuth: true,
  },
  {
    Component: Home,
    path: "/",
    title: t("Point of Sales"),
    children: [
      {
        path: "",
        Component: HomeInfo,
        title: t("Point of Sales"),
      },
      {
        Component: sales,
        title: t("Sale"),
        path: "sale",
      },
      {
        Component: lazy(
          () => import("./pages/customers/CustomerList/CustomerList"),
        ),
        title: t("Customers"),
        path: "customers",
      },
      {
        Component: lazy(
          () => import("./pages/customers/CustomerForm/CustomerForm"),
        ),
        title: t("Create Customer", { ns: "action" }),
        path: "customers/create",
      },
      {
        Component: lazy(
          () => import("./pages/customers/CustomerForm/CustomerForm"),
        ),
        title: t("Edit Customer", { ns: "action" }),
        path: "customers/edit/:id",
      },
      {
        Component: lazy(
          () => import("./pages/suppliers/SupplierList/SupplierList"),
        ),
        title: t("Suppliers"),
        path: "suppliers",
      },
      {
        Component: lazy(
          () => import("./pages/suppliers/SupplierForm/SupplierForm"),
        ),
        title: t("Create Supplier", { ns: "action" }),
        path: "suppliers/create",
      },
      {
        Component: lazy(
          () => import("./pages/suppliers/SupplierForm/SupplierForm"),
        ),
        title: t("Edit Supplier", { ns: "action" }),
        path: "suppliers/edit/:id",
      },
    ],
  },
  {
    path: "*",
    skipAuth: true,
    title: t("Page not found", { ns: "error" }),
    Component: lazy(() => import("./pages/errors/Error404")),
  },
]

const renderRoute = (route: IRoute) => {
  const Component = route.Component!
  const Guard = route.skipAuth ? Fragment : AuthGuard
  const Layout = route.layout || Fragment

  route.element = (
    <Guard>
      {route.title && <Helmet title={route.title} />}
      <Layout>
        <Component />
      </Layout>
    </Guard>
  )

  // @ts-expect-error
  delete route.Component

  if (APP_ENV === "production") {
    route.errorElement = <Error500 />
  }

  if (Array.isArray(route.children)) {
    route.children.map(renderRoute)
  }

  return route
}

export const router = createBrowserRouter(
  routeObjects.map(renderRoute) as RouteObject[],
)
