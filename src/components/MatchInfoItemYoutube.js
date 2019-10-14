import React, { useState, useEffect } from 'react';
import YTSearch from 'youtube-api-search';

const MatchInfoItemYoutube = matchItems => {
  const API_KEY = 'AIzaSyBqFRwX0kgvEkUdsPRhJA2jE5HoBB6Bgyc';
  const [videoList, setVideoList] = useState([]);
  const { matchItem } = matchItems;

  const splDate = matchItem.match_date.split('-');

  splDate[1] = splDate[1] < 10 ? '0' + splDate[1] : splDate[1];
  splDate[2] = splDate[2] < 10 ? '0' + splDate[2] : splDate[2];

  useEffect(() => {
    const abortController = new AbortController();

    YTSearch(
      {
        key: API_KEY,
        term: `K리그1 ${matchItem.home} : ${matchItem.away} ${splDate[1]}.${
          splDate[2]
        } 경기 하이라이트`
      },
      function(data) {
        const dataList = data.map(dataItem => dataItem);
        setVideoList(dataList);
      }
    );
    return () => {
      abortController.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matchItem]);

  let url = '';
  if (videoList.length > 0) {
    url = `https://www.youtube.com/embed/${videoList[0].id.videoId}`;
  }

  return (
    <div className="matchInfoItem_youtube">
      {url ? (
        <iframe
          title="youtube_player"
          className="matchInfoItem_youtube_player"
          src={url}
        ></iframe>
      ) : (
        '영상 없음'
      )}
    </div>
  );
};

export default MatchInfoItemYoutube;
