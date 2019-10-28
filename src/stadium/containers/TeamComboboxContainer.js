import React, { useCallback } from 'react';
import TeamCombobox from '../components/TeamCombobox';
import { useDispatch, useSelector } from 'react-redux';
import { clickStadium } from '../modules/stadiumReducer';

const TeamComboboxContainer = ({ stadiumList }) => {
  const selectedStadium = useSelector(
    state => state.stadiumReducer.selectedStadium
  );
  const dispatch = useDispatch();
  const selectTeam = useCallback(stadium => dispatch(clickStadium(stadium)), [
    dispatch
  ]);

  return (
    <div className="stadiumInfo_teamCombobox_wrapper">
      <TeamCombobox
        stadiumList={stadiumList}
        selectedStadium={selectedStadium}
        selectTeam={selectTeam}
      />
    </div>
  );
};

export default TeamComboboxContainer;
