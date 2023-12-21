import { useAppDispatch } from "@/app/hooks"
import { FormikSubmissionHandler, FormikTextInput } from "@/components/forms"
import { Formik } from "formik"
import { t } from "i18next"
import React from "react"
import { useLoaderData, useNavigate, useParams } from "react-router-dom"

import Container from "../../../components/controls/Container"
import Form from "../../../components/forms/Form"
import {
  useCreateSupplierApiMutation,
  useUpdateSupplierApiMutation,
} from "../../../services/api"
import createSupplierValidationSchema, {
  SupplierState,
} from "./validationSchema"
import { Grid } from "@material-ui/core"

const initialValues = {
  name: "",
  address: "",
  phoneNumber: "",
  description: "",
  email: "",
} as SupplierState

const SupplierForm: React.FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const [createSupplierApiMutation] = useCreateSupplierApiMutation()
  const [updateSupplierApiMutation] = useUpdateSupplierApiMutation()

  const { id } = useParams()
  const supplier = useLoaderData() as
    | Monorepo.Api.Response.SupplierResponseDto
    | undefined

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
        initialValues={supplier || initialValues}
        validationSchema={createSupplierValidationSchema}
        validateOnChange={true}
        validateOnBlur={true}
        onSubmit={onSubmit}
      >
        <Form onCancel={onCancel}>
          <Grid container spacing={1}>
            <Grid item xs={12} md={6}>
              <FormikTextInput name="name" label={t("Name")} margin="normal" />
            </Grid>
            <Grid item xs={12}>
              <FormikTextInput
                name="description"
                label={t("Description")}
                margin="normal"
              />
            </Grid>

            <Grid item xs={12}>
              <FormikTextInput
                name="address"
                label={t("Address")}
                margin="normal"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FormikTextInput
                name="phoneNumber"
                label={t("Phone Number")}
                margin="normal"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FormikTextInput
                name="email"
                label={t("Email")}
                margin="normal"
              />
            </Grid>
          </Grid>
        </Form>
      </Formik>
    </Container>
  )
}

export default SupplierForm
