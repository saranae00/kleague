import React from 'react';

const StadiumInfo = ({ selectedEtc }) => {
  return (
    <div className="etcInfo_wrapper">
      <div className="etcInfo">
        <div className="etcInfo_row">
          <div className="etcInfo_name">{selectedEtc.place_name}</div>
        </div>
        <div className="etcInfo_row">
          <div className="etcInfo_cat">
            카테고리 : {selectedEtc.category_name}
          </div>
        </div>
        <div className="etcInfo_row">
          <div className="etcInfo_phone_title etcInfo_title">전화 번호</div>
          <div className="etcInfo_seperator">:</div>
          <div className="etcInfo_phone etcInfo_content">
            {selectedEtc.phone}
          </div>
        </div>
        <div className="etcInfo_row">
          <div className="etcInfo_addr_title etcInfo_title">주소</div>
          <div className="etcInfo_seperator">:</div>
          <div className="etcInfo_addr etcInfo_content">
            {selectedEtc.address_name}
          </div>
        </div>
        <div className="etcInfo_row">
          <div className="etcInfo_detail">
            <a href={selectedEtc.place_url} target="_new">
              상세보기
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StadiumInfo;
