import React from 'react';

const StadiumInfo = ({ selectedStadium }) => {
  return (
    <div className="stadiumInfo_wrapper">
      <div className="stadiumInfo_row">
        <div className="stadiumInfo_name">{selectedStadium.name}</div>
      </div>
      <div className="stadiumInfo_row">
        <div className="stadiumInfo_maxPerson">{selectedStadium.maxPerson}</div>
      </div>
      <div className="stadiumInfo_row">
        <div className="stadiumInfo_addr">{selectedStadium.addr}</div>
      </div>
    </div>
  );
};

export default StadiumInfo;
