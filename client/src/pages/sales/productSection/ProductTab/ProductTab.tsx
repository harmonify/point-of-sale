import { unslugify } from "@/utils/string"
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core"
import { DoubleArrow } from "@material-ui/icons"
import { t } from "i18next"
import { ModifiedProductType } from "../ProductSection"

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(1),
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      boxShadow: "0 1px 5px 2px rgba(0, 0, 0, .3)",
      cursor: "pointer",
    },
  },
  subtitle: {
    fontSize: 14,
    fontWeight: 500,
  },
}))

const ProductTab: React.FC<{
  rows: ModifiedProductType[]
  onSelect: (product: ModifiedProductType) => void
}> = ({ rows, onSelect }) => {
  const classes = useStyles()

  return (
    <Grid container spacing={2} direction="column">
      {rows.map((row) => (
        <Grid item key={row.id}>
          <Card className={classes.root} onClick={() => onSelect(row)}>
            <CardContent>
              <Typography color="inherit" variant="h4" gutterBottom>
                {row.name}
              </Typography>

              {row.description ? (
                <Typography color="inherit" variant="body1" gutterBottom>{`${
                  row.description || "-"
                }`}</Typography>
              ) : null}

              <Typography
                className={classes.subtitle}
                color="inherit"
                variant="body2"
              >{`${t("Barcode")}${
                row.barcodeType
                  ? ` (${row.barcodeType.replaceAll("_", " ")})`
                  : row.barcodeType
              }: ${row.barcode || "-"}`}</Typography>

              <Typography
                className={classes.subtitle}
                color="inherit"
                variant="body2"
              >
                {`${t("Units")}: ${row.productUnits
                  .map((pu) => pu.unit.name)
                  .join(", ")}`}
              </Typography>
            </CardContent>

            <CardActions>
              <Button
                color="inherit"
                variant="outlined"
                type="button"
                size="small"
                fullWidth
                onClick={(e) => {
                  e.preventDefault()
                  onSelect(row)
                }}
                endIcon={<DoubleArrow />}
              >
                {t("Units")}
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  )
}

export default ProductTab
