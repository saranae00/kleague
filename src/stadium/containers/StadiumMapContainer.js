import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import StadiumMap from '../components/StadiumMap';
import { clickStadium, clickEtc, setViewEtc } from '../modules/stadiumReducer';
import { getSearchData } from '../util/stadium';

const StadiumMapContainer = ({ stadiumList }) => {
  const [etc, setEtc] = useState([]);
  const selectedStadium = useSelector(
    state => state.stadiumReducer.selectedStadium
  );
  const viewEtc = useSelector(state => state.stadiumReducer.viewEtc);
  const dispatch = useDispatch();
  const onClickMarker = useCallback(
    stadium => dispatch(clickStadium(stadium)),
    [dispatch]
  );
  const onClickEtcMarker = useCallback(etc => dispatch(clickEtc(etc)), [
    dispatch
  ]);
  const onSetViewEtc = useCallback(etc => dispatch(setViewEtc(etc)), [
    dispatch
  ]);

  useEffect(() => {
    (viewEtc => {
      switch (viewEtc) {
        case 'restaurant':
          getSearchData(selectedStadium, 'FD6').then(response => {
            setEtc(response);
          });
          break;
        case 'coffeeshop':
          getSearchData(selectedStadium, 'CE7').then(response => {
            setEtc(response);
          });
          break;
        default:
          setEtc([]);
          break;
      }
    })(viewEtc);
  }, [selectedStadium, viewEtc]);

  useEffect(() => {
    return () => {
      onClickMarker('');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <StadiumMap
      selectedStadium={selectedStadium}
      etcMarker={etc}
      stadiumList={stadiumList}
      onClickMarker={onClickMarker}
      onClickEtcMarker={onClickEtcMarker}
      viewEtc={viewEtc}
      onSetViewEtc={onSetViewEtc}
    />
  );
};

export default StadiumMapContainer;
