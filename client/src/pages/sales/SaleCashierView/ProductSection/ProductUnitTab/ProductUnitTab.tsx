import TextInput from "@/components/forms/TextInput"
import { formatRupiah } from "@/utils"
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from "@mui/material"
import { makeStyles } from "@mui/styles"
import { Add } from "@mui/icons-material"
import { t } from "i18next"
import { ModifiedProductUnitType } from "../ProductSection"
import { useEffect, useMemo, useState } from "react"
import { isNumber } from "@/utils/number"
import { useAppSelector } from "@/app/hooks"
import { selectCart } from "@/features/cart"

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(1),
  },
  title: {
    fontSize: 14,
  },
}))

const ProductUnitTab: React.FC<{
  rows: ModifiedProductUnitType[]
  onAddUnit: (
    productUnit: ModifiedProductUnitType,
    inputQuantity: number,
  ) => void
}> = ({ rows, onAddUnit }) => {
  const classes = useStyles()

  const cartState = useAppSelector(selectCart)
  const initialAvailableQuantities = useMemo(
    () =>
      rows.reduce((acc, row) => {
        acc[row.id] = row.availableQuantity - (cartState.items[row.id]?.quantity || 0)
        return acc
      }, {} as Record<string | number, number>),
    [rows, cartState.items],
  )
  const [availableQuantities, setAvailableQuantities] = useState<{
    [key: string]: number
  }>(initialAvailableQuantities)

  useEffect(() => {
    setAvailableQuantities(initialAvailableQuantities)
  }, [initialAvailableQuantities])

  const [inputQuantities, setInputQuantities] = useState<{
    [key: string]: number
  }>({})

  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  return (
    <Grid container spacing={2} direction="column">
      {rows.map((row) => {
        const rowFieldName = `input-product-unit-${row.id}`
        const rowFieldError = errors[row.id]
        const rowAvailableQuantity = availableQuantities[row.id]
        const rowInputQuantity = inputQuantities[row.id] || 1

        return (
          <Grid item key={row.id}>
            <Card className={classes.root}>
              <CardContent>
                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                >
                  {`${t("Available Quantity")}: ${rowAvailableQuantity}`}
                </Typography>
                <Typography variant="h4">{row.unit.name}</Typography>
                <Typography variant="h5">{formatRupiah(row.price)}</Typography>
              </CardContent>
              <CardActions>
                <Grid container alignItems="center" spacing={1}>
                  <Grid item xs={6} md={4}>
                    <TextInput
                      name={rowFieldName}
                      type="number"
                      label={t("Quantity")}
                      variant="outlined"
                      margin="none"
                      size="small"
                      error={!!rowFieldError}
                      helperText={rowFieldError}
                      InputLabelProps={{ shrink: true }}
                      value={rowInputQuantity}
                      onChange={(e) => {
                        const quantity = parseInt(e.target.value)
                        setInputQuantities({
                          ...inputQuantities,
                          [row.id]: Number.isInteger(quantity) ? quantity : 1,
                        })
                      }}
                    />
                  </Grid>
                  <Grid
                    item
                    container
                    xs={6}
                    md={3}
                    style={{ height: "100%", flexGrow: 1 }}
                  >
                    <Button
                      color="primary"
                      variant="contained"
                      type="button"
                      onClick={() => {
                        if (!isNumber(rowInputQuantity)) {
                          return setErrors({
                            ...errors,
                            [row.id]: t("must be number", { ns: "validation" }),
                          })
                        }

                        if (rowInputQuantity > rowAvailableQuantity) {
                          return setErrors({
                            ...errors,
                            [row.id]: t(
                              "The inputted quantity should not exceed the product unit available quantity",
                              { ns: "validation" },
                            ),
                          })
                        } else {
                          setAvailableQuantities({
                            ...availableQuantities,
                            [row.id]: rowAvailableQuantity - rowInputQuantity,
                          })
                          onAddUnit(row, rowInputQuantity)
                        }
                      }}
                      startIcon={<Add />}
                    >
                      {t("Add", { ns: "action" })}
                    </Button>
                  </Grid>
                </Grid>
              </CardActions>
            </Card>
          </Grid>
        )
      })}
    </Grid>
  )
}

export default ProductUnitTab
