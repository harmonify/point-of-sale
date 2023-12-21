import React, { Component } from "react"
import currency from "currency.js"
import { connect } from "react-redux"
import { withStyles } from "@material-ui/core/styles"
import ConfirmationDialog from "../../../../features/dialog/ConfirmationDialog"
import api from "../../../../services/api"
import Message from "../../../../components/controls/Message"
import NormalSaleForm from "./NormalSaleForm"
import CircularLoader from "../../../../components/controls/loader/CircularLoader"
import { emptyCart } from "@/features/cart"
import YesNo from "../../../../features/dialog/YesNo"
import { createSelector } from "@reduxjs/toolkit"

const getCartItemsArraySelector = createSelector(
  (state) => state.cart.items,
  (cart) => {
    const keys = Object.keys(cart)
    const cartArray = []
    for (let i = 0; i < keys.length; i++) {
      cartArray.push(cart[keys[i]])
    }

    return cartArray
  },
)

const styles = () => ({
  message: {
    margin: 0,
    paddingBottom: "10px",
  },
  formContainer: {
    padding: "30px",
    margin: "auto",
    width: "500px",
    height: "100%",
  },
})

class NormalSale extends Component {
  state = {
    error: "",
    showMessage: false,
    showConfirmDeleteDialog: false,
    isLoading: false,
    errors: {},
    data: {
      balanceToPay: "0.00",
      amountPaid: "",
    },
  }

  onChange = (e) => {
    const amountPaid = e.target.value
    const { netTotal } = this.props.cart.summary
    const balance = currency(amountPaid).subtract(netTotal)

    if (balance.value > 0) {
      this.setState({
        errors: {},
        data: { amountPaid, balanceToPay: balance.toString() },
      })
    } else {
      this.setState({ errors: {}, data: { amountPaid, balanceToPay: "0.00" } })
    }
  }

  onNormalSaleFormSubmit = async (e) => {
    e.preventDefault()

    const { amountPaid } = this.state.data
    const { cart, cartArray } = this.props
    const { summary } = cart
    const { netTotal } = summary
    const balance = currency(amountPaid).subtract(netTotal)

    if (balance.value < 0) {
      this.setState({
        errors: {
          amountPaid:
            "You have entered a less amount than the bill. Please correct it",
        },
      })

      return
    }

    const sale = {}
    sale.items = []
    Object.assign(sale.items, cartArray)

    sale.total = currency(summary.total).value
    sale.taxAmount = currency(summary.taxAmount).value
    sale.totalDiscount = currency(summary.discountOnItems).add(
      summary.discountOnTotal,
    ).value
    sale.netTotal = currency(netTotal).value

    const res = await api.transaction.saveNormalSale(sale)

    console.log(res.data)
  }

  onNormalSaleFormCancel = () => {
    this.setState({ showConfirmDeleteDialog: true })
  }

  onMessageCloseClick = () => {
    this.setState({ showMessage: false })
  }

  // Clear the transaction. If user clicks confirm yes for canceling transaction.
  onYesNoPopYesClick = () => {
    this.props.emptyCart()
  }

  onYesNoPopNoClick = () => {
    this.setState({ showConfirmDeleteDialog: false })
  }

  renderForm = () => {
    const { transaction, cart } = this.props
    const { isLoading, errors, data } = this.state

    if (isLoading === true) {
      return null
    }

    return (
      <NormalSaleForm
        cart={cart}
        errors={errors}
        data={data}
        onSubmit={this.onNormalSaleFormSubmit}
        onCancel={this.onNormalSaleFormCancel}
        onChange={this.onChange}
        transactionId={transaction.id}
      />
    )
  }

  render() {
    const { handleClose, open, classes } = this.props
    const { error, showMessage, isLoading, showConfirmDeleteDialog } =
      this.state

    return (
      <ConfirmationDialog open={open} onClose={handleClose} title="Normal Sale">
        <CircularLoader isLoading={isLoading} />

        <YesNo
          open={showConfirmDeleteDialog}
          message="Are you sure wan't to cancel the transaction and clear the cart?"
          onOk={() => this.onYesNoPopYesClick()}
          onCancel={() => this.onYesNoPopNoClick()}
        />

        <div className={classes.formContainer}>
          <Message
            className={classes.message}
            title="Got an error"
            message={error}
            show={showMessage}
            isError
            onCloseClick={this.onMessageCloseClick}
          />
          {this.renderForm()}
        </div>
      </ConfirmationDialog>
    )
  }
}

function mapStateToProps(state) {
  return {
    transaction: state.transaction,
    cart: state.cart,
    cartArray: getCartItemsArraySelector(state),
  }
}

const mapDispatchToProps = {
  emptyCart,
}

const component = withStyles(styles)(NormalSale)
export default connect(mapStateToProps, mapDispatchToProps)(component)
