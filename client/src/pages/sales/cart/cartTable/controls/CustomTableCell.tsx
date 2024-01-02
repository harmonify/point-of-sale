import { TableCell } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const CustomTableCell = withStyles((theme) => ({
  head: {
    // backgroundColor: theme.palette.primary.main,
    // color: theme.palette.common.white,
    padding: '5px',
    fontSize: 14,
  },
  body: {
    fontSize: 13,
    padding: '5px',
    overflowWrap: 'break-word',
  },
}))(TableCell);

export default CustomTableCell;
