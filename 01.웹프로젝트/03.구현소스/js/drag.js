// 09.드래그 기본 JS

// DOM객체
import dFn from "./dom.js";

// console.log(dFn);

/*************************************** 
[ 드래그 기능 구현을 위한 이벤트 ]
1. 딸 -> 마우스 포인터 누름 -> mousedown

2. 각 -> 마우스 포인터 올라옴 -> mouseup

3. 질질 -> 마우스 움직일때 -> mousemove
-> 드래그 상태는 "딸"상태에서 "질질"하는것!

mousedown 할때 드래그 상태변수값을 1로 변경
mouseup 할때 드래그 상태변수값을 0으로 변경
_______________________________________

[ 드래그 기능구현 원리 ]

1. 마우스 포인터 위치에 따른 변화 수치를
계산하여 요소의 top,left 위치값으로 반영한다!

2. 프로세스
(1) mousedown 이벤트에서는 시작위치값 저장
- 모바일 이벤트 : touchstart
(2) mousemove 이벤트에서는 움직인위치와 시작위치 차이 저장
- 모바일 이벤트 : touchmove
(3) mousemove에서 차이값을 타겟요소의 left,top값에 반영
(4) mouseup 이벤트에서는 다음 이동을 위한 마지막위치 저장
- 모바일 이벤트 : touchend
(5) mousemove 이벤트에서 마지막위치로 부터의 이동을 계산함

***************************************/

/***************************************************
    [ 드래그 다중적용 함수 만들기 ]
    함수명 : goDrag
    기능 : 다중 드래그 기능 적용
***************************************************/
// 드래그 적용 이벤트 설정하기

// 드래그 대상 적용 함수
let target;
function targetAddEvt(targetArr){
  target = targetArr;
  if(typeof(target)==Object){
    // 2. 드래그 설정하기
    target.forEach(ele=>goDrag(ele));
  }else{
    goDrag(target);
  } /////// if else ///////////
} ////////targetAddEvt 함수 /////////////

// 드래그 이벤트 함수
function goDrag(ele) {
  // ele - 드래그 대상요소

  // 1. 변수 세팅
  // (1) 드래그 상태변수 : true 드래그중, false 드래그아님
  let drag = false;
  // (2) 첫번째 위치 포인트 : first x, first y
  let fx , fy;
  // (3) 마지막 위치 포인트 : last x, last y
  let lx = 0,ly = 0;
  // -> 마지막 위치로부터 처음 작동하므로 초기값 0 세팅
  // (4) 움직일 때 위치 포인트 : move x, move y
  let mvx, mvy;
  // (5) 위치이동 차이 : result x, result y
  let rx, ry;

  // 2. 함수만들기
  // (1) 드래그 상태 true로 변경함수
  const dTrue = () => (drag = true);
  // (2) 드래스 상태 false로 변경함수
  const dFalse = () => (drag = false);
  // (3) 드래그 움직일 때 작동함수
  const dMove = (e) => {
    console.log("드래그상태:", drag);

    // 드래그 상태일때만 실행
    if (drag) {
      // 1. 드래그 상태에서 움직일 때 위치값
      // pageX,pageY는 일반 브라우저용
      // touches[0].screenX, touches[0].screenY는 터치스크린용
      mvx = e.pageX || e.touches[0].screenX;
      mvy = e.pageY || e.touches[0].screenY;

      // 2. 움직일때 위치값 - 처음 위치값 : rx, ry
      // x축 값은 left값
      // y축 값은 top값
      rx = mvx - fx;
      ry = mvy - fy;
      // 순수하게 움직인 거리를 계산!! -> 가장 중요한 핵심

      // 3. x, y 움직인 위치 값을 타겟 요소에 적용!
      // 움직일 대상 ele
      ele.style.left = (rx+lx)+'px';
      ele.style.top = (ry+ly)+'px';
      // 한번 드래그 후 다시 드래그 시 움직인 위치값이 필요함!
      // -> 마지막 위치값 저장 필요
      // -> 항상 최종 위치에서 움직인 위치를 더한다~

      // 4. z-index값을 드래그 대상만 높여주고 나머지는 지움
      dtg.forEach(ele=>ele.style.zIndex = 0);
      ele.style.zIndex = 99;

      // 값 확인
      console.log(`fx:${fx} | fy:${fy}`);
      console.log(`mvx:${mvx} | mvy:${mvy}`);
      console.log(`rx:${rx} | ry:${ry}`);
      console.log(`lx:${lx} | ly:${ly}`);
    } //// if /////
    // 커서 편손/쥔손 상태 변경
    ele.style.cursor = drag?"grabbing":'grab';
  }; ////////dMove변수에 익명함수 할당////////////////

  // (4) 첫번째 위치 포인트 세팅함수 : fx, fy
  const firstPoint = (e) => { //요소자신이 호출하는 것이 아니라서 이벤트가 전달이 안됨
    fx = e.pageX || e.touches[0].screenX;
    fy = e.pageY || e.touches[0].screenY;
    // console.log('첫포인트:',fx,"|",fy);
  }; ///////firstPoint변수에 익명함수 할당 ////////////

  // (5) 마지막 위치 포인트 세팅함수 : lx, ly
  const lastPoint = () => {
    // 움직일 때 위치값을 기존 값에 계속 더함
    // 마지막 포인트는 위치이동 차이를 계속 업데이트
    lx += rx;
    ly += ry;
    // console.log('마지막포인트:',lx,"|",ly);
  }; //////lastPoint변수에 익명함수 할당 //////////////
  // 3. 이벤트 등록하기
  // 대상 : 호출 시 보내준 파라미터요소 : ele
  // (1) 마우스 내려갈 때 : 드래그 true + 첫번째 위치값 업데이트
  dFn.addEvt(ele, "mousedown", (e) => {
    // 드래그상태 업데이트
    dTrue();
    // 첫번째 위치 세팅 : 
    // firstPoint함수에 이벤트가 직접적으로 발생하지 않으므로 
    // 이벤트를 전달해야함
    firstPoint(e);
  });
  // (1-2) 모바일
  dFn.addEvt(ele, "touchstart", (e) => {
    // 드래그상태 업데이트
    dTrue();
    // 첫번째 위치 세팅
    firstPoint(e);
  });
  // (2) 마우스 올라갈 때 : 드래그 false + 마지막 위치값 업데이트
  dFn.addEvt(ele, "mouseup", () => {
    // 드래그상태 업데이트
    dFalse();
    // 마지막 위치 세팅
    lastPoint();
  });
  // (2-2) 모바일
  dFn.addEvt(ele, "touchend", () => {
    // 드래그상태 업데이트
    dFalse();
    // 마지막 위치 세팅
    lastPoint();
  });
  // (3) 마우스 움직일 때 : 움직일 때 처리함수 dMove실행
  dFn.addEvt(ele, "mousemove", dMove);
  // (3-2) 모바일
  dFn.addEvt(ele, "touchmove", dMove);
  // (4) 마우스 벗어날 때 : 드래그상태 false
  // (마우스가 벗어나서 mouseup 됐을때 인식을 못하는 문제를 해결)
  dFn.addEvt(ele, "mouseleave", dFalse);

} /////////////////goDrag함수////////////////////////

export default targetAddEvt;