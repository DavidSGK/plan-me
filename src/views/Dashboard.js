import React, { Component } from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Paper from 'material-ui/Paper';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { merge, slice } from 'ramda';
import AddEvent from '../components/AddEvent';
import { connect } from 'react-redux';
import RandomMC from 'random-material-color';


const topSpace = {
  paddingTop : 64,
};

const fabStyle = {
  position : 'fixed',
  right : 0,
  bottom : 0,
  margin : '5%',
};

const tableStyle = {
  position : 'absolute',
  margin : '3%',
  marginTop : '0',
  //border : '1 solid black',
  borderCollapse : 'collapse',
  tableLayout : 'fixed',
  width : '94%',
}

const headerTableStyle = {
  width : '94%',
  height : '5%',
  position : 'absolute',
  margin : '3%',
  marginBottom : '0',
  borderCollapse : 'collapse',
  tableLayout : 'fixed',
}

const thContents = [
  'SUN',
  'MON',
  'TUE',
  'WED',
  'THU',
  'FRI',
  'SAT',
];

const emptyRow = ['', '', '', '', '', '', ''];

const cellStyle = {
  borderTop : '1px solid #AAAAAA',
  borderBottom : '1px solid #AAAAAA',
  borderLeft : '1px solid #555555',
  borderRight : '1px solid #555555',
  borderCollapse : 'collapse',
  padding : 15,
  width : '12.5%',
  height : 75,
  fontSize : '150%',
  fontWeight : 100,
};

const timeCellStyle = {
  borderRight : '3px solid #555555',
  borderCollapse : 'collapse',
  padding : 3,
  textAlign : 'right',
  verticalAlign : 'top',
  width : 'auto',
  fontSize : '75%',
  fontWeight : 100,
}

const timeList = [
  '12 AM',
  '1 AM',
  '2 AM',
  '3 AM',
  '4 AM',
  '5 AM',
  '6 AM',
  '7 AM',
  '8 AM',
  '9 AM',
  '10 AM',
  '11 AM',
  '12 PM',
  '1 PM',
  '2 PM',
  '3 PM',
  '4 PM',
  '5 PM',
  '6 PM',
  '7 PM',
  '8 PM',
  '9 PM',
  '10 PM',
  '11 PM',
];

const calendarPane = {
  width : '90%',
  height : '80%',
  position : 'absolute',
  bottom : '7%',
  left : '5%',
};

const calendarDiv = {
  width : '100%',
  position : 'relative',
  overflow : 'auto',
};

const eventBlock = {
  //border : '1px solid white',
  width : '12.2%',
  position : 'absolute',
  color : 'white',
  fontSize : '60%',
  overflow : 'hidden',
  padding : 3,
};

const weekToDays = (weekArray = Array(672).fill(null)) => {
  const days = new Array(7);

  var i, j, k;
  for(i = 0; i < 7; i++){
    days[i] = slice(i * 96, (i+1) * 96, weekArray);
    for(j = 0; j < 96; j++){
      if(j == 0 && days[i][0] != null && (days[i][days[i][0].duration-1] == null || days[i][0].title != days[i][days[i][0].duration-1].title)){
        days[i][0].duration--;
        j--;
        continue;
      } else if(j == 0){
        while(days[i][j] != null){
          j++;
          days[i][j] = null;
        }
        j = 0;
      }
      if(days[i][j] != null){
        if(j + days[i][j].duration <= 96){
          for(k = 1; k < days[i][j].duration; k++){
            days[i][j+k] = null;
          }
        } else {
          days[i][j].duration -= (j + days[i][j].duration - 96);
          j--;
          continue;
        }
      }
    }
  }
  return days;
};

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      isOpen: false,
    };
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleOpen() {
    this.setState({isOpen: true});
  };

  handleClose() {
    this.setState({isOpen: false});
  };

  render() {
    const days = weekToDays(this.props.calendar);
    return (
      <div style={topSpace}>
        <Paper style={calendarPane}>
          <div style={merge(calendarDiv, {height : '13%',})}>
            <table style={headerTableStyle}>
              <tbody>
                <tr>
                  <th></th>
                  {thContents.map((thContent, i) => <th key={i} style={merge(cellStyle, {padding : 3, height : 15, borderLeft : 'none', borderTop : 'none', borderRight : 'none', borderBottom : '3px solid #555555'})}>{thContent}</th>)}
                </tr>
              </tbody>
            </table>
          </div>
          <div style={merge(calendarDiv, {height : '87%',})}>
            <table style={tableStyle}>
              <tbody>
                {timeList.map(function(a, i){
                  return <tr key={i}>
                    <th key={i+200} style={timeCellStyle}>{a}</th>
                    {emptyRow.map((emptyRow, j) => <td key={j} style={cellStyle}>{emptyRow}</td>)}
                  </tr>
                })}
              </tbody>
              {days.map(function(a, i){
                return days[i].map(function(b, j){
                  if(b !== null){
                    return <div key={j} style={merge(eventBlock, {
                      height : `${b.duration * (100 / 96)}%`,
                      top : `${j * (100 / 96)}%`,
                      left : `${(i + 1) * 12.5 + (8 - i) / 10}%`,
                      background : `${RandomMC.getColor()}`})}
                    >
                    <h5>{b.title}</h5>
                    <br></br>
                    <p>{b.description}</p>
                  </div>;
                  } else return null;
                })
              })}
            </table>
          </div>
        </Paper>

        <FloatingActionButton
          style={fabStyle}
          onClick={this.handleOpen}
        >
          <ContentAdd />
        </FloatingActionButton>

        <AddEvent
          isOpen={this.state.isOpen}
          handleOpen={this.handleOpen}
          handleClose={this.handleClose}
        />

      </div>
    );
  }
}

const mapStateToProps = state => ({
  calendar: state.user.calendar,
});

export default connect(mapStateToProps)(Dashboard);
