import { unslugify } from "@/utils/string"
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from "@mui/material"
import { makeStyles } from "@mui/styles"
import { DoubleArrow } from "@mui/icons-material"
import { t } from "i18next"

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: 200,
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

const CategoryTab: React.FC<{
  rows: Monorepo.Api.Response.CategoryResponseDto[]
  onSelect: (category: Monorepo.Api.Response.CategoryResponseDto) => void
}> = ({ rows, onSelect }) => {
  const classes = useStyles()

  return (
    <Grid container spacing={3} alignItems="stretch">
      {rows.map((row) => (
        <Grid key={row.id} item xs={6} style={{ display: "flex" }}>
          <Card
            className={classes.root}
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "column",
              width: "100%",
            }}
            onClick={() => onSelect(row)}
          >
            <CardContent>
              <Typography color="inherit" variant="h5" gutterBottom>
                {row.name}
              </Typography>
              <Typography color="inherit" gutterBottom>
                {t("Description")}:
              </Typography>
              <Typography color="inherit" variant="body1" gutterBottom>{`${
                row.description || "-"
              }`}</Typography>
            </CardContent>

            <CardActions>
              <Button
                variant="outlined"
                type="button"
                size="small"
                fullWidth
                color="inherit"
                onClick={(e) => {
                  e.preventDefault()
                  onSelect(row)
                }}
                endIcon={<DoubleArrow />}
              >
                {t("Products")}
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  )
}

export default CategoryTab
