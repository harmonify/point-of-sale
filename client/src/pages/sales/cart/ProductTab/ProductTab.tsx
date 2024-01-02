import { DataGrid, GridColumns, GridRowData } from "@mui/x-data-grid"

const ProductTab: React.FC<{
  columns: GridColumns
  rows: GridRowData[]
  loading?: boolean
}> = ({ columns, rows, loading }) => {
  return (
    <DataGrid
      columns={columns}
      rows={rows}
      loading={loading}
      autoHeight
      disableSelectionOnClick
      disableDensitySelector
      pagination={true}
      density="compact"
    />
  )
}

export default ProductTab
