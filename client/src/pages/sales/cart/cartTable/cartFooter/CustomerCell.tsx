import FormikSelectInput from "@/components/forms/FormikSelectInput"
import { useFindAllCustomerApiQuery } from "@/services/api"
import { nameInitials } from "@/utils"
import { Avatar, Grid } from "@mui/material"
import { makeStyles } from "@mui/styles"
import { useFormikContext } from "formik"
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
    return customerResponseQuery ? customerResponseQuery.data : []
  }, [customerResponseQuery])
  const customerMap = useMemo(
    () => new Map(customerList.map((c) => [c.id, c])),
    [customerList],
  )

  const formik = useFormikContext()
  const selectedCustomer = customerMap.get(
    formik.getFieldProps("customerId").value,
  )

  return (
    <Grid container className={classes.root} alignItems="center">
      <Grid item>
        <Avatar alt={selectedCustomer?.name} className={classes.avatar}>
          {nameInitials(selectedCustomer?.name)}
        </Avatar>
      </Grid>
      <Grid item>
        <FormikSelectInput
          name="customerId"
          margin="none"
          size="small"
          type="number"
          options={customerList.map((c) => ({ label: c.name, value: c.id }))}
          enableDefaultValue
          // defaultValue={undefined}
          SelectProps={{ native: true }}
          style={{ minWidth: 160 }}
        />
      </Grid>
    </Grid>
  )
}

export default CustomerCell
