import React, { Component } from "react"
import * as equal from "fast-deep-equal"
import { withStyles } from "@material-ui/core/styles"
import Container from "../../components/controls/Container"
import Form from "../../components/forms/Form"
import CustomTextField from "../../components/controls/textfields/CustomTextField"
import api from "../../services/api"
import Prompt from "../../features/dialog/Prompt"
import CircularLoader from "../../components/controls/loader/CircularLoader"
import Message from "../../components/controls/Message"

// eslint-disable-next-line
const styles = (theme) => ({
  form: {
    marginLeft: 20,
  },
})

class AddNew extends Component {
  initialData = {
    id: "",
    name: "",
    address: "",
    mobile: "",
    description: "",
    email: "",
  }

  state = {
    data: this.initialData,
    errors: {},
    showMessageDialog: false,
    isLoading: false,
    message: false,
    showMessage: false,
    isError: false,
    isEdit: false,
  }

  async componentDidMount() {
    try {
      const { id } = this.props.match.params

      if (!id) {
        return
      }

      this.setState({ isLoading: true })

      const stateToUpdate = {}
      const res = await api.vendor.fetchById(id)

      stateToUpdate.data = res.data
      stateToUpdate.isLoading = false
      stateToUpdate.isEdit = true

      this.setState({ ...stateToUpdate })
    } catch (error) {
      this.showMessage(error.message, true)
    }
  }

  onChange = (e) => {
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value },
      errors: { ...this.state.errors, [e.target.name]: "" },
    })
  }

  onMobileInputChange = (e) => {
    const mobile = e.target.value

    this.setState({
      errors: { ...this.state.errors, mobile: null },
    })

    if (mobile.toString().length > 10) {
      return
    }
    if (mobile.toString() === "") {
      this.setState({
        data: {
          ...this.state.data,
          mobile: "",
        },
      })
    } else if (!isNaN(mobile)) {
      this.setState({
        data: {
          ...this.state.data,
          mobile,
        },
      })
    }
  }

  onSubmit = async (e) => {
    e.preventDefault()

    const errors = this.validate()

    if (Object.keys(errors).length > 0) {
      this.setState({ errors })
      return
    }

    try {
      if (this.state.isEdit === false) {
        await this.createNew(this.state.data)
      } else {
        await this.update(this.state.data)
      }
    } catch (error) {
      this.showError(error)
    }
  }

  createNew = async (data) => {
    const res = await api.vendor.createNew(data)

    if (res.status === 200) {
      this.showMessage("Saved successfully")
      this.clearForm()
    } else {
      throw new Error(
        `Unable to create the record. The status code is ${res.status}`,
      )
    }
  }

  update = async (data) => {
    const res = await api.vendor.update(this.props.match.params.id, data)

    if (res.status === 200) {
      this.clearForm(true)
    } else {
      throw new Error(`Unable to update. The status code is ${res.status}`)
    }
  }

  clearForm = (canShowMessageDialog = false) => {
    this.setState({
      data: this.initialData,
      showMessageDialog: canShowMessageDialog,
    })

    if (this.idRef) {
      this.idRef.focus()
    }
  }

  onMessageCloseClick = () => {
    this.setState({
      showMessage: false,
      message: "",
      isError: false,
    })
  }

  showMessage = (message) => {
    this.setState({
      showMessage: true,
      message,
      isError: false,
    })
  }

  showError = (error) => {
    this.setState({
      showMessage: true,
      message: error.message,
      isError: true,
      isLoading: false,
    })
  }

  onMessageDialogCloseClick = () => {
    this.setState({ showMessageDialog: false })
    this.props.history.goBack()
  }

  onCancelClick = () => {
    const isDirty = !equal(this.initialData, this.state.data)

    if (isDirty === true && this.state.isEdit === false) {
      this.clearForm()
      return
    }

    this.props.history.goBack()
  }

  render() {
    const {
      data,
      errors,
      showMessageDialog,
      isLoading,
      message,
      showMessage,
      isError,
      isEdit,
    } = this.state

    return (
      <Container title={isEdit ? "Edit Vendor" : "New Vendor"}>
        <Prompt
          message="The vendor you entered was saved successfully."
          open={showMessageDialog}
          handleClose={this.onMessageDialogCloseClick}
        />
        <CircularLoader isLoading={isLoading} />
        <Message
          title="Message"
          message={message}
          show={showMessage}
          isError={isError}
          onCloseClick={this.onMessageCloseClick}
          autoClose={!isError}
        />

        <Form
          id="vendor"
          onSubmit={this.onSubmit}
          onCancel={this.onCancelClick}
        >
          <CustomTextField
            error={!!errors.id}
            name="id"
            value={data.id}
            label="Vendor Id"
            helperText="This should be unique (can give mobile number)"
            onChange={this.onChange}
            disabled={isEdit}
          />
          <br />
          <CustomTextField
            error={!!errors.name}
            name="name"
            value={data.name}
            label="Vendor Name"
            margin="normal"
            onChange={this.onChange}
          />
          <CustomTextField
            name="description"
            value={data.description}
            label="Description"
            margin="normal"
            onChange={this.onChange}
          />
          <CustomTextField
            error={!!errors.address}
            name="address"
            value={data.address}
            label="Address"
            margin="normal"
            onChange={this.onChange}
          />
          <CustomTextField
            error={!!errors.mobile}
            name="mobile"
            value={data.mobile}
            label="Mobile"
            margin="normal"
            onChange={this.onMobileInputChange}
          />
          <CustomTextField
            error={!!errors.email}
            name="email"
            value={data.email}
            label="Email Id"
            margin="normal"
            onChange={this.onChange}
          />
        </Form>
      </Container>
    )
  }
}

export default withStyles(styles, { withTheme: true })(AddNew)