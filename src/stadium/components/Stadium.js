import React from 'react';
import StadiumMapContainer from '../containers/StadiumMapContainer';
import StadiumInfoContainer from '../containers/StadiumInfoContainer';
import TeamComboboxContainer from '../containers/TeamComboboxContainer';

const Stadium = ({ stadiumList }) => {
  return (
    <div className="stadium_wrapper">
      <TeamComboboxContainer stadiumList={stadiumList} />
      {Array.isArray(stadiumList) && (
        <StadiumMapContainer stadiumList={stadiumList} />
      )}
      <StadiumInfoContainer />
    </div>
  );
};

export default Stadium;
