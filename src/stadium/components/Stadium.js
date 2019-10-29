import React from 'react';
import StadiumMapContainer from '../containers/StadiumMapContainer';
import StadiumInfoContainer from '../containers/StadiumInfoContainer';
import TeamComboboxContainer from '../containers/TeamComboboxContainer';
import EtcInfoContainer from '../containers/EtcInfoContainer';

const Stadium = ({ stadiumList, type, selectedStadium, selectedEtc }) => {
  return (
    <div className="stadium_wrapper">
      <TeamComboboxContainer stadiumList={stadiumList} />
      {Array.isArray(stadiumList) && (
        <StadiumMapContainer stadiumList={stadiumList} />
      )}
      {type === '' &&
        '경기장 선택시, 주변 음식점과 커피숍을 조회하실 수 있습니다.'}
      {selectedStadium !== '' && <StadiumInfoContainer />}
      {selectedEtc !== '' && <EtcInfoContainer />}
    </div>
  );
};

export default Stadium;
