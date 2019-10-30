import axios from 'axios';
const { kakao } = window;
/*eslint no-loop-func: "off"*/

const sleep = ms => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

export const getStadiumList = async () => {
  try {
    let count = 0;
    const geocoder = new kakao.maps.services.Geocoder();
    const response = await axios.get('./data/stadiumData.json');

    for (let i = 0; i < response.data.length; i++) {
      geocoder.addressSearch(response.data[i].addr, (result, status) => {
        // 정상적으로 검색이 완료됐으면
        if (status === kakao.maps.services.Status.OK) {
          response.data[i].latlng = new kakao.maps.LatLng(
            result[0].y,
            result[0].x
          );
          count += 1;
        }
      });
    }
    while (response.data.length > count) {
      await sleep(100);
    }
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

export const getSearchData = async (stadium, keyword) => {
  if (stadium) {
    let result = [];
    let response = [];
    let responsePage = 0;

    const placesSearchCB = (data, status, pagination) => {
      if (status === kakao.maps.services.Status.OK) {
        // 정상적으로 검색이 완료됐으면
        // 검색 목록과 마커를 표출합니다
        response = data;

        // 페이지 번호를 표출합니다
        responsePage = pagination;
      } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
        response = '없음';
      } else if (status === kakao.maps.services.Status.ERROR) {
        response = 'error';
      }
    };
    let maxPage = 1;
    for (let i = 1; i < maxPage + 1; i++) {
      response = [];
      responsePage = 0;
      let options = {
        page: i,
        location: stadium.latlng,
        useMapBounds: true
      };
      let ps = new kakao.maps.services.Places();
      ps.categorySearch(keyword, placesSearchCB, options);

      while (response.length === 0 || responsePage === 0) {
        await sleep(100);
      }

      result = result.concat(response);
      maxPage = parseInt(responsePage.last);
    }
    return result;
  }
};
