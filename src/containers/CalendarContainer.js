import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Calendar from '../components/Calendar';
import {
  calendarSelect,
  calendarPrevYear,
  calendarNextYear,
  calendarPrevMonth,
  calendarNextMonth
} from '../modules/calendar';

const CalendarContainer = matchList => {
  const navYear = useSelector(state => state.calendar.navYear);
  const navMonth = useSelector(state => state.calendar.navMonth);
  const dispatch = useDispatch();

  const onCalendarClick = useCallback(
    dateItem => dispatch(calendarSelect(dateItem)),
    [dispatch]
  );

  const onCalendarPrevMonth = useCallback(() => dispatch(calendarPrevMonth()), [
    dispatch
  ]);

  const onCalendarNextMonth = useCallback(() => dispatch(calendarNextMonth()), [
    dispatch
  ]);

  const onCalendarPrevYear = useCallback(() => dispatch(calendarPrevYear()), [
    dispatch
  ]);

  const onCalendarNextYear = useCallback(() => dispatch(calendarNextYear()), [
    dispatch
  ]);

  return (
    <Calendar
      year={navYear}
      month={navMonth}
      onCalendarClick={onCalendarClick}
      onPrevMonth={onCalendarPrevMonth}
      onNextMonth={onCalendarNextMonth}
      onPrevYear={onCalendarPrevYear}
      onNextYear={onCalendarNextYear}
      matchList={matchList}
    />
  );
};

export default React.memo(CalendarContainer);
