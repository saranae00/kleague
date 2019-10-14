import React from 'react';
import { useSelector } from 'react-redux';
import MatchInfo from '../components/MatchInfo';

const MatchInfoContainer = () => {
  const match = useSelector(state => state.calendar.selectedMatch);
  const year = useSelector(state => state.calendar.selectedYear);
  const month = useSelector(state => state.calendar.selectedMonth);
  const date = useSelector(state => state.calendar.selectedDate);

  return <MatchInfo year={year} month={month} date={date} match={match} />;
};

export default MatchInfoContainer;
