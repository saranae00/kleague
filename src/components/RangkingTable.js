import React, { Fragment } from 'react';
import './RangkingTable.css';

const RangkingTable = props => {
  const byTotal = props.byTotal;

  const sortTable = (a, b) => {
    // 승점 순
    if (a.winningPoint !== b.winningPoint) {
      return b.winningPoint - a.winningPoint;
    } else {
      // 승점이 같을 경우, 다득점
      if (a.getScore !== b.getScore) {
        return b.getScore - a.getScore;
      } else {
        //득점이 같을 경우, 득실차
        if (a.getScore - a.lostScore !== b.getScore - b.lostScore) {
          return b.getScore - b.lostScore - (a.getScore - a.lostScore);
        } else {
          //득실차가 같을 경우, 다승 순
          return b.win - a.win;
        }
      }
    }
  };

  byTotal.sort((a, b) => sortTable(a, b));

  return (
    <Fragment>
      <table className="rangkingTable">
        <tbody>
          <tr className="rangkingTable_row rangkingTable_title">
            <td className="rangkingTable_rank">순위</td>
            <td className="rangkingTable_name">팀 이름</td>
            <td className="rangkingTable_winningpoint">승점</td>
            <td className="rangkingTable_winningpoint">경기수</td>
            <td className="rangkingTable_yellow">득점</td>
            <td className="rangkingTable_red">실점</td>
            <td className="rangkingTable_red">득실차</td>
          </tr>
          {byTotal.map((item, index) => (
            <tr key={index} className="rangkingTable_content">
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
