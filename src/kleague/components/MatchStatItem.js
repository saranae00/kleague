import React from 'react';
import BarGraph from '../../graph/components/BarGraph';

const MatchStatItem = matchItems => {
  const { matchItem } = matchItems;

  return (
    <div className="matchInfo_stat">
      <div className="matchInfo_stat_innerwrapper">
        <div className="matchInfo_stat_row">
          <BarGraph
            value={matchItem.home_stat.possession}
            total={
              parseInt(matchItem.home_stat.possession) +
              parseInt(matchItem.away_stat.possession)
            }
            isRight={false}
          />
          <div className="matchInfo_stat_row_dataText">
            {matchItem.home_stat.possession}
          </div>
          <div className="matchInfo_stat_row_label">점유율</div>
          <div className="matchInfo_stat_row_dataText">
            {matchItem.away_stat.possession}
          </div>
          <div className="matchInfo_stat_row_graph">
            <BarGraph
              value={matchItem.away_stat.possession}
              total={
                parseInt(matchItem.home_stat.possession) +
                parseInt(matchItem.away_stat.possession)
              }
              isRight={true}
            />
          </div>
        </div>
        <div className="matchInfo_stat_row">
          <div className="matchInfo_stat_row_graph">
            <BarGraph
              value={matchItem.home_stat.shooting}
              total={
                parseInt(matchItem.home_stat.shooting) +
                parseInt(matchItem.away_stat.possession)
              }
              isRight={false}
            />
          </div>
          <div className="matchInfo_stat_row_dataText">
            {matchItem.home_stat.shooting}
          </div>
          <div className="matchInfo_stat_row_label">슈팅</div>
          <div className="matchInfo_stat_row_dataText">
            {matchItem.away_stat.shooting}
          </div>
          <div className="matchInfo_stat_row_graph">
            <BarGraph
              value={matchItem.away_stat.shooting}
              total={
                parseInt(matchItem.home_stat.shooting) +
                parseInt(matchItem.away_stat.shooting)
              }
              isRight={true}
            />
          </div>
        </div>
        <div className="matchInfo_stat_row">
          <div className="matchInfo_stat_row_graph">
            <BarGraph
              value={matchItem.home_stat.shooting_on_target}
              total={
                parseInt(matchItem.home_stat.shooting_on_target) +
                parseInt(matchItem.away_stat.shooting_on_target)
              }
              isRight={false}
            />
          </div>
          <div className="matchInfo_stat_row_dataText">
            {matchItem.home_stat.shooting_on_target}
          </div>
          <div className="matchInfo_stat_row_label">유효 슈팅</div>
          <div className="matchInfo_stat_row_dataText">
            {matchItem.away_stat.shooting_on_target}
          </div>
          <div className="matchInfo_stat_row_graph">
            <BarGraph
              value={matchItem.away_stat.shooting_on_target}
              total={
                parseInt(matchItem.home_stat.shooting_on_target) +
                parseInt(matchItem.away_stat.shooting_on_target)
              }
              isRight={true}
            />
          </div>
        </div>
        <div className="matchInfo_stat_row">
          <div className="matchInfo_stat_row_graph">
            <BarGraph
              value={matchItem.home_stat.foul}
              total={
                parseInt(matchItem.home_stat.foul) +
                parseInt(matchItem.away_stat.foul)
              }
              isRight={false}
            />
          </div>
          <div className="matchInfo_stat_row_dataText">
            {matchItem.home_stat.foul}
          </div>
          <div className="matchInfo_stat_row_label">파울</div>
          <div className="matchInfo_stat_row_dataText">
            {matchItem.away_stat.foul}
          </div>
          <div className="matchInfo_stat_row_graph">
            <BarGraph
              value={matchItem.away_stat.foul}
              total={
                parseInt(matchItem.home_stat.foul) +
                parseInt(matchItem.away_stat.foul)
              }
              isRight={true}
            />
          </div>
        </div>
        <div className="matchInfo_stat_row">
          <div className="matchInfo_stat_row_graph">
            <BarGraph
              value={matchItem.home_stat.yellow}
              total={
                parseInt(matchItem.home_stat.yellow) +
                parseInt(matchItem.away_stat.yellow)
              }
              isRight={false}
            />
          </div>
          <div className="matchInfo_stat_row_dataText">
            {matchItem.home_stat.yellow}
          </div>
          <div className="matchInfo_stat_row_label">경고</div>
          <div className="matchInfo_stat_row_dataText">
            {matchItem.away_stat.yellow}
          </div>
          <div className="matchInfo_stat_row_graph">
            <BarGraph
              value={matchItem.away_stat.yellow}
              total={
                parseInt(matchItem.home_stat.yellow) +
                parseInt(matchItem.away_stat.yellow)
              }
              isRight={true}
            />
          </div>
        </div>
        <div className="matchInfo_stat_row">
          <div className="matchInfo_stat_row_graph">
            <BarGraph
              value={matchItem.home_stat.red}
              total={
                parseInt(matchItem.home_stat.red) +
                parseInt(matchItem.away_stat.red)
              }
              isRight={false}
            />
          </div>
          <div className="matchInfo_stat_row_dataText">
            {matchItem.home_stat.red}
          </div>
          <div className="matchInfo_stat_row_label">퇴장</div>
          <div className="matchInfo_stat_row_dataText">
            {matchItem.away_stat.red}
          </div>
          <div className="matchInfo_stat_row_graph">
            <BarGraph
              value={matchItem.away_stat.red}
              total={
                parseInt(matchItem.home_stat.red) +
                parseInt(matchItem.away_stat.red)
              }
              isRight={true}
            />
          </div>
        </div>
        <div className="matchInfo_stat_row">
          <div className="matchInfo_stat_row_graph">
            <BarGraph
              value={matchItem.home_stat.conerkick}
              total={
                parseInt(matchItem.home_stat.conerkick) +
                parseInt(matchItem.away_stat.conerkick)
              }
              isRight={false}
            />
          </div>
          <div className="matchInfo_stat_row_dataText">
            {matchItem.home_stat.conerkick}
          </div>
          <div className="matchInfo_stat_row_label">코너킥</div>
          <div className="matchInfo_stat_row_dataText">
            {matchItem.away_stat.conerkick}
          </div>
          <div className="matchInfo_stat_row_graph">
            <BarGraph
              value={matchItem.away_stat.conerkick}
              total={
                parseInt(matchItem.home_stat.conerkick) +
                parseInt(matchItem.away_stat.conerkick)
              }
              isRight={true}
            />
          </div>
        </div>
        <div className="matchInfo_stat_row">
          <div className="matchInfo_stat_row_graph">
            <BarGraph
              value={matchItem.home_stat.freekick}
              total={
                parseInt(matchItem.home_stat.freekick) +
                parseInt(matchItem.away_stat.freekick)
              }
              isRight={false}
            />
          </div>
          <div className="matchInfo_stat_row_dataText">
            {matchItem.home_stat.freekick}
          </div>
          <div className="matchInfo_stat_row_label">프리킥</div>
          <div className="matchInfo_stat_row_dataText">
            {matchItem.away_stat.freekick}
          </div>
          <div className="matchInfo_stat_row_graph">
            <BarGraph
              value={matchItem.away_stat.freekick}
              total={
                parseInt(matchItem.home_stat.freekick) +
                parseInt(matchItem.away_stat.freekick)
              }
              isRight={true}
            />
          </div>
        </div>
        <div className="matchInfo_stat_row">
          <div className="matchInfo_stat_row_graph">
            <BarGraph
              value={matchItem.home_stat.offside}
              total={
                parseInt(matchItem.home_stat.offside) +
                parseInt(matchItem.away_stat.offside)
              }
              isRight={false}
            />
          </div>
          <div className="matchInfo_stat_row_dataText">
            {matchItem.home_stat.offside}
          </div>
          <div className="matchInfo_stat_row_label">오프사이드</div>
          <div className="matchInfo_stat_row_dataText">
            {matchItem.away_stat.offside}
          </div>
          <div className="matchInfo_stat_row_graph">
            <BarGraph
              value={matchItem.away_stat.offside}
              total={
                parseInt(matchItem.home_stat.offside) +
                parseInt(matchItem.away_stat.offside)
              }
              isRight={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchStatItem;
