import React, { useState } from 'react';
import cn from 'classnames';
import {
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaAngleLeft,
  FaAngleRight
} from 'react-icons/fa';

const CalendarDay = ({ date, onCalendarClick }) => {
  return (
    <div
      className={cn(
        'calendar-date',
        { 'calendar-date-sun': date.day === 0 },
        { 'calendar-date-satur': date.day === 6 },
        { 'calendar-date-selected': date.selected },
        { 'calendar-date-today': date.isToday }
      )}
      onClick={date.year !== 0 ? () => onCalendarClick(date) : null}
    >
      {date.contents.length > 0 && (
        <div className="calendar-date-triangle"></div>
      )}
      {date.dateNum ? (
        <div className="calendar-date-dateNum">{date.dateNum} </div>
      ) : null}
    </div>
  );
};

const Calendar = ({
  year,
  month,
  date,
  onCalendarClick,
  onPrevYear,
  onNextYear,
  onPrevMonth,
  onNextMonth,
  matchList
}) => {
  let matchs = matchList.matchList;

  const CreateCalenadar = (year, month) => {
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

  let dateList = CreateCalenadar(year, month, date);

  const [dates, setDateList] = useState(dateList);
  const onCalendarDateClick = item => {
    setDateList(dates =>
      dates.map(dateItem =>
        dateItem.id === item.id
          ? { ...dateItem, selected: true }
          : { ...dateItem, selected: false }
      )
    );
    onCalendarClick(item);
  };

  const onPrevMonthClick = () => {
    onPrevMonth();
    dateList = CreateCalenadar(year, month - 1, date);
    setDateList(dateList);
  };

  const onNextMonthClick = () => {
    onNextMonth();
    dateList = CreateCalenadar(year, month + 1, date);
    setDateList(dateList);
  };

  const onPrevYearClick = () => {
    onPrevYear();
    dateList = CreateCalenadar(year - 1, month, date);
    setDateList(dateList);
  };

  const onNextYearClick = () => {
    onNextYear();
    dateList = CreateCalenadar(year + 1, month, date);
    setDateList(dateList);
  };
  return (
    <div className="calendar">
      <div className="calendar-label-wrapper">
        <button className="calendar-prev-year" onClick={onPrevYearClick}>
          <FaAngleDoubleLeft />
        </button>
        <button className="calendar-prev-month" onClick={onPrevMonthClick}>
          <FaAngleLeft />
        </button>
        <div className="calendar-label">
          <div className="calendar-label-year">{year}년</div>
          <div className="calendar-label-month">{month}월</div>
        </div>
        <button className="calendar-next-month" onClick={onNextMonthClick}>
          <FaAngleRight />
        </button>
        <button className="calendar-next-year" onClick={onNextYearClick}>
          <FaAngleDoubleRight />
        </button>
      </div>
      <div className="calendar-body">
        <div className="calendar-day calendar-date-sun">일</div>
        <div className="calendar-day">월</div>
        <div className="calendar-day">화</div>
        <div className="calendar-day">수</div>
        <div className="calendar-day">목</div>
        <div className="calendar-day">금</div>
        <div className="calendar-day calendar-date-satur">토</div>
        {dates.map((dateItem, index) => (
          <CalendarDay
            key={index}
            date={dateItem}
            onCalendarClick={onCalendarDateClick}
          />
        ))}
      </div>
    </div>
  );
};

export default Calendar;
