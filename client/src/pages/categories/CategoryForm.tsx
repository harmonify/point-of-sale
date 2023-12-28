import Container from "@/components/layout/Container/Container"
import { FormikSubmissionHandler } from "@/components/forms"
import FormikTextInput from "@/components/forms/FormikTextInput"
import Form from "@/components/forms/Form"
import {
  useCreateCategoryApiMutation,
  useLazyFindOneCategoryApiQuery,
  useUpdateCategoryApiMutation,
} from "@/services/api"
import { Grid } from "@material-ui/core"
import { Formik } from "formik"
import { t } from "i18next"
import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

import createCategoryValidationSchema, {
  CategoryState,
} from "./validationSchema"

const initialValues = {
  name: null,
  gender: "NOT_DEFINED",
  address: null,
  phoneNumber: null,
  description: null,
  email: null,
} as unknown as CategoryState

const CategoryForm: React.FC = () => {
  const navigate = useNavigate()

  const [createCategoryApiMutation] = useCreateCategoryApiMutation()
  const [updateCategoryApiMutation] = useUpdateCategoryApiMutation()

  const { id } = useParams()
  const [findOneCategoryApiQuery, { data: categoryApiQueryResponse }] =
    useLazyFindOneCategoryApiQuery({
      refetchOnFocus: true,
      refetchOnReconnect: true,
    })
  useEffect(() => {
    if (!id) return
    findOneCategoryApiQuery({ id })
  }, [findOneCategoryApiQuery])

  const onSubmit: FormikSubmissionHandler<CategoryState> = async (data) => {
    const promise = id
      ? updateCategoryApiMutation({ id, data })
      : createCategoryApiMutation(data)
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
          ? t("Edit Category", { ns: "action" })
          : t("Create Category", { ns: "action" })
      }
    >
      <Formik
        enableReinitialize={true}
        initialValues={
          categoryApiQueryResponse
            ? categoryApiQueryResponse.data
            : initialValues
        }
        validationSchema={createCategoryValidationSchema}
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
                minRows={3}
              />
            </Grid>
          </Grid>
        </Form>
      </Formik>
    </Container>
  )
}

export default CategoryForm
