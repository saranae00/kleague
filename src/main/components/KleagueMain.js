import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import CalendarContainer from '../../calendar/containers/CalendarContainer';
import './kleague.css';
import MatchInfoContainer from '../../kleague/containers/MatchInfoContainer';
import cn from 'classnames';
import Rangking from '../../kleague/components/Rangking';
import Stadium from '../../stadium/components/Stadium';

const KleagueMain = () => {
  const [matchList, setMatchList] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const tab = [
    {
      id: 0,
      subject: '경기장 정보',
      content: <Stadium />
    },
    {
      id: 1,
      subject: '경기 정보',
      content: (
        <Fragment>
          <div className="main_calendar">
            <CalendarContainer matchList={matchList} />
          </div>
          <div className="main_matchInfo">
            <MatchInfoContainer />
          </div>
        </Fragment>
      )
    },
    {
      id: 2,
      subject: '통계',
      content: <Rangking matchList={matchList} />
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
    const getMatchList = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('./data/kleague.json');
        setMatchList(response.data);
      } catch (e) {
        console.log(e);
      }
      setIsLoading(false);
    };

    getMatchList();
  }, []);

  if (isLoading) {
    return <div>경기 데이터 로딩중...</div>;
  }

  if (!matchList) {
    return <div>경기 데이터 로딩중...</div>;
  }

  return (
    <Fragment>
      <div className="main_wrapper">
        <div className="main">
          <div className="main_tab_buttons">
            {tab.map((item, index) => (
              <div
                className={cn(
                  'main_tab_buttons_item',
                  currentItem.id === index && 'main_tab_buttons_item_active'
                )}
                key={index}
                onClick={() => changeItem(index)}
              >
                {item.subject}
              </div>
            ))}
          </div>
          <div>{currentItem.content}</div>
        </div>
      </div>
    </Fragment>
  );
};

export default KleagueMain;
