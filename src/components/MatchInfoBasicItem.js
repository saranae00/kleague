import React, { Fragment } from 'react';
import produce from 'immer';

const MatchInfoBasicItem = matchItems => {
  let matchItem = produce(matchItems.matchItem, () => {});
  if (
    matchItem.home_goal.length === 0 ||
    matchItem.away_goal.length > matchItem.home_goal.length
  ) {
    for (
      let i = 0;
      i < matchItem.away_goal.length - matchItem.home_goal.length + 1;
      i++
    ) {
      matchItem.home_goal.push({
        player: '',
        time: '',
        own: 'false',
        assist_player: ''
      });
    }
  }
  if (
    matchItem.away_goal.length === 0 ||
    matchItem.away_goal.length < matchItem.home_goal.length
  ) {
    for (
      let i = 0;
      i < matchItem.home_goal.length - matchItem.away_goal.length + 1;
      i++
    ) {
      matchItem.away_goal.push({
        player: '',
        time: '',
        own: 'false',
        assist_player: ''
      });
    }
  }

  if (
    matchItem.home_goal.length === 0 ||
    matchItem.home_goal.length < matchItem.away_goal.length
  ) {
    for (
      let i = 0;
      i < matchItem.away_goal.length - matchItem.home_goal.length + 1;
      i++
    ) {
      matchItem.home_goal.push({
        player: '',
        time: '',
        own: 'false',
        assist_player: ''
      });
    }
  }
  return (
    <Fragment>
      <div className="matchInfoItem_spec">
        {matchItem.match_time}&nbsp;({matchItem.stadium})
        <br />
        관중수 : {matchItem.spectator}
      </div>
      <div className="matchInfoItem_info">
        <div className="matchInfoItem_info_home">
          <div className="matchInfoItem_info_title">득점</div>
          {matchItem.home_goal.map((home_goal, index) => (
            <div className="matchInfoItem_info_scorer" key={index}>
              <div className="matchInfoItem_info_scorer_name">
                {home_goal.player}
              </div>
              <div className="matchInfoItem_info_scorer_time">
                {home_goal.player
                  ? `('${home_goal.time}
                ${home_goal.assist_player && `, ${home_goal.assist_player}`})`
                  : '\u00A0'}
              </div>
            </div>
          ))}
          <div className="matchInfoItem_info_title">카드</div>
          {matchItem.home_card.map((home_card, index) => (
            <div className="matchInfoItem_info_card" key={index}>
              {home_card.type === 'yellow' && (
                <div className="yellow_card"></div>
              )}
              {home_card.type === 'red' && <div className="red_card"></div>}
              {home_card.player}
              <div className="matchInfoItem_info_card_time">
                ('{home_card.time})
              </div>
            </div>
          ))}
        </div>
        <div className="matchInfoItem_info_center_blank"></div>
        <div className="matchInfoItem_info_away">
          <div className="matchInfoItem_info_title">득점</div>
          {matchItem.away_goal.map((away_goal, index) => (
            <div className="matchInfoItem_info_scorer" key={index}>
              <div className="matchInfoItem_info_scorer_name">
                {away_goal.player}
              </div>
              <div className="matchInfoItem_info_scorer_time">
                {away_goal.player
                  ? `(${away_goal.time}\`            
                  ${away_goal.own === 'true' ? `, 자책` : ''}    
                ${away_goal.assist_player && `, ${away_goal.assist_player}`})`
                  : '\u00A0'}
              </div>
            </div>
          ))}
          <div className="matchInfoItem_info_title">카드</div>
          {matchItem.away_card.map((away_card, index) => (
            <div className="matchInfoItem_info_card" key={index}>
              {away_card.type === 'yellow' && (
                <div className="yellow_card"></div>
              )}
              {away_card.type === 'red' && <div className="red_card"></div>}
              {away_card.player}
              <div className="matchInfoItem_info_card_time">
                ('{away_card.time})
              </div>
            </div>
          ))}
        </div>
      </div>
    </Fragment>
  );
};

export default MatchInfoBasicItem;
