import { team } from './teamSkeleton';
import { vsStatSkeleton } from './vsStatSkeleton';

// 리그내 팀 갯수
export const _MAX_TEAM = 12;
// 스플릿이 나눠질 라운드
const _SPLIT_ROUND_NUM = 33;

const SetTeamArray = () => {
  let teamArray = [];
  teamArray.push({ ...team, id: 0, name: '울산' });
  teamArray.push({ ...team, id: 1, name: '전북' });
  teamArray.push({ ...team, id: 2, name: '서울' });
  teamArray.push({ ...team, id: 3, name: '대구' });
  teamArray.push({ ...team, id: 4, name: '포항' });
  teamArray.push({ ...team, id: 5, name: '강원' });
  teamArray.push({ ...team, id: 6, name: '상주' });
  teamArray.push({ ...team, id: 7, name: '수원' });
  teamArray.push({ ...team, id: 8, name: '성남' });
  teamArray.push({ ...team, id: 9, name: '경남' });
  teamArray.push({ ...team, id: 10, name: '인천' });
  teamArray.push({ ...team, id: 11, name: '제주' });
  return teamArray;
};

// 최대 라운드 수 구하기
export const getMaxRound = matchList => {
  let result = 0;
  if (Array.isArray(matchList)) {
    for (let i = 0; i < matchList.length; i++) {
      result =
        parseInt(matchList[i].round) > result
          ? parseInt(matchList[i].round)
          : result;
    }
  }
  return result;
};

// 스플릿이 나눠질 팀 갯수(스플릿A 팀의 갯수)
export const splitTeamsNum = () => parseInt(_MAX_TEAM / 2);

const calWinningPointByMatch = (item, arrTeam) => {
  let homeTeam = arrTeam.find(vlaue => {
    return item.home === vlaue.name && vlaue;
  });
  let awayTeam = arrTeam.find(vlaue => {
    return item.away === vlaue.name && vlaue;
  });
  homeTeam.foul = parseInt(item.home_stat.foul);
  homeTeam.yellow = parseInt(item.home_stat.yellow);
  homeTeam.red = parseInt(item.home_stat.red);
  homeTeam.getScore = parseInt(item.home_score);
  homeTeam.lostScore = parseInt(item.away_score);
  homeTeam.spectator = parseInt(item.spectator);
  homeTeam.homeMatchNum = 1;

  awayTeam.foul = parseInt(item.away_stat.foul);
  awayTeam.yellow = parseInt(item.away_stat.yellow);
  awayTeam.red = parseInt(item.away_stat.red);
  awayTeam.getScore = parseInt(item.away_score);
  awayTeam.lostScore = parseInt(item.home_score);

  if (item.home_score > item.away_score) {
    homeTeam.winningPoint = 3;
    homeTeam.win = 1;
    awayTeam.lose = 1;
  } else if (item.home_score < item.away_score) {
    awayTeam.winningPoint = 3;
    awayTeam.win = 1;
    homeTeam.lose = 1;
  } else {
    homeTeam.winningPoint = 1;
    awayTeam.winningPoint = 1;
    awayTeam.draw = 1;
    homeTeam.draw = 1;
  }
  return arrTeam;
};

const calWinningPointByRound = (round, matchList) => {
  let result = [];

  if (Array.isArray(matchList)) {
    for (let i = 1; i <= round; i++) {
      let arrTeam = SetTeamArray();
      const matchByRound = matchList.filter(match => {
        return parseInt(match.round) === i && match;
      });
      matchByRound.forEach(item => {
        arrTeam = calWinningPointByMatch(item, arrTeam);
      });
      result.push(arrTeam);
    }
  }
  return result;
};

export const calTeamArrayTotal = (beginRound, maxRound, matchList) => {
  const statByRound = calWinningPointByRound(maxRound, matchList);
  let result = SetTeamArray();
  if (Array.isArray(statByRound[0])) {
    for (let i = beginRound - 1; i < maxRound; i++) {
      for (let j = 0; j < statByRound[i].length; j++) {
        if (
          statByRound[i][j].win !== 0 ||
          statByRound[i][j].draw !== 0 ||
          statByRound[i][j].lose !== 0
        ) {
          result[j].winningPoint += statByRound[i][j].winningPoint;
          result[j].foul += statByRound[i][j].foul;
          result[j].yellow += statByRound[i][j].yellow;
          result[j].red += statByRound[i][j].red;
          result[j].win += statByRound[i][j].win;
          result[j].lose += statByRound[i][j].lose;
          result[j].draw += statByRound[i][j].draw;
          result[j].getScore += statByRound[i][j].getScore;
          result[j].lostScore += statByRound[i][j].lostScore;
          result[j].spectator += statByRound[i][j].spectator;
          result[j].homeMatchNum += statByRound[i][j].homeMatchNum;
          result[j].matchNum += 1;
        }
        //console.log(result[j].winningPoint);
      }
    }
  }
  return result;
};

