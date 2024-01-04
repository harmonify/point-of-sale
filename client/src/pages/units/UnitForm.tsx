import Container from "@/components/layout/Container/Container"
import { FormikSubmissionHandler } from "@/components/forms"
import Form from "@/components/forms/Form"
import FormikTextInput from "@/components/forms/FormikTextInput"
import {
  useCreateUnitApiMutation,
  useLazyFindOneUnitApiQuery,
  useUpdateUnitApiMutation,
} from "@/services/api"
import { Grid } from "@mui/material"
import { Formik } from "formik"
import { t } from "i18next"
import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

import createUnitValidationSchema, { UnitState } from "./validationSchema"

const initialValues = {
  name: null,
  gender: "NOT_DEFINED",
  address: null,
  phoneNumber: null,
  description: null,
  email: null,
} as unknown as UnitState

const UnitForm: React.FC = () => {
  const navigate = useNavigate()

  const [createUnitApiMutation] = useCreateUnitApiMutation()
  const [updateUnitApiMutation] = useUpdateUnitApiMutation()

  const { id } = useParams()
  const [findOneUnitApiQuery, { data: unitApiQueryResponse }] =
    useLazyFindOneUnitApiQuery({
      refetchOnFocus: true,
      refetchOnReconnect: true,
    })
  useEffect(() => {
    if (!id) return
    findOneUnitApiQuery({ id })
  }, [findOneUnitApiQuery])

  const onSubmit: FormikSubmissionHandler<UnitState> = async (data) => {
    const promise = id
      ? updateUnitApiMutation({ id, data })
      : createUnitApiMutation(data)
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
          ? t("Edit Unit", { ns: "action" })
          : t("Create Unit", { ns: "action" })
      }
    >
      <Formik
        enableReinitialize={true}
        initialValues={
          unitApiQueryResponse ? unitApiQueryResponse.data : initialValues
        }
        validationSchema={createUnitValidationSchema}
        validateOnChange={true}
        validateOnBlur={true}
        onSubmit={onSubmit}
      >
        <Form onCancel={onCancel}>
          <Grid container spacing={1}>
            <Grid item xs={12} md={8}>
              <FormikTextInput name="name" label={t("Name")} />
            </Grid>

            <Grid item xs={12}>
              <FormikTextInput
                name="description"
                label={t("Description")}
                multiline
                minRows={5}
              />
            </Grid>
          </Grid>
        </Form>
      </Formik>
    </Container>
  )
}

export default UnitForm
