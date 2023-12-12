// 이미지 정보 가로스크롤 + 세로스크롤 JS
import $ from "jquery";

export function moveBoxInfo(tg) {
  // 이동 대상
  const infoBox = $(tg).find(".info-box-sw");
  // 한계값을 위한 겉박스 크기
  const limitW = $(tg).find(".prod-info-sw").width();

  let psts = 0; /// 광스크롤막기(0-허용,1-막기)
  // 위치변수
  let x = 0;
  const MOVE = 100;
  // 초기 이미지값 변수
  let imgNum = 1;
  // 전체 이미지 가로크기 저장배열
  const imgWidSize = [];
  let limitPos = 0;

  // 이동거리 측정 대상
  const infoImg = infoBox.find(".info-inbox");

  // 이미지 세로크기 저장 함수
  const sizeCheck = (ele) => {
    imgWidSize.length = 0;
    // 이동거리 저장용 임시변수
    let xpos = 0;
    
    // 이미지 세로크기 배열에 넣기
    ele.each((i, v) => {
      // 가로 이동거리 저장
      xpos += v.clientWidth;
      // 이미지 별 이동값 저장(네비용)
      imgWidSize[i] = xpos - limitW <= 0 ? 0 : xpos - limitW;
    });
    limitPos =  xpos - limitW;
  }; //////// 사이즈 저장 함수 ///////////

  // 최초 이미지 크기 저장
  sizeCheck(infoImg);

  // 네비게이션 영역
  let navJ = $(".nav-area>ul>li");

  // 네비게이션 클래스넣기 함수
  function addOnNav(num) {
    // 클래스 주기
    navJ.eq(num).addClass("on");
    navJ.eq(num).prevAll().addClass("on");
    navJ.eq(num).nextAll().removeClass("on");
  } ////////// addOnNav ////////////////

  // 이미지 초기 네비게이션 세팅
  addOnNav(imgNum);

  // 기능 : 가로 스크롤하여 박스를 이동시킨다.
  // 파라미터 (이미지 전체박스)
  function infoScroll(delta) {
    x += MOVE * delta;
    // 한계값 설정
    if(x > 0 ) x = 0;
    else if( x < -limitPos) x = -limitPos;
    // 휠 이벤트 시 네비설정
    for(let i=0; i < imgWidSize.length; i++){
      if(x <= -imgWidSize[i]){
        addOnNav(i)
      }
    }
    infoBox.css("left", x + "px");
  } //////// infoScroll 함수 ///////////////

  // 네비게이션 바 클릭이벤트 주기
  let nav = document.querySelectorAll(".nav-area>ul>li");
  // console.log(nav);
  nav.forEach((ele, idx) => ele.addEventListener("click", () => {clickNav(idx)}));
  // 네비게이션 클릭 동작 함수
  function clickNav(idx) {
    // 누른대상 순번 - idx
    // 누른대상 앞쪽 on 뒤쪽 remove
    addOnNav(idx);
    imgNum = idx;
    // x값 위치 조정, y값 위치 조정
    x = -imgWidSize[idx];
    infoBox.css("left", x + "px");
  } /////////// clickNav ////////////

  // 휠 이벤트 주기
  document.querySelector(".prod-info-sw").addEventListener("wheel", (event) => {
    let delta = event.wheelDelta;
    // console.log("휠중", delta);
    delta = delta > 0 ? 1 : -1;
    /////// 광스크롤 막기 //////////////////
    if (psts === 1) return true; //돌아가!
    psts = 1; //잠금!
    setTimeout(function () {
      psts = 0; //해제
    }, 20); //0.02초후 해제///////////
    //// 마우스 휠 방향에 따라 가로스크롤 이동 증감! /////
    infoScroll(delta);
  });
}
