import { useAppDispatch } from "@/app/hooks"
import Container from "@/components/layout/Container/Container"
import { FormikSubmissionHandler } from "@/components/forms"
import Form from "@/components/forms/Form"
import FormikNumberInput from "@/components/forms/FormikNumberInput"
import FormikSelectInput from "@/components/forms/FormikSelectInput"
import FormikTextInput from "@/components/forms/FormikTextInput"
import { APP_DEFAULT_CURRENCY, APP_DEFAULT_LANG } from "@/environment"
import { useConfirmationDialog } from "@/features/dialog"
import {
  useCreateProcurementApiMutation,
  useDeleteProcurementProductApiMutation,
  useFindAllCategoryApiQuery,
  useFindAllUnitApiQuery,
  useLazyFindOneProcurementApiQuery,
  useUpdateProcurementApiMutation,
} from "@/services/api"
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
  useTheme,
} from "@material-ui/core"
import { Add, Delete } from "@material-ui/icons"
import { ErrorMessage, FieldArray, Formik } from "formik"
import { t } from "i18next"
import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

import createProcurementValidationSchema, {
  barcodeTypeOptions,
  barcodeTypes,
  ProcurementState,
  ProcurementProductState,
} from "./validationSchema"

const initialValues = {
  isActive: true,
  name: "",
  description: undefined,
  procurementProducts: [],
  barcode: undefined,
  barcodeType: barcodeTypes.EAN_8,
  categoryId: 1,
} as unknown as ProcurementState

const defaultProcurementProduct = {
  unitId: undefined,
  price: undefined,
} as unknown as ProcurementProductState

