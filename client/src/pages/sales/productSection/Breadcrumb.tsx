import { Button } from "@material-ui/core"
import Breadcrumbs from "@material-ui/core/Breadcrumbs"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import { Category, LocalMall, NavigateNext } from "@material-ui/icons"
import HomeIcon from "@material-ui/icons/Home"
import { t } from "i18next"
import React from "react"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    link: {
      display: "flex",
      textTransform: "none",
    },
    icon: {
      marginRight: theme.spacing(0.5),
      width: 20,
      height: 20,
    },
  }),
)

export interface IPOSBreadcrumbProps {
  selectedCategory?: string | null
  selectedProduct?: string | null
  onClickHome: () => void
  onClickCategory: () => void
}

const Breadcrumb: React.FC<IPOSBreadcrumbProps> = ({
  selectedCategory,
  selectedProduct,
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
