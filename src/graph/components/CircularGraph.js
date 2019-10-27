import React, { useRef, useEffect } from 'react';
import './CircularGraph.css';

const CircularGraph = props => {
  const { data, title, width } = props;
  const canvas = useRef(null);
  const canvasWidth = width;

  let sortedData = JSON.parse(JSON.stringify(data));

  //데이터 내림차순 정렬
  sortedData.sort((a, b) => b.value - a.value);

  // 데이터의 총합
  const totalData = (() => {
    let result = 0;
    for (let item of sortedData) {
      result += item.value;
    }
    return result;
  })();

  const getTeamGraphStyle = (ctx, name) => {
    switch (name) {
      case '울산':
        ctx.setLineDash([]);
        ctx.strokeStyle = '#ffffff';
        ctx.fillStyle = '#0040FF';
        break;
      case '전북':
        ctx.setLineDash([]);
        ctx.strokeStyle = '#ffffff';
        ctx.fillStyle = '#088A08';
        break;
      case '서울':
        ctx.setLineDash([]);
        ctx.strokeStyle = '#ffffff';
        ctx.fillStyle = '#DF0101';
        break;
      case '대구':
        ctx.setLineDash([]);
        ctx.strokeStyle = '#ffffff';
        ctx.fillStyle = '#81DAF5';
        break;
      case '강원':
        ctx.setLineDash([]);
        ctx.strokeStyle = '#ffffff';
        ctx.fillStyle = '#FE642E';
        break;
      case '포항':
        ctx.setLineDash([]);
        ctx.strokeStyle = '#ffffff';
        ctx.fillStyle = '#8A0808';
        break;
      case '상주':
        ctx.setLineDash([]);
        ctx.strokeStyle = '#ffffff';
        ctx.fillStyle = '#FE2E2E';
        break;
      case '수원':
        ctx.setLineDash([]);
        ctx.strokeStyle = '#ffffff';
        ctx.fillStyle = '#0101DF';
        break;
      case '성남':
        ctx.setLineDash([]);
        ctx.strokeStyle = '#ffffff';
        ctx.fillStyle = '#000000';
        break;
      case '경남':
        ctx.setLineDash([]);
        ctx.strokeStyle = '#ffffff';
        ctx.fillStyle = '#DF0101';
        break;
      case '인천':
        ctx.setLineDash([]);
        ctx.strokeStyle = '#ffffff';
        ctx.fillStyle = '#0404B4';
        break;
      case '제주':
        ctx.setLineDash([]);
        ctx.strokeStyle = '#ffffff';
        ctx.fillStyle = '#FF8000';
        break;
      default:
        ctx.setLineDash([]);
        ctx.strokeStyle = '#ffffff';
        ctx.fillStyle = '#cccccc';
        break;
    }
  };

  const getTeamColor = name => {
    switch (name) {
      case '울산':
        return '#0040FF';
      case '전북':
        return '#088A08';
      case '서울':
        return '#DF0101';
      case '대구':
        return '#81DAF5';
      case '강원':
        return '#FE642E';
      case '포항':
        return '#8A0808';
      case '상주':
        return '#FE2E2E';
      case '수원':
        return '#0101DF';
      case '성남':
        return '#000000';
      case '경남':
        return '#DF0101';
      case '인천':
        return '#0404B4';
      case '제주':
        return '#FF8000';
      default:
        return '#cccccc';
    }
  };

  useEffect(() => {
    const ctx = canvas.current.getContext('2d');
    let startRadian = 1.5 * Math.PI;
    let endRadian = 0;

    for (let i = 0; i < sortedData.length; i++) {
      ctx.beginPath();
      endRadian = startRadian + Math.PI * 2 * (sortedData[i].value / totalData);

      ctx.moveTo(canvasWidth / 2, canvasWidth / 2);
      if (sortedData[i].value !== 0) {
        ctx.arc(
          canvasWidth / 2,
          canvasWidth / 2,
          canvasWidth / 2 - 10,
          startRadian,
          endRadian
        );
      }
      getTeamGraphStyle(ctx, sortedData[i].name);
      startRadian = endRadian;
      ctx.lineWidth = 2;
      ctx.closePath();
      ctx.stroke();
      ctx.fill();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortedData]);

  return (
    <div className="circular_graph_wrapper">
      <div className="circular_graph_row">
        <div className="circular_graph_title">{title}</div>
      </div>
      <div className="circular_graph_row">
        <div className="circular_graph_div">
          <canvas
            className="circular_graph"
            ref={canvas}
            width={canvasWidth}
            height={canvasWidth}
          ></canvas>
        </div>
        <div className="circular_graph_table_div">
          <table className="circular_graph_table">
            <tbody>
              {sortedData.map((item, index) => (
                <tr key={index}>
                  <td
                    className="circular_graph_table_teamColor"
                    style={{ background: getTeamColor(item.name) }}
                  ></td>
                  <td className="circular_graph_table_teamName">{item.name}</td>
                  <td className="circular_graph_table_teamValue">
                    {item.value +
                      ` : (` +
                      Math.round((item.value / totalData) * 100 * 100) / 100}
                    %)
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="circular_graph_row"></div>
    </div>
  );
};

export default CircularGraph;