const ProcurementForm: React.FC = () => {
  const theme = useTheme()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const [createProcurementApiMutation] = useCreateProcurementApiMutation()
  const [updateProcurementApiMutation] = useUpdateProcurementApiMutation()

  const { data: categoryApiQueryResponse, isLoading: isLoadingFetchCategory } =
    useFindAllCategoryApiQuery({ all: true })
  const categoryOptions = categoryApiQueryResponse
    ? categoryApiQueryResponse.data.map((category) => ({
        label: category.name,
        value: category.id,
      }))
    : []

  const { data: unitApiQueryResponse, isLoading: isLoadingFetchUnit } =
    useFindAllUnitApiQuery({ all: true })
  const unitOptions = unitApiQueryResponse
    ? unitApiQueryResponse.data.map((unit) => ({
        label: unit.name,
        value: unit.id,
      }))
    : []

  const { id } = useParams()
  const [findOneProcurementApiQuery, { data: procurementApiQueryResponse }] =
    useLazyFindOneProcurementApiQuery({
      refetchOnFocus: true,
      refetchOnReconnect: true,
    })

  useEffect(() => {
    if (!id) return
    findOneProcurementApiQuery({ id })
  }, [findOneProcurementApiQuery])

  const onSubmit: FormikSubmissionHandler<ProcurementState> = async (data) => {
    const promise = id
      ? updateProcurementApiMutation({ id, data })
      : createProcurementApiMutation(data)
    return promise.unwrap().then(() => {
      return navigate(`/procurements`)
    })
  }

  const onCancel = () => {
    navigate(-1)
  }

  const [
    deleteProcurementProductApiMutation,
    { isLoading: isLoadingDeleteProcurementProduct },
  ] = useDeleteProcurementProductApiMutation()

  const { show } = useConfirmationDialog({
    content: `${t(
      "Deleting this procurement product will remove the related procured stock. Do you want to proceed?",
      {
        ns: "message",
      },
    )}`,
    title: t("Delete Procurement Product", { ns: "action" }),
    confirmText: "Delete",
    variant: "destructive",
    isLoading: isLoadingDeleteProcurementProduct,
  })

  const onClickDelete = (
    row: Partial<Monorepo.Api.Response.ProcurementProductResponseDto>,
    cb: () => void,
  ) => {
    if (!row.id) {
      return cb()
    }
    show({
      onConfirm: async () => {
        await deleteProcurementProductApiMutation({ id: row.id! }).unwrap()
        cb()
      },
    })
  }

  return (
    <Container
      title={
        id
          ? t("Edit Procurement", { ns: "action" })
          : t("Create Procurement", { ns: "action" })
      }
    >
      <Formik
        enableReinitialize={true}
        initialValues={
          procurementApiQueryResponse
            ? (procurementApiQueryResponse.data as ProcurementState)
            : initialValues
        }
        validationSchema={createProcurementValidationSchema}
        validateOnChange={true}
        validateOnBlur={true}
        onSubmit={onSubmit}
      >
        {(formik) => (
          <Form onCancel={onCancel}>
            <Typography variant="h5" style={{ marginBottom: theme.spacing(1) }}>
              {t("Procurement")}
            </Typography>

            <Grid
              container
              spacing={1}
              style={{ marginBottom: theme.spacing(3) }}
            >
              <Grid item xs={12} md={6}>
                <FormikTextInput
                  name="name"
                  label={t("Name")}
                  style={{ marginTop: 0 }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <FormikSelectInput
                  name="categoryId"
                  label={t("Category Name")}
                  type="number"
                  options={categoryOptions}
                  style={{ marginTop: 0 }}
                  disabled={isLoadingFetchCategory}
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

              <Grid item xs={12} md={8}>
                <FormikTextInput name="barcode" label={t("Barcode")} />
              </Grid>

              <Grid item xs={12} md={4}>
                <FormikSelectInput
                  name="barcodeType"
                  label={t("Barcode Type")}
                  options={barcodeTypeOptions}
                />
              </Grid>
            </Grid>

            <Typography variant="h5" style={{ marginBottom: theme.spacing(1) }}>
              {t("Procurement Product")}
            </Typography>

            <Button
              variant="outlined"
              color={"primary"}
              size="small"
              onClick={() =>
                formik.setValues({
                  ...formik.values,
                  procurementProducts: [
                    ...formik.values.procurementProducts,
                    defaultProcurementProduct as ProcurementProductState,
                  ],
                })
              }
              startIcon={<Add />}
              disabled={isLoadingFetchUnit}
              style={{ marginBottom: theme.spacing(1) }}
            >
              {t("Add Procurement Product", { ns: "action" })}
            </Button>

            <FieldArray
              name="procurementProducts"
              render={(arrayHelpers) => (
                <Grid container spacing={1}>
                  {formik.values.procurementProducts.map(
                    (procurementProduct, index) => (
                      <Grid item xs={12} md={6} key={index}>
                        <Card
                          variant="outlined"
                          style={{ outlineColor: "blue" }}
                        >
                          <CardContent>
                            <Typography variant="h6">
                              {`${t("Available Quantity")}: ${
                                (procurementApiQueryResponse &&
                                  procurementApiQueryResponse.data.procurementProducts.find(
                                    (existingPu) =>
                                      existingPu.unitId ===
                                      procurementProduct.unitId,
                                  )?.availableQuantity) ||
                                0
                              }`}
                            </Typography>
                            <FormikSelectInput
                              name={`procurementProducts[${index}].unitId`}
                              label={t("Unit Name")}
                              type="number"
                              options={unitOptions}
                              enableDefaultValue
                              InputLabelProps={{ shrink: true }}
                            />
                            {/* <FormikTextInput
                            label={t("Price")}
                            type="number"
                            name={`procurementProducts[${index}].price`}
                            fullWidth
                            margin="normal"
                            InputLabelProps={{ shrink: true }}
                            helperText={t("Define the selling price", {
                              ns: "message",
                            })}
                          /> */}
                            <FormikNumberInput
                              intlConfig={{
                                locale: APP_DEFAULT_LANG,
                                currency: APP_DEFAULT_CURRENCY,
                              }}
                              label={t("Price")}
                              name={`procurementProducts[${index}].price`}
                              InputLabelProps={{ shrink: true }}
                              helperText={t("Define the selling price", {
                                ns: "message",
                              })}
                            />
                          </CardContent>
                          <CardActions>
                            <Button
                              size="small"
                              variant="contained"
                              color="secondary"
                              startIcon={<Delete />}
                              onClick={() => {
                                onClickDelete(procurementProduct, () =>
                                  arrayHelpers.remove(index),
                                )
                              }}
                            >
                              {t("Delete", { ns: "action" })}
                            </Button>
                          </CardActions>
                        </Card>
                      </Grid>
                    ),
                  )}
                </Grid>
              )}
            />
            <ErrorMessage
              name="procurementProducts"
              render={(msg) => {
                // Don't display nested error messages
                return (
                  msg.toString().includes("[object Object]") || (
                    <Typography color="error">{msg.toString()}</Typography>
                  )
                )
              }}
            />
          </Form>
        )}
      </Formik>
    </Container>
  )
}

export default ProcurementForm
