import React, { useEffect, Fragment } from 'react';
import cn from 'classnames';
import RangkingTable from './RangkingTable';
import RoundGraphContainer from '../containers/RoundGraphContainer';
import RoundGraphSpectatorContainer from '../containers/RoundGraphSpectatorContainer';
import RoundGraphSpectatorByRoundContainer from '../containers/RoundGraphSpectatorByRoundContainer';
import CircularGraph from '../../graph/components/CircularGraph';
import './Rangking.css';
import VsStat from './VsStat';
import {
  getMaxRound,
  calTeamArrayTotal,
  rankArrayByRound,
  getSpectatorByRound,
  getSpectatorByMatch,
  getSpectatorArrayByTeam
} from '../util/kleague';
import { useTab } from '../../hooks/hooks';
import { DndProvider } from 'react-dnd';
import TouchBackend from 'react-dnd-touch-backend';
import HTML5Backend from 'react-dnd-html5-backend';

const Rangking = props => {
  const matchList = props.matchList;
  const maxRound = getMaxRound(matchList);
  const teamArrayTotal = calTeamArrayTotal(maxRound, matchList);
  const rankByRound = rankArrayByRound(maxRound, matchList);
  const spectatorByRound = getSpectatorByRound(maxRound, matchList);
  const spectatorByMatch = getSpectatorByMatch(matchList);
  const spectatorArrayByTeam = getSpectatorArrayByTeam(teamArrayTotal);

  const backendOptions = {
    enableMouseEvents: true,
    enableHoverOutsideTarget: true
  };

  const smartPhones = [
    'iphone',
    'ipod',
    'windows ce',
    'android',
    'blackberry',
    'nokia',
    'webos',
    'opera mini',
    'sonyerricsson',
    'opera mobi',
    'iemobile'
  ];

  let isPhone = false;
  for (let i in smartPhones) {
    if (navigator.userAgent.toLowerCase().match(new RegExp(smartPhones[i]))) {
      isPhone = true;
    }
  }

  const backend = isPhone ? TouchBackend : HTML5Backend;

  const tab = [
    {
      id: 0,
      subject: '순위',
      content: (
        <Fragment>
          <div>
            <RangkingTable byTotal={teamArrayTotal} />
          </div>
          <div className="rankingByRound_label stat_label">라운드별 순위</div>
          <div>
            <RoundGraphContainer
              byRound={rankByRound}
              type="rank"
              interval="1"
              title="라운드별 순위"
              eachTeam="true"
            />
          </div>
        </Fragment>
      )
    },
    {
      id: 1,
      subject: '관중수',
      content: (
        <Fragment>
          <div className="spectatorByRound_label stat_label">
            라운드별 관중수
          </div>
          <div>
            <RoundGraphSpectatorByRoundContainer
              byRound={spectatorByRound}
              interval="10000"
              title="라운드별 관중수"
              eachTeam="false"
              type="spectator"
            />
          </div>
          <div className="spectatorByMatch_label stat_label">경기별 관중수</div>
          <div>
            <RoundGraphSpectatorContainer
              byRound={spectatorByMatch}
              interval="1000"
              title="경기별 관중수"
              eachTeam="true"
              type="spectatorByRound"
            />
          </div>
          <div className="spectatorByTeam_label stat_label">팀별 관중수</div>
          <div>
            <CircularGraph
              data={spectatorArrayByTeam}
              title="팀별 관중수"
            ></CircularGraph>
          </div>
        </Fragment>
      )
    },
    {
      id: 2,
      subject: '상대전적',
      content: (
        <Fragment>
          <div className="spectatorByRound_label stat_label">상대전적</div>
          <DndProvider backend={backend} options={backendOptions}>
            <VsStat data={matchList} />
          </DndProvider>
        </Fragment>
      )
    }
  ];

  const { currentItem, changeItem } = useTab(0, tab);

  useEffect(() => {
    const abortController = new AbortController();
    changeItem(0);
    return () => {
      abortController.abort();
    };
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

export default Rangking;
