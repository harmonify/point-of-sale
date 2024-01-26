import { APP } from "@/constants"
import { formatRupiah } from "@/utils"
import { isNumber } from "@/utils/number"
import { formatDateTimeToLocale } from "@/utils/string"
import {
  Box,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material"
import { makeStyles, useTheme } from "@mui/styles"
import { t } from "i18next"
import { DateTime } from "luxon"
import React, { forwardRef } from "react"
import { a4HeightInPx, a4WidthInPx } from "./util"
import { invoiceDataMock } from "./mock"

const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.common.black,
    backgroundColor: theme.palette.grey[100],
    minWidth: a4WidthInPx,
    minHeight: a4HeightInPx,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    paddingLeft: theme.spacing(6),
    paddingRight: theme.spacing(6),
    "& .MuiTable-root": {
      border: `1px solid black`,
    },
    "& .MuiTableCell-root": {
      border: `1px solid black`,
    },
  },
}))

export interface OrderInvoicePDFProps {
  data: Monorepo.Api.Response.SaleResponseDto
}

const OrderInvoicePDF = forwardRef<HTMLElement, OrderInvoicePDFProps>(
  (props, ref) => {
    const theme = useTheme()
    const classes = useStyles()

    const { data: invoiceData } = props
    // const invoiceData = invoiceDataMock

    return (
      <Box className={classes.root} ref={ref} id="invoice-container">
        <Table sx={{ marginBottom: theme.spacing(2) }} size="small">
          <TableHead>
            <TableRow>
              <TableCell colSpan={3} size="medium">
                <Typography variant="h4" color="black">
                  {APP.name}
                </Typography>
                <Typography color="black">{APP.address}</Typography>
                <Typography color="black">
                  {`${APP.city} ${APP.zipCode}`}
                </Typography>
                <Typography color="black">{APP.phone}</Typography>
              </TableCell>

              <TableCell colSpan={3} size="medium">
                <Box display="flex">
                  <Typography variant="h6" color="black" align="left">
                    {t("Invoice Number")}:
                  </Typography>
                  <Typography color="black" align="right" flexGrow={1}>
                    {invoiceData.invoiceNumber}
                  </Typography>
                </Box>

                <Box display="flex">
                  <Typography variant="h6" color="black" align="left">
                    {t("Date")}:
                  </Typography>
                  <Typography color="black" align="right" flexGrow={1}>
                    {formatDateTimeToLocale(
                      typeof invoiceData.createdAt === "string"
                        ? DateTime.fromISO(invoiceData.createdAt)
                        : DateTime.fromJSDate(invoiceData.createdAt),
                      {
                        second: undefined,
                      },
                    )}
                  </Typography>
                </Box>

                <Box display="flex">
                  <Typography variant="h6" color="black" align="left">
                    {t("Cashier")}:
                  </Typography>
                  <Typography color="black" align="right" flexGrow={1}>
                    {invoiceData.createdBy.name || "-"}
                  </Typography>
                </Box>

                {/* <Box display="flex">
                  {!invoiceData.customer ? null : (
                    <>
                      <Typography variant="h6" color="black" align="left">
                        {t("Customer")}:
                      </Typography>
                      <Typography color="black" align="right" flexGrow={1}>
                        {invoiceData.customer?.name || "-"}
                      </Typography>
                    </>
                  )}
                </Box> */}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell>
                <Typography variant="h6" color="black" align="center">
                  {t("Num")}
                </Typography>
              </TableCell>

              <TableCell sx={{ width: "50%" }}>
                <Typography variant="h6" color="black" align="center">
                  {t("Product Name")}
                </Typography>
              </TableCell>

              <TableCell align="right">
                <Typography variant="h6" color="black" align="center">
                  {t("Quantity")}
                </Typography>
              </TableCell>

              <TableCell align="right" sx={{ width: "15%" }}>
                <Typography variant="h6" color="black" align="center">
                  {t("Price")}
                </Typography>
              </TableCell>

              <TableCell align="right" sx={{ width: "15%" }}>
                <Typography variant="h6" color="black" align="center">
                  {t("Discount")}
                </Typography>
              </TableCell>

              <TableCell align="right" sx={{ width: "20%" }}>
                <Typography variant="h6" color="black" align="center">
                  {t("Subtotal")}
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {invoiceData.saleProducts.map((saleProduct, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Typography
                    color="black"
                    fontSize={theme.typography.body1.fontSize}
                  >
                    {index + 1}
                  </Typography>
                </TableCell>

                <TableCell>
                  <Typography
                    color="black"
                    fontSize={theme.typography.body1.fontSize}
                  >
                    {saleProduct.productName}
                  </Typography>
                </TableCell>

                <TableCell>
                  <Typography
                    fontSize={theme.typography.body1.fontSize}
                    color="black"
                  >
                    {saleProduct.quantity} {saleProduct.unitName}
                  </Typography>
                </TableCell>

                <TableCell>
                  <Typography
                    fontSize={theme.typography.body1.fontSize}
                    color="black"
                  >
                    {formatRupiah(saleProduct.salePrice)}
                  </Typography>
                </TableCell>

                <TableCell>
                  <Typography
                    fontSize={theme.typography.body1.fontSize}
                    color="black"
                  >
                    {formatRupiah(
                      isNumber(saleProduct.discount) && saleProduct.discount > 0
                        ? saleProduct.discount
                        : 0,
                    )}
                  </Typography>
                </TableCell>

                <TableCell align="right">
                  <Typography color="black">
                    {formatRupiah(saleProduct.total)}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={5} align="right">
                <Typography variant="h6" color="black">
                  {t("Subtotal")}
                </Typography>
              </TableCell>

              <TableCell align="right">
                <Typography color="black">
                  {formatRupiah(invoiceData.subTotal)}
                </Typography>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell colSpan={5} align="right">
                <Typography variant="h6" color="black">
                  {t("Discount on Total")}
                </Typography>
              </TableCell>

              <TableCell align="right">
                <Typography color="black">
                  {formatRupiah(invoiceData.discountTotal)}
                </Typography>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell colSpan={5} align="right">
                <Typography variant="h6" color="black">
                  {t("Total")}
                </Typography>
              </TableCell>

              <TableCell align="right">
                <Typography color="black">
                  {formatRupiah(invoiceData.total)}
                </Typography>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell colSpan={5} align="right">
                <Typography variant="h6" color="black">
                  {t("Cash")}
                </Typography>
              </TableCell>

              <TableCell align="right">
                <Typography color="black">
                  {formatRupiah(invoiceData.paid)}
                </Typography>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell colSpan={5} align="right">
                <Typography variant="h6" color="black">
                  {t("Change")}
                </Typography>
              </TableCell>

              <TableCell align="right">
                <Typography color="black">
                  {formatRupiah(invoiceData.change)}
                </Typography>
              </TableCell>
            </TableRow>

            {!(invoiceData.isNoteVisible && invoiceData.note) ? null : (
              <TableRow>
                <TableCell colSpan={9999}>
                  <Typography color="black">{invoiceData.note}</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableFooter>
        </Table>

        <Grid
          container
          justifyContent="end"
          alignContent="center"
          alignItems="center"
        >
          {/* <Grid item xs={6}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  width: theme.spacing(30),
                }}
              >
                <Typography color="black" align="center">
                  {`( ${
                    invoiceData.customer
                      ? invoiceData.customer.name
                      : t("Customer")
                  } )`}
                </Typography>
                <Box
                  sx={{
                    borderBottom: "3px solid black",
                    height: theme.spacing(14),
                    width: theme.spacing(30),
                    marginBottom: theme.spacing(1),
                  }}
                ></Box>
              </Box>
            </Box>
          </Grid> */}

          <Grid item xs={6}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "end",
              }}
            >
              <Box
                sx={{
                  width: theme.spacing(30),
                }}
              >
                <Typography color="black" align="center">
                  {t("Best Regards")},
                </Typography>
                <Box
                  sx={{
                    borderBottom: "3px solid black",
                    height: theme.spacing(14),
                    width: theme.spacing(30),
                    marginBottom: theme.spacing(1),
                  }}
                ></Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    )
  },
)

export default OrderInvoicePDF
