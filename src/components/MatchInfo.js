import React, { Fragment } from 'react';
import './MatchInfo.css';
import MatchInfoItem from './MatchInfoItem';

const MatchInfo = dateItem => {
  const { year, month, date, match } = dateItem;

  return (
    <div className="matchInfo_wrapper">
      <div className="matchInfo_label">
        {year}년 {month}월 {date}일{' '}
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
