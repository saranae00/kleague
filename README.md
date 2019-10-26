This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## K리그 2019

2019년 K리그 데이터를 json 파일에서 불러와 각종 차트와 표로 도식화 합니다.

### 경기 정보
경기 데이터가 있는 날짜를 달력에 표시하여 해당 날짜를 클릭시 경기 정보를 조회할 수 있습니다.
  - 경기 정보 : 경기 시간, 장소, 관중수, 득점 선수 및 카드 정보를 조회할 수 있습니다.
  - 경기 통계 : 점유율, 슈팅, 유효 슈팅, 파울, 경고, 퇴장, 코너킥, 프리킥, 오프사이드를 canvas를 이용한 바 그래프로 도식화 했습니다.
  - 경기 영상 : 유튜브 api를 이용해 해당 경기의 하이라이트 영상을 표시 합니다.

### 통계
리그 데이터를 도식화 했습니다.
  - 순위 : 순위 테이블과 라운드별 순위를 조회 합니다.
          라운드별 순위는 canvas를 이용한 꺾은선 그래프로 구현 했습니다.
  - 관중수 : 라운드별 관중수, 경기별 관중수, 팀별 관중수를 조회 합니다.
            라운드별 관중수와 경기별 관중수는 canvas를 이용한 꺾은선 그래프로 구현했고, 경기별 관중수는 콤보박스를 이용해 추가적으로 팀별로 조회               가능 합니다. 
            팀별 관중수는 canvas를 이용한 원 그래프로 구현했습니다.
  - 상대 전적 : 선택한 두 팀의 상대 전적을 canvas를 이용한 원 그래프로 조회 합니다.
