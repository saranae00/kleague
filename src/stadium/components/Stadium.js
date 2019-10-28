import React from 'react';
import StadiumMapContainer from '../containers/StadiumMapContainer';
import StadiumInfoContainer from '../containers/StadiumInfoContainer';
import TeamComboboxContainer from '../containers/TeamComboboxContainer';
import EtcInfoContainer from '../containers/EtcInfoContainer';

const Stadium = ({ stadiumList, type }) => {
  return (
    <div className="stadium_wrapper">
      <TeamComboboxContainer stadiumList={stadiumList} />
      {Array.isArray(stadiumList) && (
        <StadiumMapContainer stadiumList={stadiumList} />
      )}
      {type === 'stadium' && <StadiumInfoContainer />}
      {type === 'etc' && <EtcInfoContainer />}
    </div>
  );
};

export default Stadium;
