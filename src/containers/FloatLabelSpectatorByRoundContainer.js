import React from 'react';
import { useSelector } from 'react-redux';
import FloatLabel from '../components/FloatLabel';

const FloatLabelSpectatorByRoundContainer = () => {
  const left = useSelector(state => state.roundGraphSpectatorByRound.left);
  const top = useSelector(state => state.roundGraphSpectatorByRound.top);
  const name = useSelector(state => state.roundGraphSpectatorByRound.name);
  const text = useSelector(state => state.roundGraphSpectatorByRound.text);

  return <FloatLabel name={name} text={text} left={left} top={top} />;
};

export default FloatLabelSpectatorByRoundContainer;
