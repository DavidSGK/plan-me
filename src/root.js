import React from 'react';
import Header from './views/layouts/Header';

const Root = ({children}) => (
  <div>
    <Header />
    {children}
  </div>
);

export default Root;
