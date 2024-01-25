// 달력구현 JS - calendar.js

// document객체
const dFn = {
  qs: (x) => document.querySelector(x),
  qsa: (x) => document.querySelectorAll(x),
  qsEl: (el, x) => el.querySelector(x),
  qsaEl: (el, x) => el.querySelectorAll(x),
  cg: (x) => console.log(x),
  addZero: (x) => (x < 10 ? "0" + x : x),
  addEvt: (ele, evt, fn) => ele.addEventListener(evt, fn),
  // 날짜 찍기 형식변경 함수(yyyy-mm-dd 요일)
  fm: (x) => `${x.getFullYear()}-${dFn.addZero(x.getMonth() + 1)}-${dFn.addZero(x.getDate())} ${week[x.getDay()]}요일`,
};
//  요일정보 배열
const week = ["일", "월", "화", "수", "목", "금", "토"];

function makeDallyeok(selEl) {
  // selEl - 달력 넣을 요소(선택자만 보냄)
  // 0. 달력 컴포넌트 html넣기
  dFn.qs(selEl).innerHTML = insertCalendarCode();
  // console.log('달력만들어');

  // 1. 변수세팅
  // (1) 변경 할 현재날짜 객체
  const currDate = new Date();
  // (2) 오늘 날짜 객체
  const today = new Date();
  // (3) 년도요소 .yearTit
  const yearTit = dFn.qs(selEl + " .year");
  // (4) 월요소 .monthTit
  const monthTit = dFn.qs(selEl + " .month");
  // (5) 일요소 .dates
  const dates = dFn.qs(selEl + " .dates");
  // console.log(currDate,today,yearTit,monthTit,dates);
  // (6) 날짜넣을 배열변수
  const dateSet = [];
  // (7) html 코드저장 변수
  let hcode = "";
  // 2. 함수만들기

  // (1) 달력초기화 구성함수 /////////
  const initDallyeok = () => {
    // -> 배열변수.splice(순번,개수) , .splice(0); 하면 초기화됨
    dateSet.splice(0);
    hcode = "";

    // (1) 당해년도
    let currYear = currDate.getFullYear();
    // (2) 당월
    let currMonth = currDate.getMonth();

    // [ 전달 끝 날짜, 첫 날짜 알아오기 ]
    // new Date(년도,월,0-끝날짜||1-끝날짜 +1일)
    // 년도, 월, 옵션
    // 1. 전달 마지막 날짜(옵션: 0) -> 달력 처음 이전달 끝 날짜 표시
    const prevLastDate = new Date(
      currYear,
      currMonth,
      // currMonth+1, : 현재 달
      0
    );
    dFn.cg("1. 전달 마지막 날짜 : " + dFn.fm(prevLastDate));

    // 2. 현재달 첫 날짜 (옵션:1->전달로 세팅)
    // -> 달력 전달 세팅을 위한 요일을 구하기 위해서
    // -> 일요일 시작이면 전달을 찍을 필요없음
    const thisFirstDate = new Date(currYear, currMonth, 1);
    dFn.cg("2. 현재달 첫 날짜 : " + dFn.fm(thisFirstDate));

    // 3. 현재달 마지막 날짜
    const thisLastDate = new Date(currYear, currMonth + 1, 0);
    dFn.cg("3. 현재달 마지막 날짜 : " + dFn.fm(thisLastDate));

    // 4. 년도 표시하기
    yearTit.innerHTML = currYear + "년";
    // 5. 월 표시하기
    monthTit.innerHTML = currMonth + 1 + "월";
    // 6. 날짜 데이터 태그 구성하기
    // 6-1. 전달 날짜 앞쪽 채우기
    // 조건 : 현재달 첫 날짜 요일이 0이 아니면 내용 있음!
    // -> 일요일 시작인 월은 전달을 출력 할 필요가 없음
    let fDay = thisFirstDate.getDay();
    dFn.cg("이번달 첫 날 요일:" + fDay);
    if (fDay != 0) {
      for (let i = 0; i < fDay; i++) {
        // 마지막 날로부터 반복 횟수만큼 배열을 앞으로 추가
        // 앞에 추가 메서드 unshift()
        dateSet.unshift(`
            <span style="color:#ccc" class="bm">
            ${prevLastDate.getDate() - i}
            </span>
            `);
      } //////////for////////////////
    } ////////////////if////////////////////

    // 6-2. 당월 날짜 채우기
    // 반복문 구성 : 현재월 1일부터 마지막 날짜까지 반복 배열 추가
    for (let i = 1; i <= thisLastDate.getDate(); i++) {
      dateSet.push(i);
    } ///////////////////for////////////////////

    // 6-3. 다음달 마지막 날짜 채우기
    // 조건 : 클래스 am으로 구분
    // 반복문 구성 : 1부터 2주 분량정도 넣는다.
    for (let i = 1; i <= 14; i++) {
      dateSet.push(`
        <span style="color:#ccc" class="am">
        ${i}
        </span>
        `);
    } ///////////////////for////////////////
    dFn.cg(dateSet);

    // 7. 날짜배열로 날짜태그 구성하여 출력하기
    // 7 일 * 6주 출력 = 42개 출력
    dates.innerHTML = dateSet.map((v, seq) => (seq < 42 ? `<div class='date'>${v}</div>` : ``)).join("");
    // 오늘 날짜 표시하기
    for (let i = 0; i < 42; i++) {
      // 오늘 날짜와 같은 경우 클래스 today넣기
      if (
        // 날짜 일치
        today.getDate() == dateSet[i] &&
        // 월 일치
        today.getMonth() == currDate.getMonth() &&
        // 년 일치
        today.getFullYear() == currDate.getFullYear()
      ) {
        hcode += `<div class='date today'>${dateSet[i]}</div>`;
      } else {
        hcode += `<div class='date'>${dateSet[i]}</div>`;
      }
    } ///////////for////////////////////

    // 8. 날짜태그 출력하기
    dates.innerHTML = hcode;

    // 9. 날짜정보 사용하도록 세팅하기
    // (1)대상 : .dates
    // 위에서 새로 세팅 된 대상을 읽어와야함
    let newDate = dFn.qsa(selEl+' .date');
    console.log(newDate);
    // (2) 각 날짜 .date요소에 링크 설정하기
    newDate.forEach(ele=>{
      dFn.addEvt(ele,'click',()=>{
        // 1. 연월일 데이터 읽어오기
        // (1) 년도
        let showYear = yearTit.innerText.split('년')[0];
        // (2) 월
        let showMonth = monthTit.innerText.split('월')[0];
        // (3) 일
        let showDate = ele.innerText;
        
        // (5) 전달 or 다음달 날짜 구분하기
        let isSpan = dFn.qsEl(ele,'span');
        if(isSpan){ // span이 있으면 true
          let isAm = isSpan.classList.contains('am');
          if(isAm){
            showMonth++;
            if(showMonth==13){
              //13월은 1월로 처리
              showMonth = 1;
              //년 증가
              showYear++;
            } ///// if 13월 처리////
          } /////////// if 다음월 날짜 처리 ////////
          else{
            showMonth--;
            if(showMonth==0){
              //0월은 12월로 처리
              showMonth = 12;
              //년 감소
              showYear--;
            } ////// if 0월 처리 ////////
          }/////////// if 전월 날짜 처리 ////////
        }
        //[ 요일찍기 참고 ]
        // 날짜구성하기 : yyyy-mm-dd
        let setDate = `${showYear}-${dFn.addZero(showMonth)}-${dFn.addZero(showDate)}`;
        // (4) 요일셋팅하기
        let setDay = new Date(setDate).getDay();
        console.log(setDate+`(${week[setDay]})`);
        // 2. 날짜 체크하기
        // 기존 check클래스 삭제
        newDate.forEach(ele=>ele.classList.remove('check'));
        // 누른요소 check클래스 주기
        ele.classList.add('check');
      }); ////////click함수///////
    }); /////////forEach////////////
  }; ////////initDallyeok함수.////////

  // 초기화 함수 호출
  initDallyeok();

  // (2) 달력 변경 함수
  const chgCalender = (num) => { //num(1 다음, -1이전)
    console.log("달력 ㄱㄱ",num);
    // getMonth() 월 가져오기 / setMonth() 월 세팅하기!
    currDate.setMonth(currDate.getMonth()+num);
    
    initDallyeok();
  }; ////////chgCalender 함수 ////////////

  // 3. 이벤트 설정하기
  // 이전버튼, 다음버튼 함수 연결 : 변경함수에 num(1 다음, -1이전)
  dFn.addEvt(dFn.qs(selEl+" .btnL"), "click", ()=>chgCalender(-1));
  dFn.addEvt(dFn.qs(selEl+" .btnR"), "click", ()=>chgCalender(1));
} //////////// makeDallyeak함수 ///////////

