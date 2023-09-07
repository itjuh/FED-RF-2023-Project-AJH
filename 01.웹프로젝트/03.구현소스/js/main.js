// 온고롱 메인js - main.js

// DOM함수
const qs = x => document.querySelector(x);
const qsa = x => document.querySelectorAll(x);
// 이벤트함수
const addEvt = (ele,evt,fn) => ele.addEventListener(evt,fn);

// 전역변수
// 1. 광클금지 상태변수 : 0-허용, 1-불허용
let clickSts = 0;
// 2. 슬라이드 이동시간
const TIME_SLIDE = 800;

// 배너 데이터 뿌리기
// 대상 main-banner>ul
let banner = qs('.banner-ul');
// 코드변수
let hcode = ``;

for(let x in event_info){
    // 데이터 넣기
    hcode += `
    <li>
        <!-- 배너이미지 -->
        <img src="${event_info[x]["src"]}" alt="event">
        <!-- 배너설명 -->
        <div class="banner-desc">
            <ol>
                <li class="tit">${event_info[x]["tit"]}</li>
                <li class="txt">${event_info[x]["cont"]}~</li>
                <!-- 더보기버튼 -->
            </ol>
            <button class="move-view-btn">더보기</button>
        </div>
    </li>
    `;
}
banner.innerHTML = hcode;

///////////////////////////////////////
// 배너 움직이기
// 이벤트 대상 :.prev-btn/.next-btn
// 변경대상 : .banner-area>ul>li
/////////////////////////////////////////
// 1. 대상선정
// 1-1. 버튼들 .move-btn 수집
const move_btns = qsa('.move-btn');
// 1-2. 변경대상 수집
const event_banner = qs('.banner-ul');
// 수집확인
console.log(move_btns,event_banner);
// 2. 이벤트 지정
// move_btns[0].onclick = goSlide;
move_btns.forEach(ele=>addEvt(ele,'click',goSlide));

/***************************************
    함수명 : goSlide
    기능 : 
    1. 방향버튼 클릭 시 배너를 이동
    2. 광클을 막기위해 TIME_SLIDE = 800 줌(ms)
***************************************/
// 3. 함수생성
function goSlide(){

    // 광클금지
    if(clickSts) return;//나가기
    clickSts=1;//잠금
    setTimeout(()=>clickSts=0,TIME_SLIDE);//해제!

    // 호출확인
    // 버튼종류 확인
    let isNext = this.classList.contains('next-btn');
    console.log(isNext);
    // 배너 새로 읽기
    let banner_arr = event_banner.querySelectorAll('.banner-ul>li');
    console.log(banner_arr);
    if(isNext){ //오른쪽 버튼
        // (1)대상이동
        event_banner.style.left = '-100%';
        // (2)트랜지션
        event_banner.style.transition = TIME_SLIDE+'ms ease-in-out';
        // 이동시간 후 맨 앞 li 잘라서 맨 뒤로 이동하기
        // appendChild(요소);
        setTimeout(()=>{ //비동기처리
            // (3)맨 앞 li 맨 뒤로 이동
            event_banner.appendChild(banner_arr[0]);
            // (4)슬라이드 left값 초기화
            event_banner.style.left = '0';
            // (5)트랜지션 없애기
            event_banner.style.transition = 'none';
        },TIME_SLIDE);
    // 잘라내서 붙이기! 위치값-100%만들기! 움직이기!
    }else{
        // (1)맨뒤 li 맨 앞으로 이동
        // 놈놈놈 ->insertBefore(넣을놈, 넣을놈전놈);
        event_banner.insertBefore(banner_arr[banner_arr.length-1],banner_arr[0]);
        // (2)left값 -100%만들기(밖으로 나가서 안보이게) : 입장준비
        event_banner.style.left = '-100%'
        // (3)트랜지션 없애기
        event_banner.style.transition = 'none';
        // 같은 left값을 동시에 변경하면 효과가 없음
        setTimeout(()=>{// 비동기처리해야함
            // (4)left값 0으로 들어오기!
            event_banner.style.left = '0';
            // (5)트랜지션주기
            event_banner.style.transition = TIME_SLIDE+'ms ease-in-out';
        },0);
    } ///////////if else //////////
} /////////goSlide /////////////////
