import React, { Component } from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import RaisedButton from 'material-ui/RaisedButton';
import { over, T, F, lensIndex } from 'ramda';
import { questions, genTags, updateTags, sortTags } from '../personality';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { db } from '../firebase/config';
import { setTags } from '../util';

const topSpace = {
  paddingTop: 64,
};

const cardStyle = {
  margin: '5% 25%',
};

const radioButtonGroupStyle = {
  display: 'flex',
  justifyContent: 'space-around',
};

const radioButtonStyle = {
  width: 'auto',
};

const buttonStyle = {
  display: 'flex',
  width: 64,
  margin: 'auto',
}

const leftText = {
  position: 'fixed',
  top: '50%',
  left: '8%',
  textAlign: 'center',
};

const rightText = {
  position: 'fixed',
  top: '50%',
  margin: 'auto',
  right: '8%',
  textAlign: 'center',
};

class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
    };
    this.updateValue = this.updateValue.bind(this);
  }

  updateValue(evt, value) {
    const { answer, index, question, updatePriorities } = this.props;
    answer(index);
    updatePriorities(question, value);
  }

  render() {
    const { index, question } = this.props;
    return (
      <div>
        <Card style={cardStyle}>
          <CardTitle title={`Question ${index + 1}`} />
          <CardText>{question.question}</CardText>
          <Divider />
          <CardText>
            <RadioButtonGroup
              name="choices"
              style={radioButtonGroupStyle}
              onChange={this.updateValue}
            >
              <RadioButton style={radioButtonStyle}
                value='-3'
                />
              <RadioButton style={radioButtonStyle}
                value='-2'
                />
              <RadioButton style={radioButtonStyle}
                value='-1'
                />
              <RadioButton style={radioButtonStyle}
                value='1'
                />
              <RadioButton style={radioButtonStyle}
                value='2'
                />
              <RadioButton style={radioButtonStyle}
                value='3'
                />
            </RadioButtonGroup>
          </CardText>
        </Card>
      </div>
    );
  }
}

class Setup extends Component {
  constructor() {
    super();
    this.state = {
      questionsAnswered: questions.map(F),
      tags: genTags(),
    };
    this.answer = this.answer.bind(this);
    this.updatePriorities = this.updatePriorities.bind(this);
  }

  componentWillMount() {
    const { isLoggedIn, dispatch } = this.props;
    if (!isLoggedIn) {
      dispatch(push('/'));
    }
  }

  updatePriorities(question, value) {
    this.setState({ tags: updateTags(question.high, question.low, value, this.state.tags) });
    console.warn(this.state.tags);
  }

  // TODO make it work
  answer(index) {
    const answerLens = lensIndex(index);
    this.setState({ questionsAnswered: over(answerLens, T, this.state.questionsAnswered) });
  }

  render() {
    const {uid} = this.props;
    return (
      <div style={topSpace}>
        <h3 style={leftText}>DISAGREE</h3>
        {questions.map((question, i) => (
          <Question
            key={i}
            index={i}
            question={question}
            answer={this.answer}
            updatePriorities={this.updatePriorities}
          />
        ))}

        <RaisedButton
          label="SUBMIT"
          style={buttonStyle}
          onClick={() => { setTags(db, uid, sortTags(this.state.tags)) }}
        />

        <h3 style={rightText}>AGREE</h3>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  isLoggedIn: state.user.isLoggedIn,
  uid: state.user.uid,
});

export default connect(mapStateToProps)(Setup);
