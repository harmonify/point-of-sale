import { useAppDispatch } from "@/app/hooks"
import { FormikSubmissionHandler, FormikTextInput } from "@/components/forms"
import { Formik } from "formik"
import { t } from "i18next"
import React, { useEffect, useState } from "react"
import { useLoaderData, useNavigate, useParams } from "react-router-dom"

import Container from "../../../components/controls/layout/Container/Container"
import Form from "../../../components/forms/Form"
import {
  useCreateSupplierApiMutation,
  useFindOneSupplierApiQuery,
  useLazyFindOneSupplierApiQuery,
  useUpdateSupplierApiMutation,
} from "../../../services/api"
import createSupplierValidationSchema, {
  SupplierState,
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
      return navigate(`/suppliers`)
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

export default SupplierForm
