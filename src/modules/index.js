import { combineReducers } from 'redux';
import calendar from '../calendar/modules/calendar';
import roundGraph from '../graph/modules/roundGraph';
import roundGraphSpectator from '../graph/modules/roundGraphSpectator';
import roundGraphSpectatorByRound from '../graph/modules/roundGraphSpectatorByRound';

const rootReducer = combineReducers({
  calendar,
  roundGraph,
  roundGraphSpectator,
  roundGraphSpectatorByRound
});

export default rootReducer;
