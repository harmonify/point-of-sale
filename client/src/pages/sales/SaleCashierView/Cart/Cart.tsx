import { useAppDispatch, useAppSelector } from "@/app/hooks"
import Form from "@/components/forms/Form"
import {
  CartState,
  emptyCart,
  selectCart,
  selectCartSessionId,
} from "@/features/cart"
import { useConfirmationDialog } from "@/features/dialog"
import { showSnackbar } from "@/features/snackbar"
import { useSocketIO } from "@/hooks/useSocketIO"
import { useCreateSaleApiMutation } from "@/services/api"
import { ArrowRightAlt, Save } from "@mui/icons-material"
import { Box, Button } from "@mui/material"
import { makeStyles } from "@mui/styles"
import { Formik, FormikProps } from "formik"
import { t } from "i18next"
import React, { useEffect, useMemo, useState } from "react"

import CartTable from "./cartTable/CartTable"
import { buildCreateSaleRequestDto } from "./util"
import createSaleValidationSchema from "./validationSchema"

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    "& .MuiTableCell-root": {
      border: `1px solid ${theme.palette.divider}`,
    },
    "& .MuiTypography-h6": {
      fontWeight: 500,
    },
    "& .MuiTypography-body1": {
      fontSize: "14px",
    },
    "& .MuiInputBase-input": {
      // fontSize: "14px",
      fontWeight: 600,
    },
  },
}))

const Cart: React.FC = (props) => {
  const dispatch = useAppDispatch()
  const classes = useStyles()

  const cart = useAppSelector(selectCart)
  const cartItemsLength = Object.keys(cart.items).length

  const [createSaleApiMutation, { isLoading }] = useCreateSaleApiMutation()

  const { socket, isConnected } = useSocketIO()
  const sessionId = useAppSelector(selectCartSessionId)
  // logger.debug(`Cashier view websocket connection status: ${isConnected}`)
  useEffect(() => {
    // TODO: might need to debounce this for performance
    socket.emit(`cart-update`, { sessionId, data: cart })
  }, [cart])

  // TODO: fix this, currently it bypass formik validation, the required property in the validation schema `saleProducts` is stored differently in the cart state property `items`
  const onConfirmSubmit = async (formik: FormikProps<CartState>) => {
    const data = formik.values

    const errors = await formik.validateForm()
    if (errors.change) {
      return dispatch(
        showSnackbar({
          message: t("The change amount must not be less than 0", {
            ns: "validation",
          }),
          variant: "error",
        }),
      )
    }

    const dto = buildCreateSaleRequestDto(data)
    await createSaleApiMutation(dto)
      .unwrap()
      .then((response) => {
        // formik.resetForm()
        dispatch(emptyCart())
      })
  }

  const { show } = useConfirmationDialog({
    title: t("Confirm Transaction Data", { ns: "action" }),
    content: `${t(
      "Do you want to proceed to save this sale transaction? You will be able to print the invoice after the transaction is saved.",
      {
        ns: "message",
      },
    )}`,
    confirmText: t("Save", { ns: "action" }),
    variant: "neutral",
  })

  const onClickSubmit = (formik: FormikProps<CartState>) => {
    show({
      onConfirm: () => onConfirmSubmit(formik),
    })
  }

  return (
    <Box className={classes.root}>
      <Button
        variant="contained"
        href={`/sales/view?session=${sessionId}`}
        target="_blank"
        sx={{ marginBottom: 3 }}
        endIcon={<ArrowRightAlt />}
        onClick={() => {
          // TODO: Race condition is possible, maybe only emit everytime we receive event that a new client is connected?
          setTimeout(() => {
            socket.emit(`cart-update`, { sessionId, data: cart })
          }, 2500)
        }}
      >
        {t("Open Customer View", { ns: "action" })}
      </Button>

      <Formik
        enableReinitialize={true}
        initialValues={cart satisfies CartState as CartState}
        validationSchema={createSaleValidationSchema}
        validateOnChange={true}
        validateOnBlur={true}
      >
        {(formik) => (
          <>
            <Form disableSubmitButton>
              <CartTable />
              <Button
                type="submit"
                startIcon={<Save />}
                color="primary"
                variant="contained"
                disabled={cartItemsLength === 0}
                onClick={() => onClickSubmit(formik)}
                fullWidth
              >
                {t("Save", { ns: "action" })}
              </Button>
            </Form>
          </>
        )}
      </Formik>
    </Box>
  )
}

export default Cart
