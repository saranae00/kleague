import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { load, move } from '../modules/roundGraphSpectatorByRound';
import RoundGraph from '../components/RoundGraph';

const RoundGraphSpectatorByRoundContainer = props => {
  const dispatch = useDispatch();
  const onGraphLoad = useCallback(arg => dispatch(load(arg)), [dispatch]);
  const onGraphMouseMove = useCallback(arg => dispatch(move(arg)), [dispatch]);
  return (
    <RoundGraph
      onGraphMouseMove={onGraphMouseMove}
      onGraphLoad={onGraphLoad}
      byRound={props.byRound}
      type={props.type}
      interval={props.interval}
      title={props.title}
      eachTeam={props.eachTeam}
    />
  );
};

export default RoundGraphSpectatorByRoundContainer;
