import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import './components/Calendar.css';
import KleagueMain from './components/KleagueMain';
import rootReducer from './modules';

const store = createStore(rootReducer);

function App() {
  return (
    <Provider store={store}>
      <KleagueMain />
    </Provider>
  );
}

export default App;
