// 온고롱 메인js - main.js
// footer영역 가져오기
import startFooterFn from "./footer.js";
// dom 가져오기
import domFn from "./dom.js";
// footer영역 실행
startFooterFn();

// 0-1. 새로고치면 스크롤바 위치 캐싱 후 맨 위로 이동
setTimeout(() => {
  // 윈도우 스크롤 맨 위로!
  window.scrollTo(0,0);
}, 500);
// 전역변수
// 1. 광클금지 상태변수 : 0-허용, 1-불허용
let clickSts = 0;
// 2. 슬라이드 이동시간
const TIME_SLIDE = 800;

// 배너구역 크기지정(.banner-area)
const bannerArea = document.querySelector(".banner-area");
// 초기세팅
bannerHeightSetting();
function bannerHeightSetting(){
    let winH = window.innerHeight;
    let winW = window.innerWidth;
    if(winW > 800){
        bannerArea.style.height = winH - 100 + 'px';
    }else {
        bannerArea.style.marginTop = 120 +'px';
    }
}
// 사이즈 변경 시 새로 적용
window.addEventListener('ResizeObserver',bannerHeightSetting);
//////////////////////////////////////
// 배너 움직이기
// 이벤트 대상 :.prev-btn/.next-btn
// 변경대상 이미지 : .banner-ul  > evtBannerImg
// 변경대상 설명 : .banner-desc>ol  > bannerDescBox
/////////////////////////////////////////
// 1. 대상선정
// 1-1. 버튼들 .move-btn 수집
const moveBtn = domFn.qsa('.move-btn');
// 1-2. 변경대상 수집
// 대상 banner-ul
let evtBannerImg = domFn.qs('.banner-ul');
// 대상 banner-desc>ol
let bannerDescBox = domFn.qs('.banner-desc>ol');

// 수집확인
// console.log(moveBtn,evtBannerImg,bannerDescBox);
// 2. 이벤트 지정
// moveBtn[0].onclick = goSlide;
moveBtn.forEach(ele=>domFn.addEvt(ele,'click',goSlide));

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
    // let bannerImgArr = evtBannerImg.querySelectorAll('li');
    // let bannerDescArr = bannerDescBox.querySelectorAll('li');
    let bannerImgArr = domFn.qsaEl(evtBannerImg,'li');
    let bannerDescArr = domFn.qsaEl(bannerDescBox,'li');
    // console.log(bannerImgArr);
    // console.log(bannerDescArr);
    if(isNext){ //오른쪽 버튼
        // (1)대상이동 : 이미지 가로이동, 텍스트 세로이동
        evtBannerImg.style.left = '-100%';
        bannerDescBox.style.left = '-100%';
        // (2)트랜지션
        evtBannerImg.style.transition = TIME_SLIDE+'ms ease-in-out';
        bannerDescBox.style.transition = TIME_SLIDE+'ms ease-in-out';
        // 이동시간 후 맨 앞 li 잘라서 맨 뒤로 이동하기
        // appendChild(요소);
        setTimeout(()=>{ //비동기처리
            // (3)맨 앞 li 맨 뒤로 이동
            evtBannerImg.appendChild(bannerImgArr[0]);
            bannerDescBox.appendChild(bannerDescArr[0]);
            // (4)슬라이드 left값 초기화, left
            evtBannerImg.style.left = '0';
            bannerDescBox.style.left = '0';
            // (5)트랜지션 없애기
            evtBannerImg.style.transition = 'none';
            bannerDescBox.style.transition = 'none';
        },TIME_SLIDE);
    // 잘라내서 붙이기! 위치값-100%만들기! 움직이기!
    }else{ //왼쪽버튼
        // (1)맨뒤 li 맨 앞으로 이동
        // 놈놈놈 ->insertBefore(넣을놈, 넣을놈전놈);
        evtBannerImg.insertBefore(bannerImgArr[bannerImgArr.length-1],bannerImgArr[0]);
        bannerDescBox.insertBefore(bannerDescArr[bannerDescArr.length-1],bannerDescArr[0]);
        // (2)left,left값 -100%만들기(밖으로 나가서 안보이게) : 입장준비
        evtBannerImg.style.left = '-100%'
        bannerDescBox.style.left = '-100%'
        // (3)트랜지션 없애기
        evtBannerImg.style.transition = 'none';
        bannerDescBox.style.transition = 'none';
        // 같은 left값을 동시에 변경하면 효과가 없음
        setTimeout(()=>{// 비동기처리해야함
        // (4)left,left값 0으로 들어오기!
        evtBannerImg.style.left = '0';
        bannerDescBox.style.left = '0';
        // (5)트랜지션주기
        evtBannerImg.style.transition = TIME_SLIDE+'ms ease-in-out';
        bannerDescBox.style.transition = TIME_SLIDE+'ms ease-in-out';
        },0);
    } ///////////if else //////////
} /////////goSlide /////////////////

