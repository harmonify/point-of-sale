import { useAppDispatch } from "@/app/hooks"
import { FormikSubmissionHandler, TextInput } from "@/components/forms"
import { showSnackbar } from "@/features/snackbar"
import { logger } from "@/services/logger"
import * as equal from "fast-deep-equal"
import { Formik } from "formik"
import { t } from "i18next"
import React, { useCallback, useEffect, useState } from "react"
import { useLoaderData, useNavigate, useParams } from "react-router-dom"

import Container from "../../../components/controls/Container"
import CircularLoader from "../../../components/controls/loader/CircularLoader"
import Form from "../../../components/forms/Form"
import {
  useCreateCustomerApiMutation,
  useLazyFindOneCustomerApiQuery,
  useUpdateCustomerApiMutation,
} from "../../../services/api"

export interface CustomerState {
  name: string
  address: string | null | undefined
  phoneNumber: string | null | undefined
  description: string | null | undefined
  email: string | null | undefined
}

const initialValues = {
  name: "",
  address: "",
  phoneNumber: "",
  description: "",
  email: "",
} as CustomerState

const CustomerForm: React.FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const [createCustomerApiMutation] = useCreateCustomerApiMutation()
  const [updateCustomerApiMutation] = useUpdateCustomerApiMutation()

  const { id } = useParams()
  const customer = useLoaderData() as
    | Monorepo.Api.Response.CustomerResponseDto
    | undefined
  console.log(`🚀 ~ customer ~ ${JSON.stringify(customer, null, 2)}`)

  const [findOneCustomerApiQuery, { data, isLoading }] =
    useLazyFindOneCustomerApiQuery()

  const [customerState, setState] = useState(initialValues)

  const fetchData = useCallback(async () => {
    findOneCustomerApiQuery({ id: id! })
      .unwrap()
      .then((data) => {
        setState(data.data)
      })
      .catch((error) => {
        navigate("/customers")
      })
  }, [])
  useEffect(() => {
    if (!id) return
    fetchData()
  }, [fetchData])

  const onSubmit: FormikSubmissionHandler<CustomerState> = async (data) => {
    const promise = id
      ? updateCustomerApiMutation({ id, data })
      : createCustomerApiMutation(data)

    promise
      .unwrap()
      .then((data) => {
        dispatch(
          showSnackbar({
            message: id
              ? t("Customer successfully updated")
              : t("Customer successfully created"),
            variant: "success",
          }),
        )
        if (!id) navigate(`/customers/${data.data.id}`)
      })
      .catch((error) => {
        logger.error(error)
        dispatch(
          showSnackbar({
            message: error
              ? error.message ||
                (error.data && error.data.message) ||
                t(`error.${error.status}` as any)
              : t(`error.FETCH_ERROR`),
            variant: "error",
          }),
        )
      })
  }

  const onCancel = () => {
    const isDirty = id
      ? !equal(data, customerState)
      : !equal(initialValues, customerState)
    if (isDirty === true) {
    }
    navigate(-1)
  }

  return (
    <Container title={id ? t("Edit Customer") : t("Create Customer")}>
      <CircularLoader isLoading={isLoading} />

      <Formik
        initialValues={
          id
            ? (() => {
                console.log(
                  `🚀 ~ customerState ~ ${JSON.stringify(
                    customerState,
                    null,
                    2,
                  )}`,
                )
                return customerState
              })()
            : initialValues
        }
        validationSchema={customerValidationSchema}
        validateOnChange={true}
        validateOnBlur={true}
        onSubmit={onSubmit}
      >
        <Form onCancel={onCancel}>
          <TextInput
            name="name"
            label="Customer Name"
            margin="normal"
            fullWidth
          />
          <TextInput
            name="description"
            label="Description"
            margin="normal"
            fullWidth
          />
          <TextInput name="address" label="Address" margin="normal" fullWidth />
          <TextInput
            name="phoneNumber"
            label="Mobile"
            margin="normal"
            fullWidth
          />
          <TextInput name="email" label="Email Id" margin="normal" fullWidth />
        </Form>
      </Formik>
    </Container>
  )
}

export default CustomerForm
