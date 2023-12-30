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
  useCreateProductApiMutation,
  useDeleteProductUnitApiMutation,
  useFindAllCategoryApiQuery,
  useFindAllUnitApiQuery,
  useLazyFindOneProductApiQuery,
  useUpdateProductApiMutation,
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
import React, { useEffect, useMemo, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

import createProductValidationSchema, {
  barcodeTypeOptions,
  barcodeTypes,
  ProductState,
  ProductUnitState,
} from "./validationSchema"

const initialValues = {
  isActive: true,
  name: "",
  description: undefined,
  productUnits: [],
  barcode: undefined,
  barcodeType: barcodeTypes.EAN_8,
  categoryId: 1,
} as unknown as ProductState

const defaultProductUnit = {
  unitId: undefined,
  price: undefined,
} as unknown as ProductUnitState

const ProductForm: React.FC = () => {
  const theme = useTheme()
  const navigate = useNavigate()

  const [createProductApiMutation] = useCreateProductApiMutation()
  const [updateProductApiMutation] = useUpdateProductApiMutation()

  const { data: categoryApiQueryResponse, isLoading: isLoadingFetchCategory } =
    useFindAllCategoryApiQuery({ all: true })

  const categoryOptions = useMemo(
    () =>
      categoryApiQueryResponse
        ? categoryApiQueryResponse.data.map((category) => ({
            label: category.name,
            value: category.id,
          }))
        : [],
    [categoryApiQueryResponse],
  )

  const { data: unitApiQueryResponse, isLoading: isLoadingFetchUnit } =
    useFindAllUnitApiQuery({ all: true })
  const unitOptions = useMemo(
    () =>
      unitApiQueryResponse
        ? unitApiQueryResponse.data.map((unit) => ({
            label: unit.name,
            value: unit.id,
          }))
        : [],
    [unitApiQueryResponse],
  )

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

  const [
    deleteProductUnitApiMutation,
    { isLoading: isLoadingDeleteProductUnit },
  ] = useDeleteProductUnitApiMutation()

  const { show } = useConfirmationDialog({
    content: `${t(
      "Deleting this product unit will remove the related procured stock. Do you want to proceed?",
      {
        ns: "message",
      },
    )}`,
    title: t("Delete Product Unit", { ns: "action" }),
    confirmText: "Delete",
    variant: "destructive",
    isLoading: isLoadingDeleteProductUnit,
  })

  const onClickDelete = (
    row: Partial<Monorepo.Api.Response.ProductUnitResponseDto>,
    cb: () => void,
  ) => {
    show({
      onConfirm: row.id
        ? async () => {
            await deleteProductUnitApiMutation({ id: row.id! }).unwrap()
            cb()
          }
        : cb,
    })
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
            ? (productApiQueryResponse.data as ProductState)
            : initialValues
        }
        validationSchema={createProductValidationSchema}
        validateOnChange={true}
        validateOnBlur={true}
        onSubmit={onSubmit}
      >
        {(formik) => (
          <Form onCancel={onCancel}>
            <Typography variant="h5" style={{ marginBottom: theme.spacing(1) }}>
              {t("Product")}
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
                  minRows={5}
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
              {t("Product Unit")}
            </Typography>

            <Button
              variant="outlined"
              color={"primary"}
              size="small"
              onClick={() =>
                formik.setValues({
                  ...formik.values,
                  productUnits: [
                    ...formik.values.productUnits,
                    defaultProductUnit as ProductUnitState,
                  ],
                })
              }
              startIcon={<Add />}
              disabled={isLoadingFetchUnit}
              style={{ marginBottom: theme.spacing(1) }}
            >
              {t("Add Product Unit", { ns: "action" })}
            </Button>

            <FieldArray
              name="productUnits"
              render={(arrayHelpers) => (
                <Grid container spacing={1}>
                  {formik.values.productUnits.map((productUnit, index) => (
                    <Grid item xs={12} md={4} key={index}>
                      <Card variant="outlined" style={{ outlineColor: "blue" }}>
                        <CardContent>
                          <Typography variant="h6">
                            {`${t("Available Quantity")}: ${
                              (productApiQueryResponse &&
                                productApiQueryResponse.data.productUnits.find(
                                  (existingPu) =>
                                    existingPu.unitId === productUnit.unitId,
                                )?.availableQuantity) ||
                              0
                            }`}
                          </Typography>
                          <FormikSelectInput
                            name={`productUnits[${index}].unitId`}
                            label={t("Unit Name")}
                            type="number"
                            options={unitOptions}
                            enableDefaultValue
                            InputLabelProps={{ shrink: true }}
                          />
                          {/* <FormikTextInput
                            label={t("Price")}
                            type="number"
                            name={`productUnits[${index}].price`}
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
                            label={t("Selling Price")}
                            name={`productUnits[${index}].price`}
                            InputLabelProps={{ shrink: true }}
                          />
                        </CardContent>
                        <CardActions>
                          <Button
                            size="small"
                            variant="contained"
                            color="secondary"
                            startIcon={<Delete />}
                            onClick={() => {
                              onClickDelete(productUnit, () =>
                                arrayHelpers.remove(index),
                              )
                            }}
                          >
                            {t("Delete", { ns: "action" })}
                          </Button>
                        </CardActions>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              )}
            />
            <ErrorMessage
              name="productUnits"
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

export default ProductForm
