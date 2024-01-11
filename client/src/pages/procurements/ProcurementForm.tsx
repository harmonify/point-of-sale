import Form from "@/components/forms/Form"
import FormikNumberInput from "@/components/forms/FormikNumberInput"
import FormikSelectInput from "@/components/forms/FormikSelectInput"
import FormikTextInput from "@/components/forms/FormikTextInput"
import Container from "@/components/layout/Container/Container"
import { APP } from "@/constants"
import {
  useCreateProcurementApiMutation,
  useDeleteProcurementProductApiMutation,
  useFindAllProductApiQuery,
  useFindAllSupplierApiQuery,
  useLazyFindOneProcurementApiQuery,
  useUpdateProcurementApiMutation,
} from "@/services/api"
import { useNavigate, useParams } from "react-router-dom"
import { useConfirmationDialog } from "@/features/dialog"
import { FormikSubmissionHandler } from "@/components/forms"
import { logger } from "@/services/logger"
import {
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useTheme,
} from "@mui/material"
import { Add, Delete } from "@mui/icons-material"
import { ErrorMessage, FieldArray, Formik } from "formik"
import { t } from "i18next"
import React, { useEffect, useMemo, useState } from "react"
import createProcurementValidationSchema, {
  procurementDeliveryStatus,
  procurementDeliveryStatusOptions,
  procurementPaymentStatus,
  procurementPaymentStatusOptions,
  ProcurementProductState,
  ProcurementState,
} from "./validationSchema"
import { removeEmptyStrings } from "@/utils"
import FormikDateInput from "@/components/forms/FormikDatePicker"

const initialValues = {
  supplierId: "",
  name: "",
  description: "",
  invoiceDate: "",
  invoiceNumber: "",
  deliveryStatus: procurementDeliveryStatus.PENDING,
  deliveredAt: "",
  paymentStatus: procurementPaymentStatus.UNPAID,
  payedAt: "",
  procurementProducts: [],
} satisfies Record<
  keyof ProcurementState,
  unknown
> as unknown as ProcurementState

const defaultProcurementProduct = {
  productId: "",
  productUnitId: "",
  price: "",
  quantity: "",
} satisfies Record<
  keyof ProcurementProductState | "productId",
  any
> as unknown as ProcurementProductState

