import React from 'react';
import { useSelector } from 'react-redux';
import StadiumInfo from '../components/StadiumInfo';

const StadiumInfoContainer = () => {
  const selectedStadium = useSelector(
    state => state.stadiumReducer.selectedStadium
  );
  console.log(selectedStadium);
  return (
    selectedStadium !== '' && <StadiumInfo selectedStadium={selectedStadium} />
  );
};

export default StadiumInfoContainer;
