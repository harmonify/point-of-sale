import React from 'react';
import currency from 'currency.js';
import { withStyles } from '@material-ui/core/styles';
import FooterPriceLabel from './FooterPriceLabel';

const styles = () => ({
  root: { margin: '20px 10px 10px 0px', float: 'right' },
});

const Footer = ({ item, classes }) => (
  <div className={classes.root}>
    <FooterPriceLabel
      price={currency(item.price).multiply(item.quantity).toString()}
      title="Net Price"
    />
    <br />
    <br />
    <FooterPriceLabel
      price={currency(item.discount).multiply(item.quantity).toString()}
      title="Total Discount"
    />
    <br />
    <br />
    <FooterPriceLabel
      price={currency(item.totalPrice).toString()}
      title="Selling Price"
    />
  </div>
);

export default withStyles(styles)(Footer);