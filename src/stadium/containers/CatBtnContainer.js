import React, { useCallback } from 'react';
import { setViewEtc } from '../modules/stadiumReducer';
import CatBtn from '../components/CatBtn';
import { useSelector, useDispatch } from 'react-redux';

const CatBtnContainer = () => {
  const selectedStadium = useSelector(
    state => state.stadiumReducer.selectedStadium
  );
  const dispatch = useDispatch();
  const onSetViewEtc = useCallback(etc => dispatch(setViewEtc(etc)), [
    dispatch
  ]);
  return (
    <CatBtn onSetViewEtc={onSetViewEtc} selectedStadium={selectedStadium} />
  );
};

export default CatBtnContainer;
