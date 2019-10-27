import axios from 'axios';
const { kakao } = window;
/*eslint no-loop-func: "off"*/

let geocoder = new kakao.maps.services.Geocoder();

const sleep = ms => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

export const getStadiumList = async () => {
  try {
    let count = 0;
    const response = await axios.get('./data/stadiumData.json');

    for (let i = 0; i < response.data.length; i++) {
      geocoder.addressSearch(response.data[i].addr, function(result, status) {
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
