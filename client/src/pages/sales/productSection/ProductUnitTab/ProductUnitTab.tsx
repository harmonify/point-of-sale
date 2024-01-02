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
  ) => void
}> = ({ rows, onAddUnit }) => {
  const classes = useStyles()

  return (
    <Grid container spacing={2} direction="column">
      {rows.map((row) => (
        <Grid item>
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
                    name={`input-product-${row.unit.name}`}
                    type="number"
                    label={t("Quantity")}
                    variant="outlined"
                    margin="none"
                    size="small"
                    InputLabelProps={{ shrink: true }}
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
                    onClick={(e) => {
                      e.preventDefault()
                      onAddUnit(row)
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
      ))}
    </Grid>
  )
}

export default ProductUnitTab
