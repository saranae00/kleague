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

const CalendarContainer = props => {
  const navYear = useSelector(state => state.calendar.navYear);
  const navMonth = useSelector(state => state.calendar.navMonth);
  const selectedFullDate = useSelector(
    state => state.calendar.selectedFullDate
  );
  const dispatch = useDispatch();

  let matchs = props.matchList;

  // 달력 데이터 생성
  const createCalenadar = (year, month) => {
    // year년 month월 1일의 요일 (0부터 일요일)
    let d1 =
      (year +
        (year - (year % 4)) / 4 -
        (year - (year % 100)) / 100 +
        (year - (year % 400)) / 400 +
        month * 2 +
        (month * 5 - ((month * 5) % 9)) / 9 -
        (month < 3
          ? year % 4 || (year % 100 === 0 && year % 400)
            ? 2
            : 3
          : 4)) %
      7;

    let dateList = [];

    let currentDate = new Date();
    currentDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate()
    );

    for (let i = 0; i < 42; i++) {
      let date = {
        id: i,
        year: 0,
        month: 0,
        dateNum: 0,
        day: 0,
        isToday: false,
        contents: []
      };

      // 월의 시작일 보다 작거나 마지막 일보다 클경우 빈칸
      if (
        i < d1 ||
        i >=
          d1 +
            (((month * 9 - ((month * 9) % 8)) / 8) % 2) +
            (month === 2
              ? year % 4 || (year % 100 === 0 && year % 400)
                ? 28
                : 29
              : 30)
      ) {
        date.dateNum = 0;
        date.day = i % 7;
      } else {
        date.dateNum = i + 1 - d1;
        date.day = i % 7;

        if (
          currentDate.toString() ===
          new Date(year, month - 1, date.dateNum).toString()
        ) {
          date.isToday = true;
        }

        const calDate = year + '-' + month + '-' + date.dateNum;

        // 경기 데이터와 달력 데이터 통합
        for (let i = 0; i < matchs.length; i++) {
          if (matchs[i].match_date === calDate) {
            date.contents.push({ ...matchs[i] });
          }
        }

        date.year = year;
        date.month = month;
      }
      dateList.push(date);
    }

    if (dateList[6].dateNum === 0) {
      dateList = dateList.slice(7, 41);
    } else if (dateList[35].dateNum === 0) {
      dateList = dateList.slice(0, 35);
    }
    return dateList;
  };

  let dateList = createCalenadar(navYear, navMonth);

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
      dateList={dateList}
      selectedFullDate={selectedFullDate}
    />
  );
};

export default React.memo(CalendarContainer);