const ProcurementForm: React.FC = () => {
  const theme = useTheme()
  const navigate = useNavigate()

  const [createProcurementApiMutation] = useCreateProcurementApiMutation()
  const [updateProcurementApiMutation] = useUpdateProcurementApiMutation()

  const { data: supplierApiQueryResponse, isLoading: isLoadingFetchSupplier } =
    useFindAllSupplierApiQuery({ all: true })
  const supplierOptions = useMemo(
    () =>
      supplierApiQueryResponse
        ? supplierApiQueryResponse.data.map((supplier) => ({
            label: supplier.name,
            value: supplier.id,
          }))
        : [],
    [supplierApiQueryResponse],
  )

  const { data: productApiQueryResponse, isLoading: isLoadingFetchProduct } =
    useFindAllProductApiQuery({ all: true })
  const productOptions = useMemo(
    () =>
      productApiQueryResponse
        ? productApiQueryResponse.data.map((product) => ({
            label: product.name,
            value: product.id,
          }))
        : [],
    [productApiQueryResponse],
  )
  /** To support when creating procurement products */
  const productMap = useMemo(
    () =>
      new Map(
        productApiQueryResponse
          ? productApiQueryResponse.data.map((product) => [product.id, product])
          : [],
      ),
    [productApiQueryResponse],
  )
  const productUnitToProductMap = useMemo(
    () =>
      new Map(
        productApiQueryResponse
          ? productApiQueryResponse.data.flatMap((product) =>
              product.productUnits.map((pu) => [pu.id, product]),
            )
          : [],
      ),
    [productApiQueryResponse],
  )

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
    const cleanedData = removeEmptyStrings(data)
    const promise = id
      ? updateProcurementApiMutation({ id, data: cleanedData })
      : createProcurementApiMutation(cleanedData)
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
    content: t("Do you want to delete this data?", {
      ns: "message",
      model: t("procurement product"),
    }),
    title: t("Delete Procurement Product", { ns: "action" }),
    confirmText: "Delete",
    variant: "destructive",
    isLoading: isLoadingDeleteProcurementProduct,
  })

  const onClickDelete = (
    row: Partial<Monorepo.Api.Response.ProcurementProductResponseDto>,
    cb: () => void,
  ) => {
    show({
      onConfirm: row.id
        ? async () => {
            await deleteProcurementProductApiMutation({ id: row.id! }).unwrap()
            cb()
          }
        : cb,
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
            ? (procurementApiQueryResponse.data as unknown as ProcurementState)
            : {
                ...initialValues,
                supplierId: supplierOptions[0]
                  ? supplierOptions[0].value
                  : initialValues.supplierId,
              }
        }
        validationSchema={createProcurementValidationSchema}
        validateOnChange={true}
        validateOnBlur={true}
        onSubmit={onSubmit}
      >
        {(formik) => {
          // logger.debug(
          //   `🚀 ~ formik.values ~ ${JSON.stringify(formik.values, null, 2)}`,
          // )
          return (
            <Form onCancel={onCancel}>
              <Typography
                variant="h5"
                style={{ marginBottom: theme.spacing(1) }}
              >
                {t("Procurement Product")}
              </Typography>

              <Grid container spacing={1}>
                <Grid item xs={12} md={6}>
                  <FormikTextInput name="name" label={t("Name")} />
                </Grid>

                <Grid item xs={12} md={6}>
                  <FormikSelectInput
                    name="supplierId"
                    label={t("Supplier Name")}
                    type="number"
                    options={supplierOptions}
                    disabled={isLoadingFetchSupplier}
                  />
                </Grid>

                <Grid item xs={12}>
                  <FormikTextInput
                    name="description"
                    label={t("Description")}
                    multiline
                    minRows={5}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <FormikTextInput
                    name="invoiceNumber"
                    label={t("Invoice Number")}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <FormikDateInput
                    name="invoiceDate"
                    label={t("Invoice Date")}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <FormikSelectInput
                    name="paymentStatus"
                    label={t("Payment Status")}
                    options={procurementPaymentStatusOptions}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <FormikDateInput name="payedAt" label={t("Payed At")} />
                </Grid>

                <Grid item xs={12} md={6}>
                  <FormikSelectInput
                    name="deliveryStatus"
                    label={t("Delivery Status")}
                    options={procurementDeliveryStatusOptions}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <FormikDateInput
                    name="deliveredAt"
                    label={t("Delivered At")}
                  />
                </Grid>
              </Grid>

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
                disabled={isLoadingFetchProduct}
                style={{ marginBottom: theme.spacing(1) }}
              >
                {t("Add Product", { ns: "action" })}
              </Button>

              <FieldArray
                name="procurementProducts"
                render={(arrayHelpers) => (
                  <TableContainer component={Paper} style={{ height: 360 }}>
                    <Table stickyHeader size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell padding="checkbox" align="center">
                            {t("Num")}
                          </TableCell>
                          <TableCell>{t("Product Name")}</TableCell>
                          <TableCell>{t("Unit Name")}</TableCell>
                          <TableCell>{t("Buying Price")}</TableCell>
                          <TableCell>{t("Quantity")}</TableCell>
                          <TableCell align="center">{t("Actions")}</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {(formik.values.procurementProducts.length > 0
                          ? formik.values.procurementProducts
                          : [{}]
                        ).map((_, index) => {
                          const currentRowProcurementProduct:
                            | ProcurementProductState
                            | null
                            | undefined =
                            formik.values.procurementProducts[index]
                          // logger.debug(currentRowProcurementProduct)

                          let matchingProduct:
                            | Monorepo.Api.Response.ProductResponseDto
                            | undefined
                          if (currentRowProcurementProduct) {
                            if (currentRowProcurementProduct.productId) {
                              matchingProduct = productMap.get(
                                parseInt(
                                  currentRowProcurementProduct.productId as unknown as string,
                                ),
                              )
                            }
                            if (
                              !matchingProduct ||
                              currentRowProcurementProduct.productUnitId
                            ) {
                              matchingProduct = productUnitToProductMap.get(
                                parseInt(
                                  currentRowProcurementProduct.productUnitId as unknown as string,
                                ),
                              )
                            }
                          }

                          // logger.debug(
                          //   `🚀 ~ matchingProduct ~ ${JSON.stringify(
                          //     matchingProduct,
                          //     null,
                          //     2,
                          //   )}`,
                          // )

                          return (
                            <TableRow key={index}>
                              <TableCell padding="none" align="center">
                                <Typography>{index + 1}</Typography>
                              </TableCell>

                              <TableCell padding="none">
                                <FormikSelectInput
                                  name={`procurementProducts[${index}].productId`}
                                  size="small"
                                  type="number"
                                  options={productOptions}
                                  enableEmptyValue
                                  InputLabelProps={{ shrink: true }}
                                  // disableErrorText
                                  value={matchingProduct?.id}
                                />
                              </TableCell>

                              <TableCell padding="none">
                                <FormikSelectInput
                                  name={`procurementProducts[${index}].productUnitId`}
                                  size="small"
                                  type="number"
                                  options={
                                    matchingProduct
                                      ? matchingProduct.productUnits.map(
                                          (pu) => ({
                                            label: pu.unit.name,
                                            value: pu.id,
                                          }),
                                        )
                                      : []
                                  }
                                  disabled={!matchingProduct}
                                  enableEmptyValue
                                  InputLabelProps={{ shrink: true }}
                                  // disableErrorText
                                />
                              </TableCell>

                              <TableCell padding="none">
                                <FormikNumberInput
                                  intlConfig={{
                                    locale: APP.defaultLang,
                                    currency: APP.defaultCurrency,
                                  }}
                                  size="small"
                                  name={`procurementProducts[${index}].price`}
                                  InputLabelProps={{ shrink: true }}
                                  // disableErrorText
                                />
                              </TableCell>

                              <TableCell padding="none">
                                <FormikTextInput
                                  type="number"
                                  size="small"
                                  name={`procurementProducts[${index}].quantity`}
                                  InputLabelProps={{ shrink: true }}
                                  // disableErrorText
                                />
                              </TableCell>

                              <TableCell align="center">
                                <Button
                                  size="small"
                                  variant="contained"
                                  color="secondary"
                                  startIcon={<Delete />}
                                  onClick={() => {
                                    onClickDelete(
                                      currentRowProcurementProduct,
                                      () => arrayHelpers.remove(index),
                                    )
                                  }}
                                >
                                  {t("Delete", { ns: "action" })}
                                </Button>
                              </TableCell>
                            </TableRow>
                          )
                        })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
              />
              <ErrorMessage
                name="procurementProducts"
                render={(msg) => {
                  // logger.debug(msg)
                  const strMsg = msg.toString()
                  return strMsg.includes("[object Object]") ? (
                    <Typography color="error">
                      {t("some fields are invalid", { ns: "validation" })}
                    </Typography>
                  ) : (
                    <Typography color="error">{strMsg}</Typography>
                  )
                }}
              />
            </Form>
          )
        }}
      </Formik>
    </Container>
  )
}

export default ProcurementForm
