import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import StadiumMap from '../components/StadiumMap';
import { clickStadium, clickEtc } from '../modules/stadiumReducer';
import { getSearchData } from '../util/stadium';

const StadiumMapContainer = ({ stadiumList }) => {
  const [restaurant, setRestaurant] = useState([]);
  const selectedStadium = useSelector(
    state => state.stadiumReducer.selectedStadium
  );
  const dispatch = useDispatch();
  const onClickMarker = useCallback(
    stadium => dispatch(clickStadium(stadium)),
    [dispatch]
  );
  const onClickEtcMarker = useCallback(etc => dispatch(clickEtc(etc)), [
    dispatch
  ]);

  useEffect(() => {
    getSearchData(selectedStadium, 'FD6').then(response => {
      setRestaurant(response);
    });
  }, [selectedStadium]);

  useEffect(() => {
    return () => {
      onClickMarker('');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <StadiumMap
      selectedStadium={selectedStadium}
      etcMarker={restaurant}
      stadiumList={stadiumList}
      onClickMarker={onClickMarker}
      onClickEtcMarker={onClickEtcMarker}
    />
  );
};

export default StadiumMapContainer;
