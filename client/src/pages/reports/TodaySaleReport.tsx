import {
  Button,
  CircularProgress,
  Typography,
  useTheme,
} from "@material-ui/core"
import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"
import { TodaySaleReportPDF } from "./TodaySaleReportPDF"
import { useGetTodaySalesQuery } from "@/services/api"

const pdfElementId = "today-sale-report"

const TodaySaleReport = () => {
  const theme = useTheme()
  const { data, isLoading } = useGetTodaySalesQuery()

  const onClickDownload = () => {
    const doc = new jsPDF()

    // It can parse html:
    // <table id="my-table"><!-- ... --></table>
    autoTable(doc, { html: `#${pdfElementId}` })

    // Or use javascript directly:
    autoTable(doc, {
      head: [["Name", "Email", "Country"]],
      body: [
        ["David", "david@example.com", "Sweden"],
        ["Castille", "castille@example.com", "Spain"],
        // ...
      ],
    })

    doc.save("table.pdf")
  }

  return (
    <>
      <Button
        size="small"
        onClick={onClickDownload}
        disabled={isLoading}
        startIcon={
          isLoading ? (
            <CircularProgress
              size={theme.typography.body1.fontSize}
              color="inherit"
            />
          ) : null
        }
        variant="contained"
        color="primary"
      >
        Download
      </Button>
      <TodaySaleReportPDF
        data={data?.data}
        isLoading={isLoading}
      ></TodaySaleReportPDF>
    </>
  )
}

export default TodaySaleReport
