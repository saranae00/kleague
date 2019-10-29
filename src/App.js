import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import KleagueMain from './main/components/KleagueMain';

function App() {
  return (
    <div>
      <Route path="/" component={KleagueMain} exact={true} />
      <Route path="/:menuName" component={KleagueMain} exact={true} />
    </div>
  );
}

export default App;
