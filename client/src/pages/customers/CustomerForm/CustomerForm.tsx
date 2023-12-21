import { useAppDispatch } from "@/app/hooks"
import { FormikSubmissionHandler, FormikTextInput } from "@/components/forms"
import { Formik } from "formik"
import { t } from "i18next"
import React, { useEffect, useState } from "react"
import { useLoaderData, useNavigate, useParams } from "react-router-dom"

import Container from "../../../components/controls/layout/Container/Container"
import Form from "../../../components/forms/Form"
import {
  useCreateCustomerApiMutation,
  useFindOneCustomerApiQuery,
  useLazyFindOneCustomerApiQuery,
  useUpdateCustomerApiMutation,
} from "../../../services/api"
import createCustomerValidationSchema, {
  CustomerState,
  genderOptions,
} from "./validationSchema"
import { Grid, MenuItem, Typography } from "@material-ui/core"
import FormikDropdownInput from "@/components/forms/FormikSelectInput"
import FormikSelectInput from "@/components/forms/FormikSelectInput"

const initialValues = {
  name: null,
  gender: "NOT_DEFINED",
  address: null,
  phoneNumber: null,
  description: null,
  email: null,
} as unknown as CustomerState

const CustomerForm: React.FC = () => {
  const navigate = useNavigate()

  const [createCustomerApiMutation] = useCreateCustomerApiMutation()
  const [updateCustomerApiMutation] = useUpdateCustomerApiMutation()

  const { id } = useParams()
  const [findOneCustomerApiQuery, { data: customerApiQueryResponse }] =
    useLazyFindOneCustomerApiQuery({
      refetchOnFocus: true,
      refetchOnReconnect: true,
    })
  useEffect(() => {
    if (!id) return
    findOneCustomerApiQuery({ id })
  }, [findOneCustomerApiQuery])

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
    //   // TODO: show confirmation dialog
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
        enableReinitialize={true}
        initialValues={
          customerApiQueryResponse
            ? customerApiQueryResponse.data
            : initialValues
        }
        validationSchema={createCustomerValidationSchema}
        validateOnChange={true}
        validateOnBlur={true}
        onSubmit={onSubmit}
      >
        <Form onCancel={onCancel}>
          <Grid container spacing={1}>
            <Grid item xs={9} md={8}>
              <FormikTextInput name="name" label={t("Name")} />
            </Grid>

            <Grid item xs={3} md={4}>
              <FormikSelectInput
                name="gender"
                label={t("Gender")}
                variant="standard"
                options={genderOptions}
              />
            </Grid>

            <Grid item xs={12}>
              <FormikTextInput name="description" label={t("Description")} />
            </Grid>

            <Grid item xs={12}>
              <FormikTextInput name="address" label={t("Address")} />
            </Grid>

            <Grid item xs={12} md={6}>
              <FormikTextInput name="phoneNumber" label={t("Phone Number")} />
            </Grid>

            <Grid item xs={12} md={6}>
              <FormikTextInput name="email" label={t("Email")} />
            </Grid>
          </Grid>
        </Form>
      </Formik>
    </Container>
  )
}

export default CustomerForm
