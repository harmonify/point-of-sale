import api from "@/services/api"
import {
  modelDetailLoaderBuilder,
  modelListLoaderBuilder,
} from "@/services/router"

export const customerListLoader = modelListLoaderBuilder({
  apiEndpointQuery: api.endpoints.findAllCustomerApi,
  all: true,
})

export const customerDetailLoader = modelDetailLoaderBuilder({
  apiEndpointQuery: api.endpoints.findOneCustomerApi,
  redirectOnErrorUrl: "/customers",
})
