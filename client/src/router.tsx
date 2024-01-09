import { t } from "i18next"
import { Fragment, lazy } from "react"
import { Helmet } from "react-helmet"
import { createBrowserRouter, RouteObject } from "react-router-dom"

import AuthGuard from "./components/AuthGuard"
import { APP_ENV } from "./environment"
import CategoryList from "./pages/categories/CategoryList"
import CustomerList from "./pages/customers/CustomerList"
import { Error500 } from "./pages/errors"
import Home from "./pages/home/Home"
import HomeInfo from "./pages/home/HomeInfo"
import Login from "./pages/login/Login"
import ProcurementList from "./pages/procurements/ProcurementList"
import ProductList from "./pages/products/ProductList"
import Sale from "./pages/sales/Sale"
import SupplierList from "./pages/suppliers/SupplierList"
import UnitList from "./pages/units/UnitList"

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
        Component: Sale,
        title: t("Sale"),
        path: "sales",
      },
      // {
      //   Component: () => <OrderReceiptPDF data={receiptDataMock} />,
      //   title: t("Sale"),
      //   path: "sales/test",
      // },
      {
        Component: lazy(() => import("./pages/orders/OrderList")),
        title: t("Order List"),
        path: "sales/list",
      },
      // Customer
      {
        Component: CustomerList,
        title: t("Customers"),
        path: "customers",
      },
      {
        Component: lazy(() => import("./pages/customers/CustomerForm")),
        title: t("Create Customer", { ns: "action" }),
        path: "customers/create",
      },
      {
        Component: lazy(() => import("./pages/customers/CustomerForm")),
        title: t("Edit Customer", { ns: "action" }),
        path: "customers/:id",
      },
      // Supplier
      {
        Component: SupplierList,
        title: t("Suppliers"),
        path: "suppliers",
      },
      {
        Component: lazy(() => import("./pages/suppliers/SupplierForm")),
        title: t("Create Supplier", { ns: "action" }),
        path: "suppliers/create",
      },
      {
        Component: lazy(() => import("./pages/suppliers/SupplierForm")),
        title: t("Edit Supplier", { ns: "action" }),
        path: "suppliers/:id",
      },
      // Category
      {
        Component: CategoryList,
        title: t("Categories"),
        path: "categories",
      },
      {
        Component: lazy(() => import("./pages/categories/CategoryForm")),
        title: t("Create Category", { ns: "action" }),
        path: "categories/create",
      },
      {
        Component: lazy(() => import("./pages/categories/CategoryForm")),
        title: t("Edit Category", { ns: "action" }),
        path: "categories/:id",
      },
      // Unit
      {
        Component: UnitList,
        title: t("Units"),
        path: "units",
      },
      {
        Component: lazy(() => import("./pages/units/UnitForm")),
        title: t("Create Unit", { ns: "action" }),
        path: "units/create",
      },
      {
        Component: lazy(() => import("./pages/units/UnitForm")),
        title: t("Edit Unit", { ns: "action" }),
        path: "units/:id",
      },
      // Products
      {
        Component: ProductList,
        title: t("Products"),
        path: "products",
      },
      {
        Component: lazy(() => import("./pages/products/ProductForm")),
        title: t("Create Product", { ns: "action" }),
        path: "products/create",
      },
      {
        Component: lazy(() => import("./pages/products/ProductForm")),
        title: t("Edit Product", { ns: "action" }),
        path: "products/:id",
      },
      // Procurements
      {
        Component: ProcurementList,
        title: t("Procurements"),
        path: "procurements",
      },
      {
        Component: lazy(() => import("./pages/procurements/ProcurementForm")),
        title: t("Create Procurement", { ns: "action" }),
        path: "procurements/create",
      },
      {
        Component: lazy(() => import("./pages/procurements/ProcurementForm")),
        title: t("Edit Procurement", { ns: "action" }),
        path: "procurements/:id",
      },
      {
        Component: lazy(() => import("./pages/reports/SaleReport")),
        title: t("Sales"),
        path: "/reports/sales",
      },
      {
        Component: lazy(() => import("./pages/reports/ProfitLossReport")),
        title: t("Profit Loss"),
        path: "/reports/profit-loss",
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
