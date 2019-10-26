import { createAction, handleActions } from 'redux-actions';

const LOAD = 'roundGraphSpectator/LOAD';
const MOVE = 'roundGraphSpectator/MOVE';

const initialState = {
  left: 0,
  top: 0,
  name: '',
  text: '',
  arr: []
};

const roundGraphSpectator = handleActions(
  {
    [LOAD]: (state, action) => {
      let result = { ...state, arr: action.payload, name: '', text: '' };
      return result;
    },
    [MOVE]: (state, action) => {
      const rect = 5;
      let result = { ...state };

      let isExist = false;

      for (let i = 0; i < state.arr.length; i++) {
        let x = state.arr[i].x;
        let y = state.arr[i].y;
        if (
          x - rect < action.payload.left &&
          x + rect > action.payload.left &&
          y - rect < action.payload.top &&
          y + rect > action.payload.top
        ) {
          result = {
            ...state,
            left: action.payload.mouseX,
            top: action.payload.mouseY,
            name: state.arr[i].name,
            text: state.arr[i].value
          };
          isExist = true;
          break;
        }
      }
      if (!isExist) {
        result = { ...state, name: '', text: '' };
      }
      return result;
    }
  },
  initialState
);

export const load = createAction(LOAD);
export const move = createAction(MOVE);
export default roundGraphSpectator;
