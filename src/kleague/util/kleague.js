import { team } from '../util/teamSkeleton';

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

export const calTeamArrayTotal = (round, matchList) => {
  const statByRound = calWinningPointByRound(round, matchList);
  let result = SetTeamArray();
  if (Array.isArray(statByRound[0])) {
    for (let i = 0; i < round; i++) {
      for (let j = 0; j < statByRound[i].length; j++) {
        // console.log(
        //   result[j].name +
        //     ':' +
        //     result[j].winningPoint +
        //     '+' +
        //     statByRound[i][j].winningPoint
        // );
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
        //console.log(result[j].winningPoint);
      }
    }
  }
  console.log(statByRound[0]);
  return result;
};

const sortTable = (a, b) => {
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
        return b.win - a.win;
      }
    }
  }
};

const getTeamArrayByRound = (round, matchList) => {
  let result = [];

  for (let i = 1; i < round + 1; i++) {
    result.push(calTeamArrayTotal(i, matchList));
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

const getRankingByRound = (maxRound, matchList) => {
  let byRoundWinningPoint = getTeamArrayByRound(maxRound, matchList);
  // 배열 순위 정렬
  for (let i = 0; i < byRoundWinningPoint.length; i++) {
    byRoundWinningPoint[i].sort((a, b) => sortTable(a, b));
  }

  // 라운드별 순위 배열 만들기
  const rankingByRound = byRoundWinningPoint.map(item => {
    let result = item.map((each, index) => ({
      name: each.name,
      value: index + 1
    }));
    return result;
  });
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
