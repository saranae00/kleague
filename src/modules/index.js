import { combineReducers } from 'redux';
import calendar from './calendar';
import roundGraph from './roundGraph';
import roundGraphSpectator from './roundGraphSpectator';
import roundGraphSpectatorByRound from './roundGraphSpectatorByRound';

const rootReducer = combineReducers({
  calendar,
  roundGraph,
  roundGraphSpectator,
  roundGraphSpectatorByRound
});

export default rootReducer;
