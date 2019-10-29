import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import CalendarContainer from '../../calendar/containers/CalendarContainer';
import './kleague.css';
import MatchInfoContainer from '../../kleague/containers/MatchInfoContainer';
import cn from 'classnames';
import Rangking from '../../kleague/components/Rangking';
import StadiumContainer from '../../stadium/containers/StadiumContainer';
import { Link } from 'react-router-dom';

const KleagueMain = ({ match }) => {
  const [matchList, setMatchList] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { menuName } = match.params;

  const tab = [
    {
      id: 0,
      route: '/stadium',
      subject: '경기장 정보',
      content: <StadiumContainer />
    },
    {
      id: 1,
      route: '/matchInfo',
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
      route: '/stat',
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

  useEffect(() => {
    (() => {
      switch (menuName) {
        case 'stadium':
          changeItem(0);
          break;
        case 'matchInfo':
          changeItem(1);

          break;
        case 'stat':
          changeItem(2);
          break;
        default:
          changeItem(0);
          break;
      }
    })(menuName);
  }, [menuName, changeItem]);

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
              <Link
                className="link_main_tab_buttons_item"
                key={index}
                to={item.route}
              >
                <div
                  className={cn(
                    'main_tab_buttons_item',
                    currentItem.id === index && 'main_tab_buttons_item_active'
                  )}
                >
                  {item.subject}
                </div>
              </Link>
            ))}
          </div>
          <div>{currentItem.content}</div>
        </div>
      </div>
    </Fragment>
  );
};

export default KleagueMain;
