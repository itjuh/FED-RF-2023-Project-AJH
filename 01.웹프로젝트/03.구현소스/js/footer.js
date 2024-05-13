// dom 불러오기
import domFn from './dom.js';

// footer영역 
// footer_sns span높이만큼 길이만큼 영역확장
// 1. 대상 : 
// 1-1. 수집대상 .footer_sns span 
// 1-2. 이벤트 대상/변경대상 .footer-sns li
// 2. 이벤트 : mouseover , mouseleave

function footerFn(){
    const snsLi = domFn.qsa('.footer-sns li');
    // console.log(snsLi, snsSpan);
    //이벤트 지정하기
    snsLi.forEach(ele=>{
        domFn.addEvt(ele,'mouseover',openSns);
        domFn.addEvt(ele,'mouseleave',closeSns);
    });
} //////////footer영역 함수//////////////////

// 함수만들기
function openSns(){
    let txtCnt = domFn.qsEl(this,'span').innerText.length;
    this.style.width = `${txtCnt*20 + 50}px`;
} //////// sns열기함수//////////////
function closeSns(){
    this.style.width = '45px';
} //////// sns닫기함수 /////////////

function startFooterFn(){
    footerFn();
} ////////footerFn()실행함수/////////
// footer영역 내보내기
export default startFooterFn;

