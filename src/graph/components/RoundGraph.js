import React, { Fragment, useState, useRef, useEffect } from 'react';
import './RoundGraph.css';
import FloatLabelContainer from '../containers/FloatLabelContainer';
import FloatLabelSpectatorContainer from '../containers/FloatLabelSpectatorContainer';
import FloatLabelSpectatorByRoundContainer from '../containers/FloatLabelSpectatorByRoundContainer';

const RoundGraph = value => {
  const [team, setTeam] = useState('all');
  const canvas = useRef(null);
  const canvasGrid = useRef(null);
  const {
    onGraphLoad,
    onGraphMouseMove,
    byRound,
    type,
    interval,
    title,
    eachTeam,
    canvasHeight
  } = value;

  let canHeight = canvasHeight;

  typeof canHeight === 'undefined' || canHeight === '' || canHeight === null
    ? (canHeight = 300)
    : (canHeight = parseInt(canHeight));

  let rectGraphPoint = [];

  const getMaxValue = argArr => {
    let result = 0;
    if (type === 'rank') {
      result = 99999;
      for (let i = 0; i < argArr.length; i++) {
        for (let j = 0; j < argArr[i].length; j++) {
          if (parseInt(argArr[i][j].value) < result) {
            result = argArr[i][j].value;
          }
        }
      }
    } else {
      for (let i = 0; i < argArr.length; i++) {
        for (let j = 0; j < argArr[i].length; j++) {
          if (parseInt(argArr[i][j].value) > result) {
            result = argArr[i][j].value;
          }
        }
      }
    }
    return result;
  };

  const getMinHeight = argArr => {
    let result = 99999;
    for (let i = 0; i < argArr.length; i++) {
      for (let j = 0; j < argArr[i].length; j++) {
        if (parseInt(argArr[i][j].height) < result) {
          result = argArr[i][j].height;
        }
      }
    }
    return result;
  };

  const getColomnNum = argArr => {
    let result = 0;
    for (let i = 0; i < argArr.length; i++) {
      result = argArr[i].length > result ? argArr[i].length : result;
    }
    return result;
  };

  const maxValue = parseInt(getMaxValue(byRound));

  const onChange = e => {
    setTeam(e.target.value);
  };

  useEffect(() => {
    const ctx = canvas.current.getContext('2d');
    const ctx2 = canvasGrid.current.getContext('2d');
    animate(
      ctx,
      ctx2,
      byRound,
      canvas.current.width,
      canvas.current.height,
      team
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [team]);

  function animate(ctx, ctx2, RankingByTeam, width, height, team) {
    const xLabelHeight = 20;
    const yLabelWidth = 60;
    const xAxisPaddingRight = 40;
    const xPosPer =
      (width - yLabelWidth - xAxisPaddingRight) /
      (getColomnNum(RankingByTeam) + 1);
    const yPosPer =
      (height - xLabelHeight) /
      (type === 'rank' ? 13 : maxValue + parseInt(interval));
    let x = xPosPer + yLabelWidth;
    let y = 0;
    let yPosArr;
    if (team === 'all') {
      yPosArr = RankingByTeam.map(item => {
        const result = item.map(element => {
          return {
            name: element.name,
            value: element.value,
            height:
              type === 'rank'
                ? element.value * yPosPer
                : (maxValue + parseInt(interval) - element.value) * yPosPer
          };
        });
        return result;
      });
    } else {
      yPosArr = RankingByTeam.map(item => {
        const result = item.map(element => {
          return {
            name: element.name,
            value: element.value,
            height:
              type === 'rank'
                ? element.value * yPosPer
                : (maxValue + parseInt(interval) - element.value) * yPosPer
          };
        });
        return result;
      });

      yPosArr = yPosArr.map(item => {
        const result = item.filter(item => item.name === team);
        return result;
      });

      yPosArr = yPosArr.filter(item => item.length > 0);
    }
    let drawYposArr = yPosArr.map(item => {
      const result = item.map((element, index) => {
        // 마우스 오버시 사용할 영역 및 데이터
        let mouseRectItem = {
          x: (index + 1) * xPosPer + yLabelWidth,
          y: element.height,
          name: element.name,
          value: element.value
        };

        rectGraphPoint.push(mouseRectItem);
        return {
          name: element.name,
          height: height - xLabelHeight
        };
      });
      return result;
    });

    const minY = getMinHeight(yPosArr);

    drawAxis();
    for (let i = 0; i < height - minY + 1; i++) {
      let tmp = JSON.parse(JSON.stringify(drawYposArr));
      for (let eachTeam = 0; eachTeam < yPosArr.length; eachTeam++) {
        for (let j = 0; j < yPosArr[eachTeam].length; j++) {
          if (tmp[eachTeam][j].height - yPosArr[eachTeam][j].height < 1) {
            drawYposArr[eachTeam][j].height = yPosArr[eachTeam][j].height;
            tmp[eachTeam][j] = { ...drawYposArr[eachTeam][j] };
          } else if (tmp[eachTeam][j].height > yPosArr[eachTeam][j].height) {
            drawYposArr[eachTeam][j].height -= 1;
            tmp[eachTeam][j] = { ...drawYposArr[eachTeam][j] };
          }
        }
      }

      setTimeout(() => {
        ctx.clearRect(0, 0, width, height);
        drawGraph(tmp);
        drawTeamName(tmp);
      }, i * 5);
      if (i === 0) {
        onGraphLoad(rectGraphPoint);
      }
    }

    function drawAxis() {
      x = xPosPer + yLabelWidth;
      y = height - xLabelHeight - yPosPer;
      const maxY = type === 'rank' ? 13 : parseInt(maxValue / interval) + 1;
      // x축 레이블 + x축 가이드
      for (var i = 0; i < getColomnNum(yPosArr); i++) {
        ctx2.beginPath();
        ctx2.moveTo(x, 0);
        ctx2.lineTo(x, height - 20);
        ctx2.setLineDash([]);
        ctx2.lineWidth = 1;
        ctx2.strokeStyle = '#D6D6D6';
        ctx2.fillStyle = '#000000';
        ctx2.textAlign = 'center';
        ctx2.font =
          document.documentElement.clientWidth > 768
            ? '16px 굴림'
            : '12px 굴림';
        ctx2.fillText(i + 1, x, height);
        ctx2.stroke();
        ctx2.closePath();

        x += xPosPer;
      }
      y = height - xLabelHeight - yPosPer * interval;
      // y축 레이블 + y축 가이드

      for (let i = 0; i < maxY; i++) {
        // 순위 그래프일 때 0위 표시 안 함
        if (type !== 'rank' || i !== maxY - 1) {
          ctx2.beginPath();
          ctx2.moveTo(yLabelWidth, y);
          ctx2.lineTo(width, y);
          ctx2.setLineDash([]);
          ctx2.lineWidth = 1;
          ctx2.strokeStyle = '#D6D6D6';
          ctx2.fillStyle = '#000000';
          ctx2.font = maxY > 15 ? '12px serif' : '16px serif';
          let yText = type === 'rank' ? maxY - 1 - i : (i + 1) * interval;
          ctx2.fillText(yText, yLabelWidth / 2, y + 5);
          ctx2.stroke();
          ctx2.closePath();
          y -= yPosPer * interval;
        }
      }
      // x,y 축 그리기
      ctx2.beginPath();
      ctx2.moveTo(yLabelWidth, 0);
      ctx2.lineTo(yLabelWidth, height - xLabelHeight);
      ctx2.lineTo(width, height - xLabelHeight);
      ctx2.lineWidth = 1.5;
      ctx2.strokeStyle = '#000000';
      ctx2.stroke();
      ctx2.closePath();
    }

    const getTeamGraphStyle = (ctx, name) => {
      switch (name) {
        case '울산':
          ctx.setLineDash([]);
          ctx.strokeStyle = '#0040FF';
          ctx.fillStyle = '#0040FF';
          break;
        case '전북':
          ctx.setLineDash([]);
          ctx.strokeStyle = '#088A08';
          ctx.fillStyle = '#088A08';
          break;
        case '서울':
          ctx.setLineDash([]);
          ctx.strokeStyle = '#DF0101';
          ctx.fillStyle = '#DF0101';
          break;
        case '대구':
          ctx.setLineDash([]);
          ctx.strokeStyle = '#81DAF5';
          ctx.fillStyle = '#81DAF5';
          break;
        case '강원':
          ctx.setLineDash([]);
          ctx.strokeStyle = '#FE642E';
          ctx.fillStyle = '#FE642E';
          break;
        case '포항':
          ctx.setLineDash([15, 5]);
          ctx.strokeStyle = '#8A0808';
          ctx.fillStyle = '#8A0808';
          break;
        case '상주':
          ctx.setLineDash([]);
          ctx.strokeStyle = '#FE2E2E';
          ctx.fillStyle = '#FE2E2E';
          break;
        case '수원':
          ctx.setLineDash([]);
          ctx.strokeStyle = '#0101DF';
          ctx.fillStyle = '#0101DF';
          break;
        case '성남':
          ctx.setLineDash([]);
          ctx.strokeStyle = '#000000';
          ctx.fillStyle = '#000000';
          break;
        case '경남':
          ctx.setLineDash([]);
          ctx.strokeStyle = '#DF0101';
          ctx.fillStyle = '#DF0101';
          break;
        case '인천':
          ctx.setLineDash([15, 5]);
          ctx.strokeStyle = '#0404B4';
          ctx.fillStyle = '#0404B4';
          break;
        case '제주':
          ctx.setLineDash([]);
          ctx.strokeStyle = '#FF8000';
          ctx.fillStyle = '#FF8000';
          break;
        default:
          ctx.setLineDash([]);
          ctx.strokeStyle = '#0000cd';
          ctx.fillStyle = '#0000cd';
          break;
      }
    };

    const drawTeamName = arrY => {
      for (let i = 0; i < arrY.length; i++) {
        ctx.beginPath();
        ctx.fillStyle = '#000000';
        ctx.textAlign = 'left';
        if (arrY[i].length > 0) {
          ctx.fillText(
            arrY[i][[arrY[i].length - 1]].name,
            width - xPosPer - xAxisPaddingRight + 10,
            arrY[i][[arrY[i].length - 1]].height + 5
          );
        }
        ctx.closePath();
      }
    };

    const drawGraph = arrY => {
      for (let i = 0; i < arrY.length; i++) {
        x = xPosPer + yLabelWidth;
        ctx.beginPath();
        ctx.lineWidth = 1;
        for (let j = 0; j < arrY[i].length; j++) {
          if (j > 0) {
            ctx.lineTo(x, arrY[i][j].height);
          } else {
            ctx.moveTo(x, arrY[i][j].height);
          }
          x += xPosPer;
        }
        if (arrY[i].length > 0) {
          getTeamGraphStyle(ctx, arrY[i][0].name);
        }

        ctx.stroke();
        ctx.closePath();
        x = xPosPer + yLabelWidth;
        for (let j = 0; j < arrY[i].length; j++) {
          ctx.beginPath();
          ctx.arc(x, arrY[i][j].height, 4, 0, (Math.PI / 180) * 360, false);
          getTeamGraphStyle(ctx, arrY[i][0].name);
          ctx.fill();
          ctx.closePath();
          ctx.beginPath();
          ctx.arc(x, arrY[i][j].height, 2, 0, (Math.PI / 180) * 360, false);
          ctx.fillStyle = '#FFFFFF';
          ctx.fill();
          ctx.closePath();
          x += xPosPer;
        }
      }
    };
  }
  const onMouseOver = e => {
    onGraphMouseMove({
      left: e.pageX - canvas.current.offsetLeft,
      top: e.pageY - canvas.current.offsetTop,
      mouseX: e.pageX,
      mouseY: e.pageY
    });
  };

  const canvasWidth =
    document.documentElement.clientWidth > 768
      ? parseInt(document.documentElement.clientWidth * 0.8)
      : parseInt(document.documentElement.clientWidth * 0.9);
  return (
    <Fragment>
      {type === 'rank' ? (
        <FloatLabelContainer />
      ) : type === 'spectator' ? (
        <FloatLabelSpectatorContainer />
      ) : (
        <FloatLabelSpectatorByRoundContainer />
      )}
      <div className="rangking_round">
        <div className="rangking_round_row rangking_round_row_title">
          <div className="rangking_round_title">{title}</div>
        </div>
        <div className="rangking_round_row_combo">
          {eachTeam === 'true' ? (
            <Fragment>
              <select className="team" onChange={onChange}>
                <option value="all">전체</option>
                <option value="강원">강원</option>
                <option value="경남">경남</option>
                <option value="대구">대구</option>
                <option value="상주">상주</option>
                <option value="서울">서울</option>
                <option value="성남">성남</option>
                <option value="수원">수원</option>
                <option value="울산">울산</option>
                <option value="인천">인천</option>
                <option value="전북">전북</option>
                <option value="제주">제주</option>
                <option value="포항">포항</option>
              </select>
            </Fragment>
          ) : null}
        </div>
        <div className="rangking_round_row">
          <canvas
            className="rangking_round_graph_grid"
            ref={canvasGrid}
            width={canvasWidth}
            height={canHeight}
          ></canvas>
          <canvas
            className="rangking_round_graph"
            ref={canvas}
            width={canvasWidth}
            height={canHeight}
            onMouseMove={onMouseOver}
          ></canvas>
        </div>
      </div>
    </Fragment>
  );
};

export default React.memo(RoundGraph);
