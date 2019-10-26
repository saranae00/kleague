import React from 'react';
import { useSelector } from 'react-redux';
import FloatLabel from '../components/FloatLabel';

const FloatLabelContainer = () => {
  const left = useSelector(state => state.roundGraph.left);
  const top = useSelector(state => state.roundGraph.top);
  const name = useSelector(state => state.roundGraph.name);
  const text = useSelector(state => state.roundGraph.text);

  return <FloatLabel name={name} text={text} left={left} top={top} />;
};

export default FloatLabelContainer;
