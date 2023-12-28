import Container from "@/components/layout/Container/Container"
import { FormikSubmissionHandler } from "@/components/forms"
import Form from "@/components/forms/Form"
import FormikSelectInput from "@/components/forms/FormikSelectInput"
import FormikTextInput from "@/components/forms/FormikTextInput"
import {
  useCreateCustomerApiMutation,
  useLazyFindOneCustomerApiQuery,
  useUpdateCustomerApiMutation,
} from "@/services/api"
import { Grid } from "@material-ui/core"
import { Formik } from "formik"
import { t } from "i18next"
import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

import createCustomerValidationSchema, {
  CustomerState,
  genderOptions,
} from "./validationSchema"

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
      return navigate(-1)
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
                options={genderOptions}
              />
            </Grid>

            <Grid item xs={12}>
              <FormikTextInput
                name="description"
                label={t("Description")}
                multiline
                minRows={3}
              />
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
