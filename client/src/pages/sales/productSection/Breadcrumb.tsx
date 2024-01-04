import { Category, LocalMall, NavigateNext } from "@mui/icons-material"
import HomeIcon from "@mui/icons-material/Home"
import { Button } from "@mui/material"
import Breadcrumbs from "@mui/material/Breadcrumbs"
import Typography from "@mui/material/Typography"
import { makeStyles } from "@mui/styles"
import { t } from "i18next"
import React from "react"

const useStyles = makeStyles((theme) => ({
  link: {
    display: "flex",
    textTransform: "none",
  },
  icon: {
    marginRight: theme.spacing(0.5),
    width: 20,
    height: 20,
  },
}))

export interface IPOSBreadcrumbProps {
  selectedCategoryName?: string | null
  selectedProductName?: string | null
  onClickHome: () => void
  onClickCategory: () => void
}

const Breadcrumb: React.FC<IPOSBreadcrumbProps> = ({
  selectedCategoryName: selectedCategory,
  selectedProductName: selectedProduct,
  onClickHome,
  onClickCategory,
}) => {
  const classes = useStyles()

  return (
    <Breadcrumbs
      separator={<NavigateNext fontSize="small" />}
      aria-label="breadcrumb"
    >
      <Button color="inherit" onClick={onClickHome} className={classes.link}>
        <HomeIcon className={classes.icon} />
        <Typography variant="h6">{t("POS")}</Typography>
      </Button>

      {selectedCategory && (
        <Button
          type="button"
          size="small"
          onClick={onClickCategory}
          className={classes.link}
        >
          <Category className={classes.icon} />
          <Typography variant="h6">{selectedCategory}</Typography>
        </Button>
      )}

      {selectedProduct && (
        <Typography variant="h6" className={classes.link}>
          <LocalMall className={classes.icon} />
          {selectedProduct}
        </Typography>
      )}
    </Breadcrumbs>
  )
}

export default Breadcrumb
