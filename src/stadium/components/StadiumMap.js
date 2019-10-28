import React, { useState, useEffect, useRef, useCallback } from 'react';
import './Stadium.css';
import produce from 'immer';
/*eslint no-loop-func: "off"*/
/*eslint no-unused-vars: "off"*/
const StadiumMap = ({
  selectedStadium,
  stadiumList,
  onClickMarker,
  onClickEtcMarker,
  etcMarker
}) => {
  const { kakao } = window;
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  let markerList = [];
  let etcMarkerList = [];
  let isMouseDown = false;
  let isDrag = false;

  // 마커 클릭시나 콤보박스 선택시 지도 이동 및 확대, 리덕스의 stadiumReducer.selectedStadium 변경
  const clickMarker = useCallback(
    (item, type) => {
      if (map) {
        if (item === '') {
          map.setLevel(14);
          map.panTo(new kakao.maps.Coords(523951.25, 1085073.75));
        } else {
          if (type === 'stadium') {
            onClickMarker(item);
            map.setLevel(5);
            map.panTo(item.latlng);
          } else {
            console.log(item);
            onClickEtcMarker(item);
            map.setLevel(5);
            map.panTo(new kakao.maps.LatLng(item.y, item.x));
          }
        }
      }
    },
    [map, onClickMarker, onClickEtcMarker, kakao.maps.Coords, kakao.maps.LatLng]
  );

  // target node에 이벤트 핸들러를 등록하는 함수
  const addEventHandle = (target, type, callback) => {
    if (target.addEventListener) {
      target.addEventListener(type, callback);
    } else {
      target.attachEvent('on' + type, callback);
    }
  };

  // target node에 등록된 이벤트 핸들러를 제거하는 함수
  const removeEventHandle = (target, type, callback) => {
    if (target.removeEventListener) {
      target.removeEventListener(type, callback);
    } else {
      target.detachEvent('on' + type, callback);
    }
  };

  // 커스텀 오버레이 드래그시 클릭 방지
  const onOverlayMouseDown = () => {
    isMouseDown = true;
  };

  // 커스텀 오버레이 드래그시 클릭 방지
  const onOverlayMouseMove = () => {
    isMouseDown && (isDrag = true);
  };

  const removeMarker = itemList => {
    for (let i = 0; i < itemList.length; i++) {
      itemList[i].marker.setMap(null);
      itemList[i].customOverlay.setMap(null);
    }
  };

  // 마커&커스텀 오버레이 생성 및 표시
  const setMarker = (itemList, type) => {
    for (let i = 0; i < itemList.length; i++) {
      let coords;
      if (type === 'stadium') {
        coords = itemList[i].latlng;
      } else {
        coords = new kakao.maps.LatLng(itemList[i].y, itemList[i].x);
      }
      // 커스텀 오버레이에 표시할 내용
      let content = document.createElement('div');
      content.className =
        type === 'stadium'
          ? 'stadiumMap_stadium_label'
          : 'stadiumMap_etc_label';
      if (type === 'stadium') {
        content.innerHTML = itemList[i].name;
      } else {
        content.innerHTML = itemList[i].place_name;
      }

      // 커스텀 오버레이를 생성
      const customOverlay = new kakao.maps.CustomOverlay({
        map: map,
        position: coords,
        content: content,
        yAnchor: type === 'stadium' ? 2.5 : 3
      });
      let marker;
      if (type !== 'stadium') {
        let imageSrc = './data/marker.svg', // 마커 이미지 url, 스프라이트 이미지를 씁니다
          imageSize = new kakao.maps.Size(50, 50), // 마커 이미지의 크기
          imgOptions = {
            offset: new kakao.maps.Point(13, 50) // 마커 좌표에 일치시킬 이미지 내에서의 좌표
          },
          markerImage = new kakao.maps.MarkerImage(
            imageSrc,
            imageSize,
            imgOptions
          );
        marker = new kakao.maps.Marker({
          position: coords, // 마커의 위치
          image: markerImage
        });
      } else {
        // 마커를 생성합니다
        marker = new kakao.maps.Marker({
          position: coords
        });
      }
      // 마커가 지도 위에 표시되도록 설정
      marker.setMap(map);

      // 마커 배열에 추가
      if (type === 'stadium') {
        markerList.push({
          marker: marker,
          customOverlay: customOverlay
        });
        // setMarkerList(
        //   produce(markerList, draft => {
        //     draft.push(marker);
        //   })
        // );
      } else {
        etcMarkerList.push({
          marker: marker,
          customOverlay: customOverlay
        });
        // setEtcMarkerList(
        //   produce(etcMarkerList, draft => {
        //     draft.push(marker);
        //   })
        // );
      }

      // 이벤트 핸들러 등록
      kakao.maps.event.addListener(marker, 'click', () => {
        if (!isDrag) {
          clickMarker(itemList[i], type);
        }
      });
      addEventHandle(content, 'mousedown', onOverlayMouseDown);
      addEventHandle(content, 'mousemove', onOverlayMouseMove);
      addEventHandle(content, 'mouseup', () => {
        isMouseDown = false;
        if (!isDrag) {
          clickMarker(itemList[i], type);
        }
        isDrag = false;
      });
    }
  };

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

  useEffect(() => {
    clickMarker(selectedStadium, 'stadium');
  }, [selectedStadium, clickMarker]);

  // 경기장 외의 마커 삭제
  useEffect(() => {
    return () => {
      removeMarker(etcMarkerList);
    };
  });
  setMarker(stadiumList, 'stadium');
  if (etcMarker) {
    setMarker(etcMarker, 'etc');
  }
  return <div ref={mapRef} id="kakaoMap"></div>;
};

export default React.memo(StadiumMap);
