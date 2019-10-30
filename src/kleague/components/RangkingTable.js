import React, { Fragment } from 'react';
import './RangkingTable.css';
import { _MAX_TEAM, splitTeamsNum } from '../util/kleague';
import cn from 'classnames';

const RangkingTable = props => {
  const byTotal = props.byTotal;
  const splitNum = splitTeamsNum();
  return (
    <Fragment>
      <table className="rangkingTable">
        <tbody>
          <tr className="rangkingTable_row rangkingTable_title">
            <th></th>
            <th className="rangkingTable_rank">순위</th>
            <th className="rangkingTable_name">팀 이름</th>
            <th className="rangkingTable_winningpoint">승점</th>
            <th className="rangkingTable_matchNum">경기수</th>
            <th className="rangkingTable_goals">득점</th>
            <th className="rangkingTable_losts">실점</th>
            <th className="rangkingTable_goalsLosts">득실차</th>
          </tr>
          {byTotal.map((item, index) => (
            <tr
              key={index}
              className={cn(
                'rangkingTable_content',
                splitNum === index && 'rangkingTable_content_split'
              )}
            >
              {index === 0 && (
                <td className="rangkingTable_split" rowSpan={splitNum}>
                  스<br />플<br />릿<br />A
                </td>
              )}
              {index === splitNum && (
                <td rowSpan={_MAX_TEAM - splitNum}>
                  스<br />플<br />
                  릿<br />B
                </td>
              )}
              <td className="rangkingTable_rank">{index + 1}</td>
              <td className="rangkingTable_name">{item.name}</td>
              <td className="rangkingTable_winningpoint">
                {item.winningPoint}
              </td>
              <td className="rangkingTable_winningpoint">{item.matchNum}</td>
              <td className="rangkingTable_yellow">{item.getScore}</td>
              <td className="rangkingTable_red">{item.lostScore}</td>
              <td className="rangkingTable_red">
                {item.getScore - item.lostScore}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default RangkingTable;
