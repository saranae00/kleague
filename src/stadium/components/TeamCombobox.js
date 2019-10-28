import React from 'react';

const TeamCombobox = ({ stadiumList, selectedStadium, selectTeam }) => {
  const onSelectedTeam = e => {
    const result = stadiumList.find(item => item.id === e.target.value);
    if (e.target.value === '-1') {
      selectTeam('');
    } else {
      selectTeam(result);
    }
  };

  return (
    <select
      className="stadiumInfo_teamCombobox"
      value={selectedStadium === '' ? '-1' : selectTeam.id}
      onChange={onSelectedTeam}
    >
      <option value="-1">------</option>
      {stadiumList.map(item => (
        <option key={item.id} value={item.id}>
          {item.shortTeam}
        </option>
      ))}
    </select>
  );
};

export default TeamCombobox;
