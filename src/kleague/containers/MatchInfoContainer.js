import React from 'react';
import { useSelector } from 'react-redux';
import MatchInfo from '../components/MatchInfo';

const MatchInfoContainer = () => {
  const match = useSelector(state => state.calendar.selectedMatch);
  const selectedFullDate = useSelector(
    state => state.calendar.selectedFullDate
  );

  return <MatchInfo selectedFullDate={selectedFullDate} match={match} />;
};

export default MatchInfoContainer;
