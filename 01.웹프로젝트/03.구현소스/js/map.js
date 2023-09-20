// 온고롱 오시는길 페이지 JS - bmap.js

// footer영역 가져오기
import startFooterFn from "./footer.js";
// dom 가져오기
import domFn from "./dom.js";
// footer영역 실행
startFooterFn();

// [ 마우스를 클릭 한 li에 on을 준다 ]
// 1. 대상선정 
// 1-1. 변경대상 contact-info>ul>li

let contactInfo = domFn.qsa('.contact-info>ul>li'); 
// 2. 클릭이벤트 설정
contactInfo.forEach(ele=>{
    domFn.addEvt(ele,'click',(e)=>{
        contactInfo.forEach(ele=>{
            // 모든 li에 on지우기
            ele.classList.remove('on');
        });
        console.log(ele);
        // 클릭대상에 on넣기
        ele.classList.add('on');
    });
});
