import React, { Component, PropTypes } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import TimePicker from 'material-ui/TimePicker';
import Checkbox from 'material-ui/Checkbox';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { db } from '../firebase/config';
import * as Tags from '../constants/tags';
import { keys, complement } from 'ramda';
import { connect } from 'react-redux';
import { createEvent, roundTo15 } from '../util';

const isNumber = complement(isNaN);

class AddEvent extends Component {
  constructor() {
    super();
    this.state = {
      eventName: '',
      description: '',
      duration: '',
      tag: '',
      enforce: false,
      time: {},
      day: '',
    };
    this.onChange = this.onChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.forbidSubmit = this.forbidSubmit.bind(this);
    this.submitInfo = this.submitInfo.bind(this);
  }

  onChange(myState) {
    return (evt, val) => {
      this.setState({ [myState]: val });
    };
  }

  handleSelect(myState) {
    return (evt, index, value) => {
      evt.preventDefault();
      this.setState({ [myState]: value });
    };
  }

  forbidSubmit() {
    const {
      enforce, eventName, description, duration, tag, day, time
    } = this.state;
    const nonEnforced = Boolean(eventName && description && duration && isNumber(duration) && tag);

    if (!enforce) {
      return nonEnforced;
    }

    return Boolean(nonEnforced && (day >= 0) && time);
  }

  submitInfo() {
    const {uid} = this.props;
    const {eventName, description, tag, duration, day, time, enforce} = this.state;

    if (!enforce) {
      createEvent(db, uid, eventName, description, tag, roundTo15(duration) / 15);
    } else {
      const start = 96 * day + 4 * time.getHours() + roundTo15(time.getMinutes()) / 15;
      createEvent(db, uid, eventName, description, tag, roundTo15(duration) / 15, start);
    }
    this.props.handleClose();
  }

  render() {
    const {handleOpen, handleClose, isOpen, uid} = this.props;
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
        onTouchTap={this.submitInfo}
        disabled={!this.forbidSubmit()}
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
          <div>
            <TextField
              floatingLabelText="Event Name"
              value={this.state.eventName}
              onChange={this.onChange('eventName')}
            />
            <br />
            <TextField
              floatingLabelText="Description"
              value={this.state.description}
              onChange={this.onChange('description')}
              multiLine
              rows={2}
              rowsMax={4}
            />
            <br />
            <TextField
              floatingLabelText="Duration (mins)"
              value={this.state.duration}
              onChange={this.onChange('duration')}
            />
            <br />
            <SelectField
              floatingLabelText="Tag"
              value={this.state.tag}
              onChange={this.handleSelect('tag')}
            >
              {keys(Tags).map((tag, i) => <MenuItem key={i} value={tag} primaryText={tag} />)}
            </SelectField>
            <br />
            <br />
            <Checkbox
              label="Enforce this event to happen"
              checked={this.state.enforce}
              onCheck={this.onChange('enforce')}
            />
            <SelectField
              floatingLabelText="Day of the week"
              value={this.state.day}
              onChange={this.handleSelect('day')}
              disabled={!this.state.enforce}
            >
              <MenuItem value={0} primaryText="Sunday" />
              <MenuItem value={1} primaryText="Monday" />
              <MenuItem value={2} primaryText="Tuesday" />
              <MenuItem value={3} primaryText="Wednesday" />
              <MenuItem value={4} primaryText="Thursday" />
              <MenuItem value={5} primaryText="Friday" />
              <MenuItem value={6} primaryText="Saturday" />
            </SelectField>
            <br />
            <TimePicker
              hintText="Time of the day"
              format="24hr"
              value={this.state.time}
              onChange={this.onChange('time')}
              disabled={!this.state.enforce}
            />
          </div>
        </Dialog>
      </div>
    );
  }
}

AddEvent.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleOpen: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  uid: PropTypes.string,
};

const mapStateToProps = state => ({
  uid: state.user.uid,
});

export default connect(mapStateToProps)(AddEvent);
