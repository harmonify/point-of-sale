import { Counter } from "@/features/counter/Counter"
import { t } from "i18next"
import { Fragment } from "react"
import { Helmet } from "react-helmet"
import { createBrowserRouter, RouteObject } from "react-router-dom"

import AuthGuard from "./components/AuthGuard"
import { APP_ENV } from "./environment"
import {
  customerDetailLoader,
  CustomerForm,
  CustomerList,
  customerListLoader,
} from "./pages/customers"
import { Error404, Error500 } from "./pages/errors"
import Home from "./pages/home/Home"
import Login from "./pages/login/Login"
import sale from "./pages/sales"
import HomeInfo from "./pages/home/HomeInfo"

// @ts-ignore
// import UnderMaintenance from "./views/UnderMaintenance"

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
    Component: Error500,
    path: "error",
    title: t("error:FETCH_ERROR"),
    skipAuth: true,
  },
  {
    Component: Counter,
    path: "test",
    title: "Test",
    skipAuth: true,
  },
  {
    Component: Login,
    path: "login",
    title: t("Login"),
    skipAuth: true,
  },
  {
    Component: Home,
    path: "/",
    title: t("Point Of Sale"),
    children: [
      {
        path: "",
        Component: HomeInfo,
        title: t("Point Of Sale"),
      },
      {
        Component: sale,
        title: t("Sale"),
        path: "sale",
      },
      {
        Component: CustomerList,
        title: t("Customer"),
        path: "customers",
        loader: customerListLoader,
      },
      {
        Component: CustomerForm,
        title: t("Create Customer"),
        path: "customers/create",
      },
      {
        Component: CustomerForm,
        title: t("Edit Customer"),
        path: "customers/edit/:id",
        loader: customerDetailLoader,
      },
    ],
  },
  {
    path: "*",
    skipAuth: true,
    title: t("Page not found", { ns: "error" }),
    Component: Error404,
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
