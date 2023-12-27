import Container from "@/components/controls/layout/Container/Container"
import { FormikSubmissionHandler, FormikTextInput } from "@/components/forms"
import Form from "@/components/forms/Form"
import {
  useCreateProductApiMutation,
  useLazyFindOneProductApiQuery,
  useUpdateProductApiMutation,
} from "@/services/api"
import { Grid } from "@material-ui/core"
import { Formik } from "formik"
import { t } from "i18next"
import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

import createProductValidationSchema, {
  ProductState,
} from "./validationSchema"

const initialValues = {
  name: null,
  gender: "NOT_DEFINED",
  address: null,
  phoneNumber: null,
  description: null,
  email: null,
} as unknown as ProductState

const ProductForm: React.FC = () => {
  const navigate = useNavigate()

  const [createProductApiMutation] = useCreateProductApiMutation()
  const [updateProductApiMutation] = useUpdateProductApiMutation()

  const { id } = useParams()
  const [findOneProductApiQuery, { data: productApiQueryResponse }] =
    useLazyFindOneProductApiQuery({
      refetchOnFocus: true,
      refetchOnReconnect: true,
    })
  useEffect(() => {
    if (!id) return
    findOneProductApiQuery({ id })
  }, [findOneProductApiQuery])

  const onSubmit: FormikSubmissionHandler<ProductState> = async (data) => {
    const promise = id
      ? updateProductApiMutation({ id, data })
      : createProductApiMutation(data)
    return promise.unwrap().then(() => {
      return navigate(`/products`)
    })
  }

  const onCancel = () => {
    navigate(-1)
  }

  return (
    <Container
      title={
        id
          ? t("Edit Product", { ns: "action" })
          : t("Create Product", { ns: "action" })
      }
    >
      <Formik
        enableReinitialize={true}
        initialValues={
          productApiQueryResponse
            ? productApiQueryResponse.data
            : initialValues
        }
        validationSchema={createProductValidationSchema}
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

export default ProductForm
