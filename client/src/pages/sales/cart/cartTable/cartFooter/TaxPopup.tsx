import React, { Component } from "react"
import { connect } from "react-redux"
import FormDialog from "../../../../../components/forms/FormDialog"
import { updateTax } from "@/features/cart"
import { TextField } from "@material-ui/core"

class TaxPopup extends Component {
  state = { tax: "", error: "" }

  onTaxChange = (e) => {
    const tax = e.target.value

    this.setState({ tax, error: "" })
  }

  onSave = () => {
    const { tax } = this.state

    if (tax === "") {
      this.setState({ error: "Enter the valid tax value" })
      return
    }

    this.props.tax
    this.setState({ tax: "", error: "" })
    this.props.close()
  }

  onCancel = () => {
    this.props.close()
  }

  render() {
    const { open } = this.props
    const { tax, error } = this.state

    return (
      <FormDialog
        onSave={this.onSave}
        onCancel={this.onCancel}
        open={open}
        title="Tax"
        subtitle="value entered here is considered as %"
      >
        <TextField
          style={{ width: "250px" }}
          error={!!error}
          name="tax"
          type="number"
          value={tax}
          label="Amount"
          onChange={this.onTaxChange}
          helperText={error}
        />
        <div />
      </FormDialog>
    )
  }
}

export default connect(null, { updateTax })(TaxPopup)
