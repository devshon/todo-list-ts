import React, { FC } from 'react';
import { Reset } from 'styled-reset';

import Todo from './Todo';

const App: FC = () => {
  return (
    <>
      <Reset />
      <Todo />
    </>
  );
};

export default App;
