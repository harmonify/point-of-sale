import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions"
import { createApi } from "@reduxjs/toolkit/query/react"

import baseQueryWithReauth from "./baseQuery"
import apiBuilder from "./builder"
import {
  postLoginBuilder,
  postLoginMutationName,
  postLogoutBuilder,
  postLogoutMutationName,
  postRefreshTokenBuilder,
  postRefreshTokenMutationName,
} from "./endpoints/auth"
import { getDashboardInfoBuilder } from "./endpoints/dashboard"
import { cacher } from "./utils/rtkQueryCacheUtils"
import {
  findCategoriesProductsBuilder,
  findCategoriesProductsMutationName,
} from "./endpoints/sales"
import {
  getMonthlySalesReportApiMutationName,
  getMonthlySalesBuilder,
  getDailySalesReportApiMutationName,
  getDailySalesBuilder,
  getYearlySalesReportApiMutationName,
  getYearlySalesBuilder,
  getProfitLossReportApiMutationName,
  getProfitLossBuilder,
  getSalesReportApiMutationName,
  getSalesReportBuilder,
} from "./endpoints/reports"

const reducerPath = "api"

const tagTypes = [
  ...cacher.defaultTags,
  "auth",
  "category",
  "customer",
  "expense",
  "product",
  "transaction",
  "unit",
  "users",
]

export type ApiEndpointBuilder = EndpointBuilder<
  typeof baseQueryWithReauth,
  string,
  typeof reducerPath
>

