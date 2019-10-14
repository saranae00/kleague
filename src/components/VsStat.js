import React, { useState, Fragment } from 'react';
import CircularGraph from './CircularGraph';
import './vsStat.css';

const VsStat = props => {
  const { data } = props;
  const [home, setHome] = useState('none');
  const [away, setAway] = useState('none');

  let vsStat = {
    home_name: home,
    away_name: away,
    win: 0,
    lose: 0,
    draw: 0,
    score: 0,
    lost: 0
  };

  const onChangeHome = e => {
    if (e.target.value === away && away !== 'none') {
      alert('같은 팀을 선택 했습니다. 다시 선택해 주세요');
      setHome('none');
    } else {
      setHome(e.target.value);
    }
  };

  const onChangeAway = e => {
    if (e.target.value === home && home !== 'none') {
      alert('같은 팀을 선택 했습니다. 다시 선택해 주세요');
      setAway('none');
    } else {
      setAway(e.target.value);
    }
  };

  let mathchList = [];

  if (home !== 'none' && away !== 'none') {
    mathchList = data.filter(
      item =>
        (item.home === home && item.away === away) ||
        (item.home === away && item.away === home)
    );
  }

  for (let item of mathchList) {
    if (parseInt(item.home_score) > parseInt(item.away_score)) {
      if (item.home === home) {
        vsStat.win += 1;
        vsStat.score += parseInt(item.home_score);
        vsStat.lost += parseInt(item.away_score);
      } else {
        vsStat.lose += 1;
        vsStat.score += parseInt(item.away_score);
        vsStat.lost += parseInt(item.home_score);
      }
    } else if (parseInt(item.home_score) < parseInt(item.away_score)) {
      if (item.home === home) {
        vsStat.lose += 1;
        vsStat.score += parseInt(item.away_score);
        vsStat.lost += parseInt(item.home_score);
      } else {
        vsStat.win += 1;
        vsStat.score += parseInt(item.home_score);
        vsStat.lost += parseInt(item.away_score);
      }
    } else {
      vsStat.draw += 1;
      vsStat.score += parseInt(item.home_score);
      vsStat.lost += parseInt(item.away_score);
    }
  }

  const graphData = [
    {
      name: vsStat.home_name,
      value: vsStat.win
    },
    {
      name: vsStat.away_name,
      value: vsStat.lose
    },
    {
      name: '무승부',
      value: vsStat.draw
    }
  ];
  return (
    <Fragment>
      <div className="vsStat_seletTeam">
        {'팀 선택'} &nbsp;
        <select value={home} className="home_team" onChange={onChangeHome}>
          <option value="none">----</option>
          <option value="강원">강원</option>
          <option value="경남">경남</option>
          <option value="대구">대구</option>
          <option value="상주">상주</option>
          <option value="서울">서울</option>
          <option value="성남">성남</option>
          <option value="수원">수원</option>
          <option value="울산">울산</option>
          <option value="인천">인천</option>
          <option value="전북">전북</option>
          <option value="제주">제주</option>
          <option value="포항">포항</option>
        </select>
        &nbsp;
        <select value={away} className="away_team" onChange={onChangeAway}>
          <option value="none">----</option>
          <option value="강원">강원</option>
          <option value="경남">경남</option>
          <option value="대구">대구</option>
          <option value="상주">상주</option>
          <option value="서울">서울</option>
          <option value="성남">성남</option>
          <option value="수원">수원</option>
          <option value="울산">울산</option>
          <option value="인천">인천</option>
          <option value="전북">전북</option>
          <option value="제주">제주</option>
          <option value="포항">포항</option>
        </select>
      </div>
      {mathchList.length > 0 && (
        <div>
          <div className="vsStat_text">
            {`${vsStat.home_name} : ${vsStat.win}승 ${vsStat.draw}무 ${vsStat.lose}패 (${vsStat.score}득점 ${vsStat.lost}실점)`}
            <br />
            {`${vsStat.away_name} : ${vsStat.lose}승 ${vsStat.draw}무 ${vsStat.win}패 (${vsStat.lost}득점 ${vsStat.score}실점)`}
          </div>
          <div>
            <CircularGraph data={graphData} />
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default VsStat;
