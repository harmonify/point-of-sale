import api from "@/services/api"
import {
  modelDetailLoaderBuilder,
  modelListLoaderBuilder,
} from "@/services/router"

export const supplierListLoader = modelListLoaderBuilder({
  apiEndpointQuery: api.endpoints.findAllSupplierApi,
  all: true,
})

export const supplierDetailLoader = modelDetailLoaderBuilder({
  apiEndpointQuery: api.endpoints.findOneSupplierApi,
  redirectOnErrorUrl: "/suppliers",
})
