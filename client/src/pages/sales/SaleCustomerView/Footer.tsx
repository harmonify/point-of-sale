import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableRow,
  Typography,
  useTheme,
} from "@mui/material"
import { viewTheme } from "./SaleCustomerView"
import { t } from "i18next"
import { formatRupiah } from "@/utils"

export const Footer: React.FC<{
  totalQty: number
  discountTotal: number
  total: number
  paid: number
  change: number
}> = ({ totalQty, discountTotal, total, paid, change }) => {
  const theme = useTheme()

  return (
    <Table>
      <TableBody
        sx={{
          backgroundColor: viewTheme.backgroundColor,
          color: viewTheme.color,
          minWidth: "100vh",
          "& .MuiTableCell-root": {
            borderBototm: `80px solid ${theme.palette.grey[500]}`,
            padding: theme.spacing(1.15),
          },
        }}
      >
        {/* Total Qty */}
        {/* <TableRow
          sx={{
            minWidth: "100vh",
          }}
        >
          <TableCell>
            <Typography variant="h5" color={viewTheme.color} align="right">
              {t("Total Qty")}
            </Typography>
          </TableCell>
          <TableCell align="right">
            <Typography color={viewTheme.color} variant="h4">{totalQty}</Typography>
          </TableCell>
        </TableRow> */}

        {/* Discount on Total */}
        <TableRow sx={{ backgroundColor: theme.palette.grey[50] }}>
          <TableCell>
            <Typography variant="h5" color={viewTheme.color} align="right">
              {t("Discount on Total")}
            </Typography>
          </TableCell>
          <TableCell align="right">
            <Typography color={viewTheme.color} variant="h4" fontSize="36px">
              {formatRupiah(discountTotal || 0)}
            </Typography>
          </TableCell>
        </TableRow>

        {/* Total */}
        <TableRow sx={{ backgroundColor: theme.palette.grey[50] }}>
          <TableCell>
            <Typography
              variant="h3"
              color={viewTheme.color}
              align="right"
              lineHeight={1.5}
            >
              {t("Total")}
            </Typography>
          </TableCell>
          <TableCell align="right">
            <Typography color={viewTheme.color} variant="h1" fontSize="48px">
              {formatRupiah(total || 0)}
            </Typography>
          </TableCell>
        </TableRow>

        {/* Paid */}
        <TableRow sx={{ backgroundColor: theme.palette.grey[50] }}>
          <TableCell>
            <Typography
              variant="h3"
              color={viewTheme.color}
              align="right"
              lineHeight={1.5}
            >
              {t("Cash")}
            </Typography>
          </TableCell>
          <TableCell align="right">
            <Typography color={viewTheme.color} variant="h2" fontSize="48px">
              {formatRupiah(paid || 0)}
            </Typography>
          </TableCell>
        </TableRow>

        {/* Change */}
        <TableRow sx={{ backgroundColor: theme.palette.grey[50] }}>
          <TableCell>
            <Typography
              variant="h3"
              color={viewTheme.color}
              align="right"
              lineHeight={1.5}
            >
              {t("Change")}
            </Typography>
          </TableCell>
          <TableCell align="right">
            <Typography
              fontSize="48px"
              color={viewTheme.color}
              variant="h2"
              style={{
                color:
                  change === 0
                    ? viewTheme.color
                    : change > 0
                    ? theme.palette.success.main
                    : theme.palette.error.main,
              }}
            >
              {formatRupiah(change || 0)}
            </Typography>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}
