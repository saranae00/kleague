import React from 'react';
import { useSelector } from 'react-redux';
import FloatLabel from '../components/FloatLabel';

const FloatLabelContainer = () => {
  const left = useSelector(state => state.roundGraphSpectator.left);
  const top = useSelector(state => state.roundGraphSpectator.top);
  const name = useSelector(state => state.roundGraphSpectator.name);
  const text = useSelector(state => state.roundGraphSpectator.text);

  return <FloatLabel name={name} text={text} left={left} top={top} />;
};

export default FloatLabelContainer;
