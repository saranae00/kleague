import React, { Fragment } from 'react';
import MatchStatItem from './MatchStatItem';
import './MatchStat.css';

const MatchStat = matchItems => {
  const { matchItem } = matchItems;

  return (
    <Fragment>
      {matchItem ? <MatchStatItem matchItem={matchItem} /> : `경기 없음`}
    </Fragment>
  );
};

export default MatchStat;
