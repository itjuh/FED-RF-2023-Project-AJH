// 이미지 정보 가로스크롤 + 세로스크롤 JS
import $ from "jquery";

export function moveImgInfo(tg) {
  // console.log($(tg));
  // 이동 대상
  const infoBox = $(tg).find(".info-box");
  // 한계값을 위한 겉박스 크기
  const limitW = $(tg).find(".prod-info").width();
  const limitH = $(tg).find(".prod-info").height();
  // 이동거리 측정 대상
  const infoImg = infoBox.find("img");

  let psts = 0; /// 광스크롤막기(0-허용,1-막기)
  // 위치변수
  let x = $(tg)?0:$(tg).find(".info-box").position().left;

  let y = 0;
  const MOVE = 200;
  // 초기 이미지값 변수
  let imgNum = 1;

  // 전체 이미지 세로크기 저장배열
  const imgHeiSize = [];
  // 전체 이미지 가로크기 저장배열
  const imgWidSize = [];

  // 가로영역 이동한계값, 세로 한계값, 움직일 요소 저장 배열변수
  let pos = [];
  // 전체 이동거리
  let all = 0;

  // console.log(infoBox, limitH, limitW, infoImg);
  // 이미지 세로크기 저장 함수
  const sizeCheck = (ele) => {
    // console.log(ele);
    imgWidSize.length = 0;
    // 이동거리 저장용 임시변수
    let xpos = 0;
    // 순번값
    let seq = 0;
    // 이미지 세로크기 배열에 넣기
    ele.each((i, v) => {
      // 개별 이미지 길이 저장
      imgHeiSize[i] = v.height;
      // 가로 이동거리 저장
      xpos += v.width;
      // 이미지 별 이동값 저장(네비용)
      imgWidSize[i] = xpos - limitW <= 0 ? 0 : xpos - limitW;
      if (v.height > v.width) {
        // 가로영역 이동한계값, 세로 한계값, 움직일 요소
        pos[seq] = [xpos - limitW, v.height - limitH, infoImg.eq(i)];
        seq++;
        // console.log(pos);
      }
    });
    // 전체 이동거리 업데이트
    all = xpos - limitW;
    // 위치이동 포인트 설정(이미지 가로길이보다 세로길이가 크면 세로스크롤)
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

  // 가로스크롤 함수
  function horizonScroll(target, dir) {
    // target - 이동대상 dif - 방향
    x += MOVE * dir;
    if (dir === -1) {
      //아래방향 스크롤
      if (x > -target[0]) y = 0; //y고정 x이동
      else if (x <= -target[0] && target[2].position().top != -target[1]) {
        //x고정 y이동
        x = -target[0];
        verticalScroll(target, dir);
      } 
    } else {
      //윗방향 스크롤
      if (target[2].position().top != 0) {
        // x고정 y이동
        x -= MOVE * dir; // x축 이동 초기화
        verticalScroll(target, dir);
      }
    }
    return x;
  } ////////// 가로스크롤 함수 //////////////

  // 기능 : 이미지의 세로높이를 받아와서 세로스크롤을 수행한다.
  // 파라미터(이동대상, 이동값)
  function verticalScroll(target, dir) {
    // target - 대상배열
    y += MOVE * dir;
    if (y > 0) y = 0;
    else if (y < -target[1]) y = -target[1];
    target[2].css("top", y + "px");
  } ////////// 세로스크롤 함수 //////////////

  // 기능 : 가로세로 스크롤을 조합하여 박스를 이동시킨다.
  // 파라미터 (이미지 전체박스)
  const infoScroll = (delta,x)=>{
    // 휠 이벤트 시 네비설정
    for(let i=0; i < imgWidSize.length; i++){
      if(x <= -imgWidSize[i]){
        addOnNav(i)
      }
    }
    if (x >= 0 && delta > 0) x = 0;
    else if (x >= -pos[0][0]) x = horizonScroll(pos[0], delta);
    else if (x >= -pos[1][0]) x = horizonScroll(pos[1], delta);
    else if (x >= 0 && delta <= 0) x = 0;
    if (x <= -pos[1][0] && delta < 0) x = -pos[1][0];
    infoBox.css("left", x + "px");
  }; //////// infoScroll 함수 ///////////////

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
    // y값은 초기로
    y = 0;
    infoImg.css("top", y + "px");
  } /////////// clickNav ////////////

  // 휠 이벤트 주기
  document.querySelector(".prod-info").addEventListener("wheel", (event) => {
    if (psts === 1) return true; //돌아가!
    psts = 1; //잠금!
    setTimeout(function () {
      psts = 0; //해제
    }, 100); //0.02초후 해제///////////
    let delta = event.wheelDelta;
    x = $(tg).find(".info-box").position().left;
    console.log(event,x);
    // console.log(x,delta);
    delta = delta > 0 ? 1 : -1;
    // console.log("휠중", delta); 
    /////// 광스크롤 막기 //////////////////
    //// 마우스 휠 방향에 따라 가로스크롤 이동 증감! /////
    // console.log(x,delta);
    infoScroll(delta,x);
  });
}