const api = createApi({
  reducerPath,
  baseQuery: baseQueryWithReauth,
  endpoints: (builder: ApiEndpointBuilder) => {
    const userApi = apiBuilder<
      Monorepo.Api.Response.UserResponseDto,
      Monorepo.Api.Request.CreateUserRequestDto,
      Monorepo.Api.Request.UpdateUserRequestDto
    >(builder, "users")

    // const notificationApi = apiBuilder<Monorepo.Api.Response.UserResponseDto>(
    //   builder,
    //   "notifications",
    // )

    const customerApi = apiBuilder<
      Monorepo.Api.Response.CustomerResponseDto,
      Monorepo.Api.Request.CreateCustomerRequestDto,
      Monorepo.Api.Request.UpdateCustomerRequestDto
    >(builder, "customers")

    const supplierApi = apiBuilder<
      Monorepo.Api.Response.SupplierResponseDto,
      Monorepo.Api.Request.CreateSupplierRequestDto,
      Monorepo.Api.Request.UpdateSupplierRequestDto
    >(builder, "suppliers")

    const categoryApi = apiBuilder<
      Monorepo.Api.Response.CategoryInfoResponseDto,
      Monorepo.Api.Request.CreateCategoryRequestDto,
      Monorepo.Api.Request.UpdateCategoryRequestDto
    >(builder, "categories")

    const unitApi = apiBuilder<
      Monorepo.Api.Response.UnitResponseDto,
      Monorepo.Api.Request.CreateUnitRequestDto,
      Monorepo.Api.Request.UpdateUnitRequestDto
    >(builder, "units")

    const productApi = apiBuilder<
      Monorepo.Api.Response.ProductResponseDto,
      Monorepo.Api.Request.CreateProductRequestDto,
      Monorepo.Api.Request.UpdateProductRequestDto
    >(builder, "products")

    const productUnitApi = apiBuilder<
      Monorepo.Api.Response.ProductResponseDto,
      Monorepo.Api.Request.CreateProductRequestDto,
      Monorepo.Api.Request.UpdateProductRequestDto
    >(builder, "product-units")

    const expenseCategoryApi = apiBuilder<
      Monorepo.Api.Response.ExpenseCategoryResponseDto,
      Monorepo.Api.Request.CreateExpenseCategoryRequestDto,
      Monorepo.Api.Request.UpdateExpenseCategoryRequestDto
    >(builder, "expense-categories")

    const expenseApi = apiBuilder<
      Monorepo.Api.Response.ExpenseResponseDto,
      Monorepo.Api.Request.CreateExpenseRequestDto,
      Monorepo.Api.Request.UpdateExpenseRequestDto
    >(builder, "expenses")

    const procurementApi = apiBuilder<
      Monorepo.Api.Response.ProcurementInfoResponseDto,
      Monorepo.Api.Request.CreateProcurementRequestDto,
      Monorepo.Api.Request.UpdateProcurementRequestDto
    >(builder, "procurements")

    const procurementProductApi = apiBuilder<
      Monorepo.Api.Response.ProcurementResponseDto,
      Monorepo.Api.Request.CreateProcurementRequestDto,
      Monorepo.Api.Request.UpdateProcurementRequestDto
    >(builder, "procurement-products")

    const saleApi = apiBuilder<
      Monorepo.Api.Response.SaleResponseDto,
      Monorepo.Api.Request.CreateSaleRequestDto,
      Monorepo.Api.Request.CreateSaleRequestDto
    >(builder, "sales")

    return {
      [postLoginMutationName]: postLoginBuilder(builder),
      [postRefreshTokenMutationName]: postRefreshTokenBuilder(builder),
      [postLogoutMutationName]: postLogoutBuilder(builder),

      getDashboardInfo: getDashboardInfoBuilder(builder),

      [findCategoriesProductsMutationName]:
        findCategoriesProductsBuilder(builder),

      [getSalesReportApiMutationName]: getSalesReportBuilder(builder),
      [getDailySalesReportApiMutationName]: getDailySalesBuilder(builder),
      [getMonthlySalesReportApiMutationName]: getMonthlySalesBuilder(builder),
      [getYearlySalesReportApiMutationName]: getYearlySalesBuilder(builder),
      [getProfitLossReportApiMutationName]: getProfitLossBuilder(builder),

      createUserApi: userApi.create,
      findAllUserApi: userApi.findAll,
      findOneUserApi: userApi.findOne,
      updateUserApi: userApi.update,
      deleteUserApi: userApi.delete,

      // createNotificationApi: notificationApi.create,
      // findAllNotificationApi: notificationApi.findAll,
      // findOneNotificationApi: notificationApi.findOne,
      // updateNotificationApi: notificationApi.update,
      // deleteNotificationApi: notificationApi.delete,

      createCustomerApi: customerApi.create,
      findAllCustomerApi: customerApi.findAll,
      findOneCustomerApi: customerApi.findOne,
      updateCustomerApi: customerApi.update,
      deleteCustomerApi: customerApi.delete,

      createSupplierApi: supplierApi.create,
      findAllSupplierApi: supplierApi.findAll,
      findOneSupplierApi: supplierApi.findOne,
      updateSupplierApi: supplierApi.update,
      deleteSupplierApi: supplierApi.delete,

      createCategoryApi: categoryApi.create,
      findAllCategoryApi: categoryApi.findAll,
      findOneCategoryApi: categoryApi.findOne,
      updateCategoryApi: categoryApi.update,
      deleteCategoryApi: categoryApi.delete,

      createUnitApi: unitApi.create,
      findAllUnitApi: unitApi.findAll,
      findOneUnitApi: unitApi.findOne,
      updateUnitApi: unitApi.update,
      deleteUnitApi: unitApi.delete,

      createProductApi: productApi.create,
      findAllProductApi: productApi.findAll,
      findOneProductApi: productApi.findOne,
      updateProductApi: productApi.update,
      deleteProductApi: productApi.delete,

      findAllProductUnitApi: productUnitApi.findAll,
      deleteProductUnitApi: productUnitApi.delete,

      createExpenseCategoryApi: expenseCategoryApi.create,
      findAllExpenseCategoryApi: expenseCategoryApi.findAll,
      findOneExpenseCategoryApi: expenseCategoryApi.findOne,
      updateExpenseCategoryApi: expenseCategoryApi.update,
      deleteExpenseCategoryApi: expenseCategoryApi.delete,

      createExpenseApi: expenseApi.create,
      findAllExpenseApi: expenseApi.findAll,
      findOneExpenseApi: expenseApi.findOne,
      updateExpenseApi: expenseApi.update,
      deleteExpenseApi: expenseApi.delete,

      createProcurementApi: procurementApi.create,
      findAllProcurementApi: procurementApi.findAll,
      findOneProcurementApi: procurementApi.findOne,
      updateProcurementApi: procurementApi.update,
      deleteProcurementApi: procurementApi.delete,

      findAllProcurementProductApi: procurementProductApi.findAll,
      deleteProcurementProductApi: procurementProductApi.delete,

      createSaleApi: saleApi.create,
      findAllSaleApi: saleApi.findAll,
      findOneSaleApi: saleApi.findOne,
      updateSaleApi: saleApi.update,
      deleteSaleApi: saleApi.delete,

      refetchErroredQueries: builder.mutation<unknown, void>({
        queryFn() {
          return { data: {} }
        },
        invalidatesTags: tagTypes,
      }),
    }
  },
  tagTypes,
})

