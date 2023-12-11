import React from 'react';
import { TableRow, TableBody } from '@material-ui/core';
import NoItemsTableCell from './NoItemsTableCell';

const CartBodyNoItems = () => (
  <TableBody>
    <TableRow>
      <NoItemsTableCell />
    </TableRow>
  </TableBody>
);

export default CartBodyNoItems;
