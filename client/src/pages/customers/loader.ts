import api from "@/services/api"
import {
  modelDetailLoaderBuilder,
  modelListLoaderBuilder,
} from "@/services/endpointLoaderBuilder"

export const customerListLoader = modelListLoaderBuilder({
  apiEndpointQuery: api.endpoints.findAllCustomerApi,
})

export const customerDetailLoader = modelDetailLoaderBuilder({
  apiEndpointQuery: api.endpoints.findOneCustomerApi,
  redirectOnErrorUrl: "/customers",
})
