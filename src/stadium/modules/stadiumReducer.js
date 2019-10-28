import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
const CLICK_STADIUM = 'stadiumReducer/CLICK_STADIUM';
const SET_STADIUM_LIST = 'stadiumReducer/SET_STADIUM_LIST';

export const clickStadium = createAction(CLICK_STADIUM, stadium => stadium);
export const setStadiumList = createAction(SET_STADIUM_LIST);

const initialState = {
  selectedStadium: '',
  stadiumList: []
};

const stadiumReducer = handleActions(
  {
    [CLICK_STADIUM]: (state, action) =>
      produce(state, draft => {
        draft.selectedStadium = action.payload;
      }),
    [SET_STADIUM_LIST]: (state, action) =>
      produce(state, draft => {
        draft.stadiumList = action.payload;
      })
  },
  initialState
);

export default stadiumReducer;
