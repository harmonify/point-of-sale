import React, { Component } from 'react';
import { Table, TableBody } from '@material-ui/core';
import TotalRow from './TotalRow';
import TaxDiscountRow from './TaxDiscountRow';
import TotalBillRow from './TotalBillRow';

class CartFooter extends Component {
  state = {};

  render() {
    const { cartArray, summary } = this.props;

    if (summary.noOfItems === 0) {
      return null;
    }

    const totalquantityText = `${summary.noOfItems} (${summary.noOfInividualItems})`;
    const totalPrice = summary.total;
    const { netTotal } = summary;

    return (
      <Table style={{ marginTop: '50px' }}>
        <TableBody>
          <TotalRow
            totalquantityText={totalquantityText}
            totalPrice={totalPrice}
          />
          <TaxDiscountRow cartArray={cartArray} summary={summary} />
          <TotalBillRow netTotal={netTotal} />
        </TableBody>
      </Table>
    );
  }
}

export default CartFooter;