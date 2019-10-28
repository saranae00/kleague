import React from 'react';

const StadiumInfo = ({ selectedStadium }) => {
  return (
    <div className="stadiumInfo_wrapper">
      <div className="stadiumInfo">
        <div className="stadiumInfo_row">
          <div className="stadiumInfo_name">{selectedStadium.name}</div>
        </div>
        <div className="stadiumInfo_row">
          <div className="stadiumInfo_home_title stadiumInfo_title">
            연고 구단
          </div>
          <div className="stadiumInfo_seperator">:</div>
          <div className="stadiumInfo_home stadiumInfo_content">
            {selectedStadium.team}
          </div>
        </div>
        <div className="stadiumInfo_row">
          <div className="stadiumInfo_maxPerson_title stadiumInfo_title">
            수용 인원
          </div>
          <div className="stadiumInfo_seperator">:</div>
          <div className="stadiumInfo_maxPerson stadiumInfo_content">
            {selectedStadium.maxPerson}
          </div>
        </div>
        <div className="stadiumInfo_row">
          <div className="stadiumInfo_addr_title stadiumInfo_title">주소</div>
          <div className="stadiumInfo_seperator">:</div>
          <div className="stadiumInfo_addr stadiumInfo_content">
            {selectedStadium.addr}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StadiumInfo;