const sortTable = (a, b, matchList) => {
  // 승점 순
  if (a.winningPoint !== b.winningPoint) {
    return b.winningPoint - a.winningPoint;
  } else {
    // 승점이 같을 경우, 다득점
    if (a.getScore !== b.getScore) {
      return b.getScore - a.getScore;
    } else {
      //득점이 같을 경우, 득실차
      if (a.getScore - a.lostScore !== b.getScore - b.lostScore) {
        return b.getScore - b.lostScore - (a.getScore - a.lostScore);
      } else {
        //득실차가 같을 경우, 다승 순
        if (a.win !== b.win) {
          return b.win - a.win;
        } else {
          // 다승이 같을 경우 상대 전적
          const vsStat = getVsStat(a, b, matchList);
          return vsStat.lose - vsStat.win;
        }
      }
    }
  }
};

export const getVsStat = (home, away, data) => {
  let vsStat = { ...vsStatSkeleton };
  vsStat.home_name = home;
  vsStat.away_name = away;

  let tmpMathchList = [];
  if (home !== 'none' && away !== 'none') {
    tmpMathchList = data.filter(
      item =>
        (item.home === home && item.away === away) ||
        (item.home === away && item.away === home)
    );
  }
  for (let item of tmpMathchList) {
    if (parseInt(item.home_score) > parseInt(item.away_score)) {
      if (item.home === home) {
        vsStat.win += 1;
        vsStat.score += parseInt(item.home_score);
        vsStat.lost += parseInt(item.away_score);
      } else {
        vsStat.lose += 1;
        vsStat.score += parseInt(item.away_score);
        vsStat.lost += parseInt(item.home_score);
      }
    } else if (parseInt(item.home_score) < parseInt(item.away_score)) {
      if (item.home === home) {
        vsStat.lose += 1;
        vsStat.score += parseInt(item.away_score);
        vsStat.lost += parseInt(item.home_score);
      } else {
        vsStat.win += 1;
        vsStat.score += parseInt(item.home_score);
        vsStat.lost += parseInt(item.away_score);
      }
    } else {
      vsStat.draw += 1;
      vsStat.score += parseInt(item.home_score);
      vsStat.lost += parseInt(item.away_score);
    }
  }

  return vsStat;
};

export const getTeamArrayTotal = (maxRound, matchList) => {
  let result;

  if (maxRound < _SPLIT_ROUND_NUM + 1) {
    result = calTeamArrayTotal(1, maxRound, matchList);
    result.sort((a, b) => sortTable(a, b, matchList));
  } else {
    const splitATeamNum = splitTeamsNum();
    result = calTeamArrayTotal(1, _SPLIT_ROUND_NUM, matchList);
    result.sort((a, b) => sortTable(a, b, matchList));
    const splitA = result.slice(0, splitATeamNum);
    const splitB = result.slice(splitATeamNum, result.length);
    const afterSplit = calTeamArrayTotal(
      _SPLIT_ROUND_NUM + 1,
      maxRound,
      matchList
    );

    afterSplit.forEach(item => {
      let isprocessed = false;
      splitA.forEach(splitAItem => {
        if (item.id === splitAItem.id) {
          splitAItem.draw += item.draw;
          splitAItem.foul += item.foul;
          splitAItem.getScore += item.getScore;
          splitAItem.homeMatchNum += item.homeMatchNum;
          splitAItem.lose += item.lose;
          splitAItem.lostScore += item.lostScore;
          splitAItem.matchNum += item.matchNum;
          splitAItem.spectator += item.spectator;
          splitAItem.win += item.win;
          splitAItem.winningPoint += item.winningPoint;
          splitAItem.yellow += item.yellow;
          isprocessed = true;
        }
      });
      if (!isprocessed) {
        splitB.forEach(splitBItem => {
          if (item.id === splitBItem.id) {
            splitBItem.draw += item.draw;
            splitBItem.foul += item.foul;
            splitBItem.getScore += item.getScore;
            splitBItem.homeMatchNum += item.homeMatchNum;
            splitBItem.lose += item.lose;
            splitBItem.lostScore += item.lostScore;
            splitBItem.matchNum += item.matchNum;
            splitBItem.spectator += item.spectator;
            splitBItem.win += item.win;
            splitBItem.winningPoint += item.winningPoint;
            splitBItem.yellow += item.yellow;
          }
        });
      }
    });
    splitA.sort((a, b) => sortTable(a, b, matchList));
    splitB.sort((a, b) => sortTable(a, b, matchList));

    result = splitA.concat(splitB);
  }
  return result;
};

