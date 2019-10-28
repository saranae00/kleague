import React, { useState, useEffect } from 'react';
import { getStadiumList } from '../util/stadium';
import StadiumMapContainer from '../containers/StadiumMapContainer';
import StadiumInfoContainer from '../containers/StadiumInfoContainer';

const Stadium = () => {
  const [stadiumList, setStadiumList] = useState([]);

  useEffect(() => {
    getStadiumList().then(response => {
      setStadiumList(response);
    });
  }, []);
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
