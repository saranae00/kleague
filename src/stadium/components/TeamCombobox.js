import React from 'react';

const TeamCombobox = ({ stadiumList, selectedStadium, selectTeam }) => {
  const onSelectedTeam = e => {
    const result = stadiumList.find(item => item.id === e.target.value);
    selectTeam(result);
  };
  console.log(selectedStadium);
  return (
    <select
      className="stadiumInfo_teamCombobox"
      value={selectedStadium.id}
      onChange={onSelectedTeam}
    >
      {stadiumList.map(item => (
        <option key={item.id} value={item.id}>
          {item.shortTeam}
        </option>
      ))}
    </select>
  );
};

export default TeamCombobox;