/************************************************************
    함수명 : insertCalendarCode
    기능 : 달력의 HTML 코드 넣기
************************************************************/
function insertCalendarCode() {
  // 달력 html코드를 리턴함
  return `
  <!-- 달력 타이틀 -->
  <div class="pop-head">
    <span class="pop-head-tit">찾아가실 날짜</span>
    <button class="calbtn btnL fa-solid fa-caret-left"></button>
    <section class="cal-title">
      <span class="year"></span>
      <span class="month"></span>
    </section>
    <button class="calbtn btnR fa-solid fa-caret-right"></button>
  </div>
  <!-- 달력 -->
  <div class="pop-body">
    <section class="calendar">
      <!-- 달력 주 구성박스 -->
      <div class="week">
        <div class="day">일</div>
        <div class="day">월</div>
        <div class="day">화</div>
        <div class="day">수</div>
        <div class="day">목</div>
        <div class="day">금</div>
        <div class="day">토</div>
      </div>
      <!-- 달력 날짜 구성박스 -->
      <div class="dates">
      </div>
    </section>
  </div>
  <!-- 취소/다음버튼 -->
  <div class="pop-footer">
    <div class="proceed-btn-box pop-btn cal-btn">
      <button class="btn prev">
        <i class="fa-solid fa-xmark"></i>
        &nbsp;닫기
      </button>
      <button class="btn next">
        다음&nbsp;
        <i class="fa-solid fa-circle-play"></i>
      </button>
    </div>
  </div>

  `;
} ///////////// insertCalendarCode //////////////////

export default makeDallyeok;
