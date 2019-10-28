import React, { useState, Fragment, useCallback } from 'react';
import CircularGraph from '../../graph/components/CircularGraph';
import VsStatDustbin from './VsStatDustbin';
import VsStatItem from './VsStatItem';
import VsStatItemType from './VsStatItemType';
import './vsStat.css';
import { produce } from 'immer';

const VsStat = props => {
  const { data } = props;
  const [home, setHome] = useState('none');
  const [away, setAway] = useState('none');
  const [dustbins, setDustbins] = useState([
    { accepts: [VsStatItemType.HOME], lastDroppedItem: null },
    { accepts: [VsStatItemType.AWAY], lastDroppedItem: null }
  ]);
  const [boxes] = useState([
    { name: '강원', type: VsStatItemType.HOME },
    { name: '경남', type: VsStatItemType.HOME },
    { name: '대구', type: VsStatItemType.HOME },
    { name: '상주', type: VsStatItemType.HOME },
    { name: '서울', type: VsStatItemType.HOME },
    { name: '성남', type: VsStatItemType.HOME },
    { name: '수원', type: VsStatItemType.HOME },
    { name: '울산', type: VsStatItemType.HOME },
    { name: '인천', type: VsStatItemType.HOME },
    { name: '전북', type: VsStatItemType.HOME },
    { name: '제주', type: VsStatItemType.HOME },
    { name: '포항', type: VsStatItemType.HOME },
    { name: '강원', type: VsStatItemType.AWAY },
    { name: '경남', type: VsStatItemType.AWAY },
    { name: '대구', type: VsStatItemType.AWAY },
    { name: '상주', type: VsStatItemType.AWAY },
    { name: '서울', type: VsStatItemType.AWAY },
    { name: '성남', type: VsStatItemType.AWAY },
    { name: '수원', type: VsStatItemType.AWAY },
    { name: '울산', type: VsStatItemType.AWAY },
    { name: '인천', type: VsStatItemType.AWAY },
    { name: '전북', type: VsStatItemType.AWAY },
    { name: '제주', type: VsStatItemType.AWAY },
    { name: '포항', type: VsStatItemType.AWAY }
  ]);
  const [droppedBoxNames, setDroppedBoxNames] = useState([]);

  function isDropped(boxName) {
    return droppedBoxNames.indexOf(boxName) > -1;
  }
  const handleDrop = useCallback(
    (index, item) => {
      const { name } = item;
      setDroppedBoxNames(
        // 데이터의 최대 갯수가 2개인 큐의 형태로 구현
        produce(droppedBoxNames, draft => {
          draft.push(name);
          if (draft.length > 2) {
            draft.shift();
          }
          return draft;
        })
      );
      setDustbins(
        produce(dustbins, draft => {
          draft[index].lastDroppedItem = { ...item };
          return draft;
        })
      );
      item.type === VsStatItemType.HOME ? setHome(name) : setAway(name);
    },
    [dustbins, droppedBoxNames]
  );

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
      const name = e.target.value;
      setHome(name);
      setDroppedBoxNames(
        // 데이터의 최대 갯수가 2개인 큐의 형태로 구현
        produce(droppedBoxNames, draft => {
          draft.push(name);
          if (draft.length > 2) {
            draft.shift();
          }
          return draft;
        })
      );
      setDustbins(
        produce(draft => {
          draft[0].lastDroppedItem = {
            name: name,
            type: VsStatItemType.HOME
          };
          return draft;
        })
      );
    }
  };

  const onChangeAway = e => {
    if (e.target.value === home && home !== 'none') {
      alert('같은 팀을 선택 했습니다. 다시 선택해 주세요');
      setAway('none');
    } else {
      const name = e.target.value;
      setAway(name);
      setDroppedBoxNames(
        // 데이터의 최대 갯수가 2개인 큐의 형태로 구현
        produce(droppedBoxNames, draft => {
          draft.push(name);
          if (draft.length > 2) {
            draft.shift();
          }
          return draft;
        })
      );
      setDustbins(
        produce(draft => {
          draft[1].lastDroppedItem = {
            name: name,
            type: VsStatItemType.AWAY
          };
          return draft;
        })
      );
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

  const vsStatCircularGraphWidth =
    document.documentElement.clientWidth > 768
      ? parseInt(document.documentElement.clientWidth * 0.1)
      : parseInt(document.documentElement.clientWidth * 0.3);

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
      <div className="vsStat_content">
        <div
          className="vsStat_home_item"
          style={{ overflow: 'hidden', clear: 'both' }}
        >
          {boxes.map(
            ({ name, type }, index) =>
              type === 'home' && (
                <VsStatItem
                  name={name}
                  type={type}
                  isDropped={isDropped(name)}
                  key={index}
                />
              )
          )}
        </div>
        <div className="vsStat_home_dustbin">
          {dustbins.map(
            ({ accepts, lastDroppedItem }, index) =>
              accepts[0] === 'home' && (
                <VsStatDustbin
                  accept={accepts}
                  lastDroppedItem={lastDroppedItem}
                  onDrop={item => handleDrop(index, item)}
                  key={index}
                />
              )
          )}
        </div>
        <div className="vsStat_graph">
          {mathchList.length > 0 && (
            <Fragment>
              <div className="vsStat_text">
                {`${vsStat.home_name} : ${vsStat.win}승 ${vsStat.draw}무 ${vsStat.lose}패 (${vsStat.score}득점 ${vsStat.lost}실점)`}
                <br />
                {`${vsStat.away_name} : ${vsStat.lose}승 ${vsStat.draw}무 ${vsStat.win}패 (${vsStat.lost}득점 ${vsStat.score}실점)`}
              </div>
              <div>
                <CircularGraph
                  data={graphData}
                  width={vsStatCircularGraphWidth}
                />
              </div>
            </Fragment>
          )}
        </div>
        <div className="vsStat_away_dustbin">
          {dustbins.map(
            ({ accepts, lastDroppedItem }, index) =>
              accepts[0] === 'away' && (
                <VsStatDustbin
                  accept={accepts}
                  lastDroppedItem={lastDroppedItem}
                  onDrop={item => handleDrop(index, item)}
                  key={index}
                />
              )
          )}
        </div>
        <div className="vsStat_away_item">
          {boxes.map(
            ({ name, type }, index) =>
              type === 'away' && (
                <VsStatItem
                  name={name}
                  type={type}
                  isDropped={isDropped(name)}
                  key={index}
                />
              )
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default VsStat;