// 팀별 배열로 바꾸기
const getByTeam = argArr => {
  let result = Array(argArr[0].length);
  for (let i = 0; i < argArr[0].length; i++) {
    result[i] = Array(argArr.length);
  }

  for (let i = 0; i < argArr.length; i++) {
    for (let j = 0; j < argArr[i].length; j++) {
      switch (argArr[i][j].name) {
        case '울산':
          result[0][i] = { ...argArr[i][j] };
          break;
        case '전북':
          result[1][i] = { ...argArr[i][j] };
          break;
        case '서울':
          result[2][i] = { ...argArr[i][j] };
          break;
        case '대구':
          result[3][i] = { ...argArr[i][j] };
          break;
        case '강원':
          result[4][i] = { ...argArr[i][j] };
          break;
        case '포항':
          result[5][i] = { ...argArr[i][j] };
          break;
        case '상주':
          result[6][i] = { ...argArr[i][j] };
          break;
        case '수원':
          result[7][i] = { ...argArr[i][j] };
          break;
        case '성남':
          result[8][i] = { ...argArr[i][j] };
          break;
        case '경남':
          result[9][i] = { ...argArr[i][j] };
          break;
        case '인천':
          result[10][i] = { ...argArr[i][j] };
          break;
        case '제주':
          result[11][i] = { ...argArr[i][j] };
          break;
        default:
          break;
      }
    }
  }
  return result;
};

// 라운드별 순위
const getRankingByRound = (maxRound, matchList) => {
  let rankingByRound = [];
  for (let i = 0; i < maxRound; i++) {
    const items = getTeamArrayTotal(i, matchList);
    const rankingData = items.map((item, index) => ({
      name: item.name,
      value: index + 1
    }));
    rankingByRound.push(rankingData);
  }
  return rankingByRound;
};

// 경기별 관중수 데이터
export const getSpectatorByMatch = matchList => {
  let spectatorByMatch = Array(12);
  for (let i = 0; i < spectatorByMatch.length; i++) {
    spectatorByMatch[i] = [];
  }

  matchList.forEach(item => {
    let resultItem = {
      name: item.home,
      value: item.spectator
    };

    switch (resultItem.name) {
      case '울산':
        spectatorByMatch[0].push(resultItem);
        break;
      case '전북':
        spectatorByMatch[1].push(resultItem);
        break;
      case '서울':
        spectatorByMatch[2].push(resultItem);
        break;
      case '대구':
        spectatorByMatch[3].push(resultItem);
        break;
      case '강원':
        spectatorByMatch[4].push(resultItem);
        break;
      case '포항':
        spectatorByMatch[5].push(resultItem);
        break;
      case '상주':
        spectatorByMatch[6].push(resultItem);
        break;
      case '수원':
        spectatorByMatch[7].push(resultItem);
        break;
      case '성남':
        spectatorByMatch[8].push(resultItem);
        break;
      case '경남':
        spectatorByMatch[9].push(resultItem);
        break;
      case '인천':
        spectatorByMatch[10].push(resultItem);
        break;
      case '제주':
        spectatorByMatch[11].push(resultItem);
        break;
      default:
        break;
    }
  });
  return spectatorByMatch;
};

// 라운드별 전체 관중수 데이터
export const getSpectatorByRound = (round, matchList) => {
  const statByRound = calWinningPointByRound(round, matchList);
  let spectatorByRound = [];
  spectatorByRound[0] = [];
  for (let i = 0; i < statByRound.length; i++) {
    let totalSpectator = 0;
    for (let j = 0; j < statByRound[i].length; j++) {
      totalSpectator += statByRound[i][j].spectator;
    }
    spectatorByRound[0].push({
      name: '관중수',
      value: totalSpectator
    });
  }
  return spectatorByRound;
};

// 라운드별 순위 데이터
export const rankArrayByRound = (maxRound, matchList) => {
  return getByTeam(getRankingByRound(maxRound, matchList));
};

// // 전체 팀별 데이터
// ;

// 전체 관중수 팀별 데이터
export const getSpectatorArrayByTeam = teamArrayTotal => {
  return teamArrayTotal.map(item => {
    return {
      name: item.name,
      value: item.spectator
    };
  });
};
