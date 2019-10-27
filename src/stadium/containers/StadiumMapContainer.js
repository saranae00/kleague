import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import StadiumMap from '../components/StadiumMap';
import { clickStadium } from '../modules/stadiumReducer';

const StadiumMapContainer = ({ stadiumList }) => {
  const selectedStadium = useSelector(
    state => state.stadiumReducer.selectedStadium
  );
  const dispatch = useDispatch();
  const onClickMarker = useCallback(
    stadium => dispatch(clickStadium(stadium)),
    [dispatch]
  );

  useEffect(() => {
    return () => {
      onClickMarker('');
    };
  }, []);
  return (
    <StadiumMap
      selectedStadium={selectedStadium}
      stadiumList={stadiumList}
      onClickMarker={onClickMarker}
    />
  );
};

export default StadiumMapContainer;
