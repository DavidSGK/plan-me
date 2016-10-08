import React, { Component } from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import RaisedButton from 'material-ui/RaisedButton';
import { over, T, F, lensIndex } from 'ramda';

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

const questions = [
  {
    text: 'Do you like chores?',
    callbacks: [],
    answered: false,
  },
  {
    text: 'Do you like chores?',
    callbacks: [],
    answered: false,
  },
  {
    text: 'Do you like chores?',
    callbacks: [],
    answered: false,
  }
];

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
    console.warn(this.props.index);
    this.props.answer(this.props.index);
    this.setState({ value });
  }

  render() {
    return (
      <div>
        <Card style={cardStyle}>
          <CardTitle title={`Question ${this.props.index + 1}`} />
          <CardText>{this.props.text}</CardText>
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
    };
    this.answer = this.answer.bind(this);
  }

  // TODO make it work
  answer(index) {
    const answerLens = lensIndex(index);
    this.setState({ questionsAnswered: over(answerLens, T, this.state.questionsAnswered) });
  }

  render() {
    return (
      <div style={topSpace}>
        <h3 style={leftText}>DISAGREE</h3>
        {questions.map(
          ({text}, i) => <Question key={i} index={i} text={text} answer={this.answer}/>
        )}

        <RaisedButton label="SUBMIT" style={buttonStyle} />

        <h3 style={rightText}>AGREE</h3>
      </div>
    )
  }
}

export default Setup;
