import React, { useState, Fragment, useEffect } from 'react';
import MatchInfoBasicItem from './MatchInfoBasicItem';
import './TabMenu.css';
import MatchStat from './MatchStat';
import MatchInfoItemYoutube from './MatchInfoItemYoutube';
import cn from 'classnames';

const TabMenu = matchItem => {
  const tab = [
    {
      id: 0,
      subject: '경기 정보',
      content: <MatchInfoBasicItem matchItem={matchItem.matchItem} />
    },
    {
      id: 1,
      subject: '경기 통계',
      content: <MatchStat matchItem={matchItem.matchItem} />
    },
    {
      id: 2,
      subject: '경기 영상',
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
    const abortController = new AbortController();
    changeItem(0);
    return () => {
      abortController.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matchItem]);

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

export default TabMenu;
