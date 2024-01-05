import { useAppDispatch } from "@/app/hooks"
import FormikSelectInput from "@/components/forms/FormikSelectInput"
import { updateCartCustomer } from "@/features/cart"
import { useFindAllCustomerApiQuery } from "@/services/api"
import { nameInitials } from "@/utils"
import { Avatar, Grid } from "@mui/material"
import { makeStyles } from "@mui/styles"
import { useFormikContext } from "formik"
import { t } from "i18next"
import React, { useMemo, useState } from "react"

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 0,
    paddingLeft: theme.spacing(0.25),
    paddingRight: theme.spacing(0.25),
  },
  avatar: {
    color: "#fff",
    width: theme.spacing(4),
    height: theme.spacing(4),
    fontSize: theme.spacing(2),
    marginRight: theme.spacing(0.5),
    backgroundColor: theme.palette.primary.dark,
  },
}))

const CustomerCell: React.FC = () => {
  const dispatch = useAppDispatch()

  const classes = useStyles()

  const { isLoading: isFetchCustomerLoading, data: customerResponseQuery } =
    useFindAllCustomerApiQuery(
      { all: true },
      {
        // pollingInterval: APP_ENV === "production" ? 60000 : undefined, // TODO: make this configurable
        refetchOnMountOrArgChange: true,
        refetchOnFocus: true,
        refetchOnReconnect: true,
      },
    )
  const customerList = useMemo(() => {
    const result = []
    if (customerResponseQuery) {
      result.push(...customerResponseQuery.data)
    }
    return result
  }, [customerResponseQuery])
  const customerMap = useMemo(
    () => new Map(customerList.map((c) => [c.id, c])),
    [customerList],
  )
  const customerOptions = useMemo(
    () =>
      [{ name: "", id: undefined }, ...customerList].map((c) => ({
        label: c.name,
        value: c.id,
      })),
    [customerList],
  )

  const formik = useFormikContext()
  const selectedCustomer = customerMap.get(
    formik.getFieldProps("customerId").value,
  )

  return (
    <Grid container className={classes.root} alignItems="center">
      <Grid item xs={2}>
        <Avatar alt={selectedCustomer?.name} className={classes.avatar}>
          {nameInitials(selectedCustomer?.name)}
        </Avatar>
      </Grid>
      <Grid item xs={10}>
        <FormikSelectInput
          name="customerId"
          margin="none"
          size="small"
          label={t("Customer")}
          InputLabelProps={{ shrink: true }}
          type="number"
          fullWidth
          options={customerOptions}
          SelectProps={{ native: true }}
          style={{ minWidth: 160 }}
          onChange={(e) => {
            const value = parseInt(e.target.value)
            dispatch(updateCartCustomer(value))
          }}
        />
      </Grid>
    </Grid>
  )
}

export default CustomerCell
