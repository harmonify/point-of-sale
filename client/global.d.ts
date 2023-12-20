import { defaultNS, IResourceLanguage } from "@/lang"

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
        type CreateProviderRequestDto =
          import("../server/src/modules/provider").CreateProviderRequestDto
        type CreateCategoryRequestDto =
          import("../server/src/modules/category").CreateCategoryRequestDto
        type CreateUnitRequestDto =
          import("../server/src/modules/unit").CreateUnitRequestDto
        type CreateProductRequestDto =
          import("../server/src/modules/product").CreateProductRequestDto
        type CreateProcurementRequestDto =
          import("../server/src/modules/procurement").CreateProcurementRequestDto
        type CreateSaleRequestDto =
          import("../server/src/modules/sale").CreateSaleRequestDto

        type UpdateUserRequestDto =
          import("../server/src/modules/user").UpdateUserRequestDto
        type UpdateCustomerRequestDto =
          import("../server/src/modules/customer").UpdateCustomerRequestDto
        type UpdateProviderRequestDto =
          import("../server/src/modules/provider").UpdateProviderRequestDto
        type UpdateCategoryRequestDto =
          import("../server/src/modules/category").UpdateCategoryRequestDto
        type UpdateUnitRequestDto =
          import("../server/src/modules/unit").UpdateUnitRequestDto
        type UpdateProductRequestDto =
          import("../server/src/modules/product").UpdateProductRequestDto
        type UpdateProcurementRequestDto =
          import("../server/src/modules/procurement").UpdateProcurementRequestDto
        type UpdateSaleRequestDto =
          import("../server/src/modules/sale").UpdateSaleRequestDto
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
        type ProviderResponseDto =
          import("../server/src/modules/provider").ProviderResponseDto
        type CategoryResponseDto =
          import("../server/src/modules/category").CategoryResponseDto
        type UnitResponseDto =
          import("../server/src/modules/unit").UnitResponseDto
        type ProductResponseDto =
          import("../server/src/modules/product").ProductResponseDto
        type ProcurementResponseDto =
          import("../server/src/modules/procurement").ProcurementResponseDto
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