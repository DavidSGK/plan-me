import React from 'react';
import Paper from 'material-ui/Paper';

const main = {
  height: 100,
  width: 100,
};

const Home = () => (
  <div>
    <Paper style={main} zDepth={1} />
    <Paper style={main} zDepth={2} />
  </div>
);

export default Home;
