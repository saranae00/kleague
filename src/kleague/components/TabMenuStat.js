import React, { useState, Fragment, useEffect } from 'react';
import './TabMenu.css';
import cn from 'classnames';
import Rangking from './Rangking';

const TabMenuStat = matchList => {
  const tab = [
    {
      id: 0,
      subject: '순위 통계',
      content: <Rangking matchList={matchList} />
    },
    {
      id: 1,
      subject: '관중수 통계',
      content: <MatchStat matchItem={matchItem.matchItem} />
    },
    {
      id: 2,
      subject: '상대 전적',
      content: <MatchInfoItemYoutube matchItem={matchItem.matchItem} />
    }
  ];

  const useTab = (initialIndex, allTabs) => {
    const [tabIndex, setTabIndex] = useState(initialIndex);
    return {
      currentItem: allTabs[tabIndex],
      changeItem: setTabIndex
    };
  };

  const { currentItem, changeItem } = useTab(0, tab);

  useEffect(() => {
    changeItem(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matchList]);

  return (
    <Fragment>
      <div className="tab_buttons">
        {tab.map((item, index) => (
          <div
            className={cn(
              'tab_buttons_item',
              currentItem.id === index && 'tab_buttons_item_active'
            )}
            key={index}
            onClick={() => changeItem(index)}
          >
            {item.subject}
          </div>
        ))}
      </div>
      <div className="tab_contents">{currentItem.content}</div>
    </Fragment>
  );
};

export default TabMenuStat;