export default api

export const {
  usePostLoginMutation,
  usePostRefreshTokenMutation,
  usePostLogoutMutation,

  useGetDashboardInfoQuery,

  useFindCategoriesProductsQuery,

  useLazyGetSalesReportQuery,
  useGetSalesReportQuery,
  useGetDailySalesReportQuery,
  useGetMonthlySalesReportQuery,
  useGetYearlySalesReportQuery,
  useLazyGetProfitLossReportQuery,
  useGetProfitLossReportQuery,

  useCreateUserApiMutation,
  useLazyFindAllUserApiQuery,
  useLazyFindOneUserApiQuery,
  useUpdateUserApiMutation,
  useDeleteUserApiMutation,

  // useCreateNotificationApiMutation,
  // useLazyFindAllNotificationApiQuery,
  // useLazyFindOneNotificationApiQuery,
  // useUpdateNotificationApiMutation,
  // useDeleteNotificationApiMutation,

  useCreateCustomerApiMutation,
  useFindAllCustomerApiQuery,
  useFindOneCustomerApiQuery,
  useLazyFindAllCustomerApiQuery,
  useLazyFindOneCustomerApiQuery,
  useUpdateCustomerApiMutation,
  useDeleteCustomerApiMutation,

  useCreateSupplierApiMutation,
  useFindAllSupplierApiQuery,
  useFindOneSupplierApiQuery,
  useLazyFindAllSupplierApiQuery,
  useLazyFindOneSupplierApiQuery,
  useUpdateSupplierApiMutation,
  useDeleteSupplierApiMutation,

  useCreateCategoryApiMutation,
  useFindAllCategoryApiQuery,
  useFindOneCategoryApiQuery,
  useLazyFindAllCategoryApiQuery,
  useLazyFindOneCategoryApiQuery,
  useUpdateCategoryApiMutation,
  useDeleteCategoryApiMutation,

  useCreateUnitApiMutation,
  useFindAllUnitApiQuery,
  useFindOneUnitApiQuery,
  useLazyFindAllUnitApiQuery,
  useLazyFindOneUnitApiQuery,
  useUpdateUnitApiMutation,
  useDeleteUnitApiMutation,

  useCreateProductApiMutation,
  useFindAllProductApiQuery,
  useFindOneProductApiQuery,
  useLazyFindAllProductApiQuery,
  useLazyFindOneProductApiQuery,
  useUpdateProductApiMutation,
  useDeleteProductApiMutation,

  useLazyFindAllProductUnitApiQuery,
  useDeleteProductUnitApiMutation,

  useCreateExpenseCategoryApiMutation,
  useLazyFindAllExpenseCategoryApiQuery,
  useLazyFindOneExpenseCategoryApiQuery,
  useUpdateExpenseCategoryApiMutation,
  useDeleteExpenseCategoryApiMutation,

  useCreateExpenseApiMutation,
  useLazyFindAllExpenseApiQuery,
  useLazyFindOneExpenseApiQuery,
  useUpdateExpenseApiMutation,
  useDeleteExpenseApiMutation,

  useCreateProcurementApiMutation,
  useFindAllProcurementApiQuery,
  useFindOneProcurementApiQuery,
  useLazyFindAllProcurementApiQuery,
  useLazyFindOneProcurementApiQuery,
  useUpdateProcurementApiMutation,
  useDeleteProcurementApiMutation,

  useDeleteProcurementProductApiMutation,

  useCreateSaleApiMutation,
  useLazyFindAllSaleApiQuery,
  useFindAllSaleApiQuery,
  useLazyFindOneSaleApiQuery,
  useUpdateSaleApiMutation,
  useDeleteSaleApiMutation,
} = api
