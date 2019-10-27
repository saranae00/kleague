import { createAction, handleActions } from 'redux-actions';

const CLICK_STADIUM = 'stadiumReducer/CLICK_STADIUM';

export const clickStadium = createAction(CLICK_STADIUM, stadium => stadium);

const initialState = {
  selectedStadium: ''
};

const stadiumReducer = handleActions(
  {
    [CLICK_STADIUM]: (state, action) => {
      return {
        ...state,
        selectedStadium: action.payload
      };
    }
  },
  initialState
);

export default stadiumReducer;
