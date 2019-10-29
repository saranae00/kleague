import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
const CLICK_STADIUM = 'stadiumReducer/CLICK_STADIUM';
const CLICK_ETC = 'stadiumReducer/CLICK_ETC';
const SET_STADIUM_LIST = 'stadiumReducer/SET_STADIUM_LIST';
const SET_VIEW_ETC = 'stadiumReducer/SET_VIEW_ETC';

export const clickStadium = createAction(CLICK_STADIUM, stadium => stadium);
export const clickEtc = createAction(CLICK_ETC, etc => etc);
export const setStadiumList = createAction(SET_STADIUM_LIST);
export const setViewEtc = createAction(SET_VIEW_ETC);

const initialState = {
  type: '',
  selectedStadium: '',
  selectedEtc: '',
  stadiumList: [],
  viewEtc: 'none' // none, restaurant, coffeeshop
};

const stadiumReducer = handleActions(
  {
    [CLICK_STADIUM]: (state, action) =>
      produce(state, draft => {
        draft.selectedStadium = action.payload;
        if (draft.selectedStadium === '') {
          draft.type = '';
        } else {
          draft.type = 'stadium';
        }
      }),
    [CLICK_ETC]: (state, action) =>
      produce(state, draft => {
        draft.selectedEtc = action.payload;
        if (action.payload === '') {
          if (draft.selectedStadium === '') {
            draft.type = '';
          } else {
            draft.type = 'stadium';
          }
        } else {
          draft.type = 'etc';
        }
      }),
    [SET_STADIUM_LIST]: (state, action) =>
      produce(state, draft => {
        draft.stadiumList = action.payload;
      }),
    [SET_VIEW_ETC]: (state, action) =>
      produce(state, draft => {
        draft.viewEtc = action.payload;
      })
  },
  initialState
);

export default stadiumReducer;
