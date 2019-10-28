import React from 'react';
import { useSelector } from 'react-redux';
import EtcInfo from '../components/EtcInfo';

const EtcInfoContainer = () => {
  const selectedEtc = useSelector(state => state.stadiumReducer.selectedEtc);
  return selectedEtc !== '' && <EtcInfo selectedEtc={selectedEtc} />;
};

export default EtcInfoContainer;
