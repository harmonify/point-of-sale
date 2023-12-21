import { useAppDispatch } from "@/app/hooks"
import { FormikSubmissionHandler, FormikTextInput } from "@/components/forms"
import { Formik } from "formik"
import { t } from "i18next"
import React from "react"
import { useLoaderData, useNavigate, useParams } from "react-router-dom"

import Container from "../../../components/controls/Container"
import Form from "../../../components/forms/Form"
import {
  useCreateCustomerApiMutation,
  useUpdateCustomerApiMutation,
} from "../../../services/api"
import createCustomerValidationSchema, {
  CustomerState,
} from "./validationSchema"

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

  const onSubmit: FormikSubmissionHandler<CustomerState> = async (data) => {
    const promise = id
      ? updateCustomerApiMutation({ id, data })
      : createCustomerApiMutation(data)
    return promise.unwrap().then(() => {
      return navigate(`/customers`)
    })
  }

  const onCancel = () => {
    // const isDirty = id
    //   ? !equal(data, customer)
    //   : !equal(initialValues, customer)
    // if (isDirty === true) {
    // TODO: show confirmation dialog
    // }
    navigate(-1)
  }

  return (
    <Container
      title={
        id
          ? t("Edit Customer", { ns: "action" })
          : t("Create Customer", { ns: "action" })
      }
    >
      <Formik
        initialValues={customer || initialValues}
        validationSchema={createCustomerValidationSchema}
        validateOnChange={true}
        validateOnBlur={true}
        onSubmit={onSubmit}
      >
        <Form onCancel={onCancel}>
          <FormikTextInput
            name="name"
            label={t("Name")}
            margin="normal"
            fullWidth
          />
          <FormikTextInput
            name="description"
            label={t("Description")}
            margin="normal"
            fullWidth
            multiline={true}
            minRows={3}
          />
          <FormikTextInput
            name="address"
            label={t("Address")}
            margin="normal"
          />
          <FormikTextInput
            name="phoneNumber"
            label={t("Phone Number")}
            margin="normal"
          />
          <FormikTextInput
            name="email"
            label={t("Email")}
            margin="normal"
          />
        </Form>
      </Formik>
    </Container>
  )
}

export default CustomerForm
