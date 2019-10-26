import React from 'react';
import cn from 'classnames';
import './Calendar.css';
import {
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaAngleLeft,
  FaAngleRight
} from 'react-icons/fa';

const CalendarDay = ({ date, onCalendarClick, selectedFullDate }) => {
  return (
    <div
      className={cn(
        'calendar-date',
        { 'calendar-date-sun': date.day === 0 },
        { 'calendar-date-satur': date.day === 6 },
        {
          'calendar-date-selected':
            selectedFullDate.year === date.year &&
            selectedFullDate.month === date.month &&
            selectedFullDate.date === date.dateNum
        },
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
  onCalendarClick,
  onPrevYear,
  onNextYear,
  onPrevMonth,
  onNextMonth,
  dateList,
  selectedFullDate
}) => {
  const onCalendarDateClick = item => {
    onCalendarClick(item);
  };
  const onPrevMonthClick = () => {
    onPrevMonth();
  };

  const onNextMonthClick = () => {
    onNextMonth();
  };

  const onPrevYearClick = () => {
    onPrevYear();
  };

  const onNextYearClick = () => {
    onNextYear();
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
        {dateList.map((dateItem, index) => (
          <CalendarDay
            key={index}
            date={dateItem}
            onCalendarClick={onCalendarDateClick}
            selectedFullDate={selectedFullDate}
          />
        ))}
      </div>
    </div>
  );
};

export default Calendar;
