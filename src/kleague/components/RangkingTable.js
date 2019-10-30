import React, { Fragment } from 'react';
import './RangkingTable.css';

const RangkingTable = props => {
  const byTotal = props.byTotal;

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
