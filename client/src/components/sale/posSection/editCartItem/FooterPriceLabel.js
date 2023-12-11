import React, { Fragment } from 'react';
import { withStyles } from 'material-ui/styles';

const styles = () => ({
  price: {
    float: 'right',
    marginLeft: 35,
    color: '#20295a',
    fontWeight: 'bold',
    fontSize: '20px',
  },
  title: {
    fontSize: '13px',
  },
});

const FooterPriceLabel = ({ price, title, classes }) => (
  <>
    <span className={classes.title}>{title}</span>
    <span className={classes.price}>{price} ₹</span>
  </>
);

export default withStyles(styles)(FooterPriceLabel);
