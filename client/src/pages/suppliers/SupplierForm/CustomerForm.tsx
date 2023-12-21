import { useAppDispatch } from "@/app/hooks"
import { FormikSubmissionHandler, FormikTextInput } from "@/components/forms"
import { Formik } from "formik"
import { t } from "i18next"
import React from "react"
import { useLoaderData, useNavigate, useParams } from "react-router-dom"

import Container from "../../../components/controls/Container"
import Form from "../../../components/forms/Form"
import {
  useCreatesupplierApiMutation,
  useUpdatesupplierApiMutation,
} from "../../../services/api"
import createsupplierValidationSchema from "./validationSchema"

export interface supplierState {
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
} as supplierState

const supplierForm: React.FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const [createsupplierApiMutation] = useCreatesupplierApiMutation()
  const [updatesupplierApiMutation] = useUpdatesupplierApiMutation()

  const { id } = useParams()
  const supplier = useLoaderData() as
    | Monorepo.Api.Response.supplierResponseDto
    | undefined

  const onSubmit: FormikSubmissionHandler<supplierState> = async (data) => {
    const promise = id
      ? updatesupplierApiMutation({ id, data })
      : createsupplierApiMutation(data)
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
          ? t("Edit supplier", { ns: "action" })
          : t("Create supplier", { ns: "action" })
      }
    >
      <Formik
        initialValues={supplier || initialValues}
        validationSchema={createsupplierValidationSchema}
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
