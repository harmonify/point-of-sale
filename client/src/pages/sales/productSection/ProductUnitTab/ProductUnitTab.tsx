import TextInput from "@/components/forms/TextInput"
import { formatRupiah } from "@/utils"
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core"
import { Add } from "@material-ui/icons"
import { t } from "i18next"
import { ModifiedProductUnitType } from "../ProductSection"
import { useState } from "react"

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

  const [inputQuantity, setInputQuantity] = useState(1)

  return (
    <Grid container spacing={2} direction="column">
      {rows.map((row) => (
        <Grid item key={row.id}>
          <Card className={classes.root}>
            <CardContent>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
              >
                {`${t("Available Quantity")}: ${row.availableQuantity}`}
              </Typography>
              <Typography variant="h4">{row.unit.name}</Typography>
              <Typography variant="h5">{formatRupiah(row.price)}</Typography>
            </CardContent>
            <CardActions>
              <Grid container alignItems="center" spacing={1}>
                <Grid item xs={6} md={4}>
                  <TextInput
                    name={`input-product-unit-${row.id}`}
                    type="number"
                    label={t("Quantity")}
                    variant="outlined"
                    margin="none"
                    size="small"
                    InputLabelProps={{ shrink: true }}
                    value={inputQuantity}
                    onChange={(e) => {
                      const quantity = parseInt(e.target.value)
                      setInputQuantity(
                        Number.isInteger(quantity) ? quantity : 1,
                      )
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
                    onClick={() => onAddUnit(row, inputQuantity)}
                    startIcon={<Add />}
                  >
                    {t("Add", { ns: "action" })}
                  </Button>
                </Grid>
              </Grid>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  )
}

export default ProductUnitTab
