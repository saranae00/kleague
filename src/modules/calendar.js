import { createAction, handleActions } from 'redux-actions';

const SELECT = 'calendar/SELECT';
const NEXT_YEAR = 'calendar/NEXT_YEAR';
const PREV_YEAR = 'calendar/PREV_YEAR';
const NEXT_MONTH = 'calendar/NEXT_MONTH';
const PREV_MONTH = 'calendar/PREV_MONTH';

const currentDate = new Date();

const initialState = {
  navYear: currentDate.getFullYear(),
  navMonth: currentDate.getMonth() + 1,
  navDate: currentDate.getDate(),
  selectedYear: currentDate.getFullYear(),
  selectedMonth: currentDate.getMonth() + 1,
  selectedDate: currentDate.getDate(),
  selectedMatch: []
};

const calendar = handleActions(
  {
    [SELECT]: (state, action) => {
      const fullDate = new Date(
        action.payload.year,
        action.payload.month - 1,
        action.payload.dateNum
      );

      const result = {
        ...state,
        selectedYear: fullDate.getFullYear(),
        selectedMonth: fullDate.getMonth() + 1,
        selectedDate: fullDate.getDate(),
        selectedMatch: action.payload.contents
      };
      return result;
    },
    [PREV_MONTH]: state => {
      let fullDate = new Date(state.navYear, state.navMonth - 2, 1);
      let result = {
        ...state,
        navYear: fullDate.getFullYear(),
        navMonth: fullDate.getMonth() + 1
      };
      return result;
    },
    [NEXT_MONTH]: state => {
      let fullDate = new Date(state.navYear, state.navMonth, 1);
      let result = {
        ...state,
        navYear: fullDate.getFullYear(),
        navMonth: fullDate.getMonth() + 1
      };
      return result;
    },
    [PREV_YEAR]: state => ({
      ...state,
      navYear: state.navYear - 1
    }),
    [NEXT_YEAR]: state => ({
      ...state,
      navYear: state.navYear + 1
    })
  },
  initialState
);

export const calendarSelect = createAction(SELECT, dateItem => dateItem);
export const calendarPrevYear = createAction(PREV_YEAR);
export const calendarNextYear = createAction(NEXT_YEAR);
export const calendarPrevMonth = createAction(PREV_MONTH);
export const calendarNextMonth = createAction(NEXT_MONTH);

export default calendar;
