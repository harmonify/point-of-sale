import { Button } from "@material-ui/core"
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFDownloadLink,
} from "@react-pdf/renderer"

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E400",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
})

// Create Document Component
const TodaySaleReport = () => {
  const document = (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text>Section #1</Text>
        </View>
        <View style={styles.section}>
          <Text>Section #2</Text>
        </View>
      </Page>
    </Document>
  )

  return (
    <PDFDownloadLink document={document} fileName={"document.pdf"}>
      <Button size="small">Download</Button>
    </PDFDownloadLink>
  )
}

export default TodaySaleReport
