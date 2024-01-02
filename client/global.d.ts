import { defaultNS, IResourceLanguage } from "@/services/lang"

export {}

declare global {
  type RootState = import("@/app/store").RootState

  namespace Monorepo {
    namespace Api {
      namespace Request {
        type RequestPaginationInfoDto =
          import("../server/src/libs/http/dtos").RequestPaginationInfoDto
        type LoginRequestDto =
          import("../server/src/modules/auth").LoginRequestDto
        type RefreshTokenRequestDto =
          import("../server/src/modules/auth").RefreshTokenRequestDto
        type LogoutRequestDto =
          import("../server/src/modules/auth").LogoutRequestDto

        type CreateUserRequestDto =
          import("../server/src/modules/user").CreateUserRequestDto
        type CreateCustomerRequestDto =
          import("../server/src/modules/customer").CreateCustomerRequestDto
        type CreateSupplierRequestDto =
          import("../server/src/modules/supplier").CreateSupplierRequestDto
        type CreateCategoryRequestDto =
          import("../server/src/modules/category").CreateCategoryRequestDto
        type CreateUnitRequestDto =
          import("../server/src/modules/unit").CreateUnitRequestDto
        type CreateProductRequestDto =
          import("../server/src/modules/product").CreateProductRequestDto
        type CreateProcurementRequestDto =
          import("../server/src/modules/procurement").CreateProcurementRequestDto
        type CreateProcurementProductRequestDto =
          import("../server/src/modules/procurement").CreateProcurementProductRequestDto
        type CreateExpenseCategoryRequestDto =
          import("../server/src/modules/expense-category").CreateExpenseCategoryRequestDto
        type CreateExpenseRequestDto =
          import("../server/src/modules/expense").CreateExpenseRequestDto
        type CreateSaleRequestDto =
          import("../server/src/modules/sale").CreateSaleRequestDto

        type UpdateUserRequestDto =
          import("../server/src/modules/user").UpdateUserRequestDto
        type UpdateCustomerRequestDto =
          import("../server/src/modules/customer").UpdateCustomerRequestDto
        type UpdateSupplierRequestDto =
          import("../server/src/modules/supplier").UpdateSupplierRequestDto
        type UpdateCategoryRequestDto =
          import("../server/src/modules/category").UpdateCategoryRequestDto
        type UpdateUnitRequestDto =
          import("../server/src/modules/unit").UpdateUnitRequestDto
        type UpdateProductRequestDto =
          import("../server/src/modules/product").UpdateProductRequestDto
        type UpdateProcurementRequestDto =
          import("../server/src/modules/procurement").UpdateProcurementRequestDto
        type UpdateProcurementProductRequestDto =
          import("../server/src/modules/procurement").UpdateProcurementProductRequestDto
        type UpdateExpenseCategoryRequestDto =
          import("../server/src/modules/expense-category").UpdateExpenseCategoryRequestDto
        type UpdateExpenseRequestDto =
          import("../server/src/modules/expense").UpdateExpenseRequestDto
      }

      namespace Response {
        type ResponseBodyDto<T> =
          import("../server/src/libs/http/dtos").ResponseBodyDto<T>
        type LoginResponseDto =
          import("../server/src/modules/auth").LoginResponseDto
        type RefreshTokenResponseDto =
          import("../server/src/modules/auth").RefreshTokenResponseDto
        type UserResponseDto =
          import("../server/src/modules/user").UserResponseDto
        type CustomerResponseDto =
          import("../server/src/modules/customer").CustomerResponseDto
        type CustomerInfoResponseDto =
          import("../server/src/modules/customer").CustomerInfoResponseDto
        type SupplierResponseDto =
          import("../server/src/modules/supplier").SupplierResponseDto
        type SupplierInfoResponseDto =
          import("../server/src/modules/supplier").SupplierInfoResponseDto
        type CategoryResponseDto =
          import("../server/src/modules/category").CategoryResponseDto
        type CategoryInfoResponseDto =
          import("../server/src/modules/category").CategoryInfoResponseDto
        type CategoryProductResponseDto =
          import("../server/src/modules/category").CategoryProductResponseDto
        type UnitResponseDto =
          import("../server/src/modules/unit").UnitResponseDto
        type UnitInfoResponseDto =
          import("../server/src/modules/unit").UnitInfoResponseDto
        type ProductResponseDto =
          import("../server/src/modules/product").ProductResponseDto
        type ProductUnitResponseDto =
          import("../server/src/modules/product").ProductUnitResponseDto
        type ProductUnitInfoResponseDto =
          import("../server/src/modules/product").ProductUnitInfoResponseDto
        type ProcurementResponseDto =
          import("../server/src/modules/procurement").ProcurementResponseDto
        type ProcurementProductResponseDto =
          import("../server/src/modules/procurement").ProcurementProductResponseDto
        type ExpenseCategoryResponseDto =
          import("../server/src/modules/expense-category").ExpenseCategoryResponseDto
        type ExpenseResponseDto =
          import("../server/src/modules/expense").ExpenseResponseDto
        type SaleResponseDto =
          import("../server/src/modules/sale").SaleResponseDto
        type DashboardResponseDto =
          import("../server/src/modules/dashboard").DashboardResponseDto
      }
    }
  }
}

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: typeof defaultNS
    resources: IResourceLanguage
  }
}
