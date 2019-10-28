import React, { useState, useEffect, useRef } from 'react';
import './Stadium.css';
/*eslint no-loop-func: "off"*/
/*eslint no-unused-vars: "off"*/
const StadiumMap = ({ stadiumList, onClickMarker }) => {
  const { kakao } = window;
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  let markerList = [];
  let isMouseDown = false;
  let isDrag = false;

  useEffect(() => {
    const kakaoMap = new kakao.maps.Map(mapRef.current, {
      center: new kakao.maps.Coords(523951.25, 1085073.75),
      level: 14
    });
    setMap(kakaoMap);
    // 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
    const zoomControl = new kakao.maps.ZoomControl();
    kakaoMap.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
    //eslint-disable-next-line
  }, []);

  const clickMarker = item => {
    onClickMarker(item);

    map.setLevel(4);
    map.panTo(item.latlng);
  };

  // target node에 이벤트 핸들러를 등록하는 함수
  function addEventHandle(target, type, callback) {
    if (target.addEventListener) {
      target.addEventListener(type, callback);
    } else {
      target.attachEvent('on' + type, callback);
    }
  }

  // target node에 등록된 이벤트 핸들러를 제거하는 함수
  function removeEventHandle(target, type, callback) {
    if (target.removeEventListener) {
      target.removeEventListener(type, callback);
    } else {
      target.detachEvent('on' + type, callback);
    }
  }

  // 커스텀 오버레이 드래그시 클릭 방지
  const onOverlayMouseDown = () => {
    isMouseDown = true;
  };

  // 커스텀 오버레이 드래그시 클릭 방지
  const onOverlayMouseMove = () => {
    isMouseDown && (isDrag = true);
  };

  const setMarker = stadiumList => {
    for (let i = 0; i < stadiumList.length; i++) {
      let coords = stadiumList[i].latlng;

      // 커스텀 오버레이에 표시할 내용
      let content = document.createElement('div');
      content.className = 'stadiumMap_label';
      content.innerHTML = stadiumList[i].name;

      // 커스텀 오버레이를 생성
      const customOverlay = new kakao.maps.CustomOverlay({
        map: map,
        position: coords,
        content: content,
        yAnchor: 3
      });
      // 마커를 생성합니다
      var marker = new kakao.maps.Marker({
        position: coords
      });

      // 마커가 지도 위에 표시되도록 설정합니다
      marker.setMap(map);
      markerList.push(marker);

      // 이벤트 핸들러 등록
      kakao.maps.event.addListener(marker, 'click', () => {
        if (!isDrag) {
          clickMarker(stadiumList[i]);
        }
      });
      addEventHandle(content, 'mousedown', onOverlayMouseDown);
      addEventHandle(content, 'mousemove', onOverlayMouseMove);
      addEventHandle(content, 'mouseup', () => {
        isMouseDown = false;
        if (!isDrag) {
          clickMarker(stadiumList[i]);
        }
        isDrag = false;
      });
    }
  };
  setMarker(stadiumList);

  return <div ref={mapRef} id="kakaoMap"></div>;
};

export default React.memo(StadiumMap);
