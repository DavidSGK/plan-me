import React from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';

const styles = {
  textField: {
  },
  textBox: {
    textAlign: 'center',
  },
};

const USERNAME = 'Username';

const Home = () => (
  <div>
    <Paper style={styles.textBox} zDepth={2}>
      <TextField
        hintText={USERNAME}
        floatingLabelText={USERNAME}
      />
      <TextField
        hintText={USERNAME}
        floatingLabelText={USERNAME}
      />
    </Paper>
  </div>
);

export default Home;
