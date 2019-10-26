import React, { Fragment } from 'react';
import './MatchInfo.css';
import MatchInfoItem from './MatchInfoItem';

const MatchInfo = dateItem => {
  const { selectedFullDate, match } = dateItem;

  return (
    <div className="matchInfo_wrapper">
      <div className="matchInfo_label">
        {selectedFullDate.year}년 {selectedFullDate.month}월{' '}
        {selectedFullDate.date}일{' '}
      </div>
      {match.length > 0 ? (
        <Fragment>
          {match.map((matchItem, index) => (
            <MatchInfoItem key={index} matchItem={matchItem} />
          ))}
        </Fragment>
      ) : (
        <div className="matchInfo_info">경기 없음</div>
      )}
    </div>
  );
};

export default MatchInfo;
