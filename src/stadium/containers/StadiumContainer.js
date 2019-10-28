import React, { useEffect, useCallback } from 'react';
import { getStadiumList } from '../util/stadium';
import { useDispatch, useSelector } from 'react-redux';
import { setStadiumList } from '../modules/stadiumReducer';
import Stadium from '../components/Stadium';

const StadiumContainer = () => {
  const stadiumList = useSelector(state => state.stadiumReducer.stadiumList);
  const type = useSelector(state => state.stadiumReducer.type);
  const dispatch = useDispatch();

  const SetStadiumList = useCallback(
    stdList => dispatch(setStadiumList(stdList)),
    [dispatch]
  );

  useEffect(() => {
    getStadiumList().then(response => {
      SetStadiumList(response);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <Stadium stadiumList={stadiumList} type={type} />;
};

export default StadiumContainer;
