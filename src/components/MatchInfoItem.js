import React, { useState, useCallback, useEffect } from 'react';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';
import TabMenu from './TabMenu';

const MatchInfoItem = matchItems => {
  const emPath = './data/';
  const { matchItem } = matchItems;
  const [fold, setFold] = useState(false);

  const onToggle = useCallback(() => {
    setFold(!fold);
  }, [fold]);

  useEffect(() => {
    setFold(false);
  }, [matchItem]);

  const getEmFileName = team => {
    switch (team) {
      case '울산':
        return emPath + 'ulsan.png';
      case '전북':
        return emPath + 'jeonbuk.png';
      case '서울':
        return emPath + 'seoul.png';
      case '대구':
        return emPath + 'daegu.png';
      case '강원':
        return emPath + 'gangwon.png';
      case '포항':
        return emPath + 'pohang.png';
      case '상주':
        return emPath + 'sangju.png';
      case '수원':
        return emPath + 'suwon.png';
      case '성남':
        return emPath + 'seongnam.png';
      case '경남':
        return emPath + 'gyeongnam.png';
      case '인천':
        return emPath + 'incheon.png';
      case '제주':
        return emPath + 'jeju.png';
      default:
        return emPath + 'ulsan.png';
    }
  };

  return (
    <div className="matchInfoItem">
      <div className="matchInfoItem_scoreBoard" onClick={onToggle}>
        <div className="matchInfoItem_scoreBorad_team">
          <img
            className="matchInfoItem_scoreBorad_em"
            src={getEmFileName(matchItem.home)}
            alt={matchItem.home}
          />
          {matchItem.home}
        </div>
        <div className="matchInfoItem_scoreBorad_score">
          {matchItem.home_score}
        </div>
        <div className="matchInfoItem_scoreBorad_vs">:</div>
        <div className="matchInfoItem_scoreBorad_score">
          {matchItem.away_score}
        </div>
        <div className="matchInfoItem_scoreBorad_team">
          {matchItem.away}
          <img
            className="matchInfoItem_scoreBorad_em"
            src={getEmFileName(matchItem.away)}
            alt={matchItem.away}
          />
        </div>
        {fold ? <FaAngleDown /> : <FaAngleUp />}
      </div>
      {!fold && <TabMenu matchItem={matchItem} />}
    </div>
  );
};

export default MatchInfoItem;
