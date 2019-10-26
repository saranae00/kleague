import { useState } from 'react';

export const useTab = (initialIndex, allTabs) => {
  const [tabIndex, setTabIndex] = useState(initialIndex);
  return {
    currentItem: allTabs[tabIndex],
    changeItem: setTabIndex
  };
};
