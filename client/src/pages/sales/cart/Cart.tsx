import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { FormikSubmissionHandler } from "@/components/forms"
import Form from "@/components/forms/Form"
import { CartState, selectCart } from "@/features/cart"
import { useCreateSaleApiMutation } from "@/services/api"
import { Box, Button } from "@material-ui/core"
import { createStyles, makeStyles } from "@material-ui/core/styles"
import { Save } from "@material-ui/icons"
import { Formik } from "formik"
import { t } from "i18next"
import React, { useMemo } from "react"

import CartTable from "./cartTable/CartTable"
import { buildCreateSaleRequestDto } from "./util"
import createSaleValidationSchema from "./validationSchema"

const useStyles = makeStyles((theme) =>
  createStyles({
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
  }),
)

const Cart: React.FC = (props) => {
  const classes = useStyles()

  const cart = useAppSelector(selectCart)
  const cartItemsLength = Object.keys(cart.items).length

  const [createSaleApiMutation, { isLoading }] = useCreateSaleApiMutation()

  const onSubmit: FormikSubmissionHandler<CartState> = async (data) => {
    const dto = buildCreateSaleRequestDto(data)
    return createSaleApiMutation(dto).unwrap()
  }

  return (
    <Box className={classes.root}>
      <Formik
        enableReinitialize={true}
        initialValues={cart satisfies CartState as CartState}
        validationSchema={createSaleValidationSchema}
        validateOnChange={true}
        validateOnBlur={true}
        onSubmit={onSubmit}
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
