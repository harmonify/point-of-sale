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
import createSupplierValidationSchema from "./validationSchema"

export interface SupplierState {
  name: string
  phoneNumber: string
  email: string
  description?: string
  address: string | undefined
}

const initialValues = {
  name: "",
  address: "",
  phoneNumber: "",
  description: "",
  email: "",
} as SupplierState

const supplierForm: React.FC = () => {
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
    // const isDirty = id
    //   ? !equal(data, supplier)
    //   : !equal(initialValues, supplier)
    // if (isDirty === true) {
    // TODO: show confirmation dialog
    // }
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
          <FormikTextInput
            name="name"
            label={t("Name", { ns: "field" })}
            margin="normal"
            fullWidth
          />
          <FormikTextInput
            name="description"
            label={t("Description", { ns: "field" })}
            margin="normal"
            fullWidth
            multiline={true}
            minRows={3}
          />
          <FormikTextInput
            name="address"
            label={t("Address", { ns: "field" })}
            margin="normal"
          />
          <FormikTextInput
            name="phoneNumber"
            label={t("Phone Number", { ns: "field" })}
            margin="normal"
          />
          <FormikTextInput
            name="email"
            label={t("Email", { ns: "field" })}
            margin="normal"
          />
        </Form>
      </Formik>
    </Container>
  )
}

export default supplierForm
