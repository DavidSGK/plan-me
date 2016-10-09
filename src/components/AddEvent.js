import React, { Component, PropTypes } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

class AddEvent extends Component {
  render() {
    const {handleOpen, handleClose, isOpen} = this.props;
    const actions = [
      <FlatButton
        label="Cancel"
        primary
        onTouchTap={handleClose}
      />,
      <FlatButton
        label="Submit"
        primary
        keyboardFocused
        onTouchTap={handleClose}
      />,
    ];

    return (
      <div>
        <Dialog
          title="Add an Event"
          actions={actions}
          modal={false}
          open={isOpen}
          onRequestClose={handleClose}
          autoScrollBodyContent
        >
        </Dialog>
      </div>
    );
  }
}

AddEvent.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleOpen: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default AddEvent;
