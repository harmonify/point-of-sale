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

const reducerPath = "api"

const tagTypes = [
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

    const providerApi = apiBuilder<
      Monorepo.Api.Response.ProviderResponseDto,
      Monorepo.Api.Request.CreateProviderRequestDto,
      Monorepo.Api.Request.UpdateProviderRequestDto
    >(builder, "providers")

    const categoryApi = apiBuilder<
      Monorepo.Api.Response.CategoryResponseDto,
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
      Monorepo.Api.Response.ProcurementResponseDto,
      Monorepo.Api.Request.CreateProcurementRequestDto,
      Monorepo.Api.Request.UpdateProcurementRequestDto
    >(builder, "procurements")

    const saleApi = apiBuilder<
      Monorepo.Api.Response.SaleResponseDto,
      Monorepo.Api.Request.CreateSaleRequestDto,
      Monorepo.Api.Request.UpdateSaleRequestDto
    >(builder, "sales")

    return {
      [postLoginMutationName]: postLoginBuilder(builder),
      [postRefreshTokenMutationName]: postRefreshTokenBuilder(builder),
      [postLogoutMutationName]: postLogoutBuilder(builder),

      getDashboardInfo: getDashboardInfoBuilder(builder),

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

      createProviderApi: providerApi.create,
      findAllProviderApi: providerApi.findAll,
      findOneProviderApi: providerApi.findOne,
      updateProviderApi: providerApi.update,
      deleteProviderApi: providerApi.delete,

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

      createSaleApi: saleApi.create,
      findAllSaleApi: saleApi.findAll,
      findOneSaleApi: saleApi.findOne,
      updateSaleApi: saleApi.update,
      deleteSaleApi: saleApi.delete,
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
  useLazyFindAllCustomerApiQuery,
  useLazyFindOneCustomerApiQuery,
  useUpdateCustomerApiMutation,
  useDeleteCustomerApiMutation,

  useCreateProviderApiMutation,
  useLazyFindAllProviderApiQuery,
  useLazyFindOneProviderApiQuery,
  useUpdateProviderApiMutation,
  useDeleteProviderApiMutation,

  useCreateCategoryApiMutation,
  useLazyFindAllCategoryApiQuery,
  useLazyFindOneCategoryApiQuery,
  useUpdateCategoryApiMutation,
  useDeleteCategoryApiMutation,

  useCreateUnitApiMutation,
  useLazyFindAllUnitApiQuery,
  useLazyFindOneUnitApiQuery,
  useUpdateUnitApiMutation,
  useDeleteUnitApiMutation,

  useCreateProductApiMutation,
  useLazyFindAllProductApiQuery,
  useLazyFindOneProductApiQuery,
  useUpdateProductApiMutation,
  useDeleteProductApiMutation,

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
  useLazyFindAllProcurementApiQuery,
  useLazyFindOneProcurementApiQuery,
  useUpdateProcurementApiMutation,
  useDeleteProcurementApiMutation,

  useCreateSaleApiMutation,
  useLazyFindAllSaleApiQuery,
  useLazyFindOneSaleApiQuery,
  useUpdateSaleApiMutation,
  useDeleteSaleApiMutation,
} = api
