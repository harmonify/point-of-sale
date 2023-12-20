import React, { Component } from 'react';
import Button from '@material-ui/core/Button';

import { withStyles } from '@material-ui/core/styles';
import Searchbox from '../../components/controls/Searchbox';
import api from '../../services/api';
import DataGrid from '../../components/controls/datagrid/DataGrid';
import YesNo from '../../features/dialog/YesNo';
import CircularLoader from '../../components/controls/loader/CircularLoader';
import Message from '../../components/controls/Message';

const styles = ((theme) => ({
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  button: {
    margin: theme.spacing.unit,
  },
  iconSmall: {
    fontSize: 20,
  },
  wrapper: {
    marginTop: 20,
    position: 'relative',
  },
}));

class ProductTab extends Component {
  productColumns = [
    'ID',
    'Name',
    'Description',
    'Cost price',
    'Selling price',
    'Type',
  ];

  state = {
    clearSearch: false,
    serachQuery: '',
    showConfirmDeleteDialog: false,
    isLoading: false,
    message: '',
    showMessage: false,
    isError: false,
  };

  onListClick = () => {
    this.setState({ clearSearch: true, serachQuery: '', showMessage: false });
  };

  onSearchSubmit = async (id) => {
    this.setState({ clearSearch: false, serachQuery: id });
  };

  onCreateNewClick = () => {
    this.props.history.push('products/new');
  };

  onEdit = (row) => {
    this.props.history.push(`products/edit/${row.id}`);
  };

  onDelete = (itemToDelete) => {
    this.setState({ showConfirmDeleteDialog: true, itemToDelete });
  };

  onConfirmDeleteClick = async () => {
    const { id } = this.state.itemToDelete;

    try {
      this.setState({ isLoading: true });

      const res = await api.product.delete(id);

      if (res.status === 200) {
        this.showMessage('Deleted successfully.');
      } else {
        throw new Error(
          `Couldn't delete the record. The status code is ${res.status}`,
        );
      }
    } catch (error) {
      this.showMessage(error.message, true);
    }
  };

  onMessageCloseClick = () => {
    this.setState({ showMessage: false });
  };

  onCancelConfirmDeleteClick = () => {
    this.setState({ showConfirmDeleteDialog: false });
  };

  showMessage = (message, isError = false) => {
    this.setState({
      showMessage: true,
      isError,
      message,
      isLoading: false,
      showConfirmDeleteDialog: false,
    });
  };

  getApiPromise = () => {
    const { serachQuery } = this.state;

    if (serachQuery.length === 0) {
      return api.product.fetchByPages();
    }

    return api.product.searchByIdAndGetByPages(serachQuery);
  };

  render() {
    const {
      clearSearch,
      showConfirmDeleteDialog,
      isLoading,
      message,
      showMessage,
      isError,
    } = this.state;
    const { classes } = this.props;

    return (
      <div className={classes.wrapper}>
        <CircularLoader isLoading={isLoading} />
        <YesNo
          open={showConfirmDeleteDialog}
          message="Are you sure wan't to delete the selected item"
          onOk={this.onConfirmDeleteClick}
          onCancel={this.onCancelConfirmDeleteClick}
        />
        <div>
          <Button
            className={classes.button}
            variant="raised"
            color="default"
            size="small"
            onClick={this.onListClick}
          >
            List
          </Button>

          <Button
            className={classes.button}
            variant="raised"
            color="primary"
            size="small"
            onClick={this.onCreateNewClick}
          >
            Create New
          </Button>
          <Searchbox
            clear={clearSearch}
            onChange={this.onSearchChange}
            onDebounce={this.onSearchSubmit}
          />
        </div>

        <Message
          style={{ width: '98%' }}
          title="Message"
          message={message}
          show={showMessage}
          isError={isError}
          onCloseClick={this.onMessageCloseClick}
          autoClose={!isError}
        />

        <div className={classes.wrapper}>
          <DataGrid
            datasourcePromise={this.getApiPromise}
            actions={['del', 'edit']}
            onEdit={this.onEdit}
            onDelete={this.onDelete}
            headers={this.productColumns}
          />
        </div>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(ProductTab);