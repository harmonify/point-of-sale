import Container from "@/components/layout/Container/Container"
import { FormikSubmissionHandler } from "@/components/forms"
import Form from "@/components/forms/Form"
import FormikTextInput from "@/components/forms/FormikTextInput"
import {
  useCreateSupplierApiMutation,
  useLazyFindOneSupplierApiQuery,
  useUpdateSupplierApiMutation,
} from "@/services/api"
import { Grid } from "@material-ui/core"
import { Formik } from "formik"
import { t } from "i18next"
import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

import createSupplierValidationSchema, {
  SupplierState,
} from "./validationSchema"

const initialValues = {
  name: null,
  gender: "NOT_DEFINED",
  address: null,
  phoneNumber: null,
  description: null,
  email: null,
} as unknown as SupplierState

const SupplierForm: React.FC = () => {
  const navigate = useNavigate()

  const [createSupplierApiMutation] = useCreateSupplierApiMutation()
  const [updateSupplierApiMutation] = useUpdateSupplierApiMutation()

  const { id } = useParams()
  const [findOneSupplierApiQuery, { data: supplierApiQueryResponse }] =
    useLazyFindOneSupplierApiQuery({
      refetchOnFocus: true,
      refetchOnReconnect: true,
    })
  useEffect(() => {
    if (!id) return
    findOneSupplierApiQuery({ id })
  }, [findOneSupplierApiQuery])

  const onSubmit: FormikSubmissionHandler<SupplierState> = async (data) => {
    const promise = id
      ? updateSupplierApiMutation({ id, data })
      : createSupplierApiMutation(data)
    return promise.unwrap().then(() => {
      return navigate(-1)
    })
  }

  const onCancel = () => {
    navigate(-1)
  }

  return (
    <Container
      title={
        id
          ? t("Edit Supplier", { ns: "action" })
          : t("Create Supplier", { ns: "action" })
      }
    >
      <Formik
        enableReinitialize={true}
        initialValues={
          supplierApiQueryResponse
            ? supplierApiQueryResponse.data
            : initialValues
        }
        validationSchema={createSupplierValidationSchema}
        validateOnChange={true}
        validateOnBlur={true}
        onSubmit={onSubmit}
      >
        <Form onCancel={onCancel}>
          <Grid container spacing={1}>
            <Grid item xs={9} md={8}>
              <FormikTextInput name="name" label={t("Name")} />
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

export default SupplierForm
