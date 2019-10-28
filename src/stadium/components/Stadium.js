import React from 'react';
import StadiumMapContainer from '../containers/StadiumMapContainer';
import StadiumInfoContainer from '../containers/StadiumInfoContainer';

const Stadium = ({ stadiumList }) => {
  console.log(stadiumList);
  return (
    <div className="stadium_wrapper">
      {Array.isArray(stadiumList) && (
        <StadiumMapContainer stadiumList={stadiumList} />
      )}
      <StadiumInfoContainer />
    </div>
  );
};

export default Stadium;
