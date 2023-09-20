//dom 모듈

export default {
    // 요소선택함수 ////////
    qs: (x) => document.querySelector(x),
    qsEl: (el, x) => el.querySelector(x),
    qsa: (x) => document.querySelectorAll(x),
    qsaEl: (el, x) => el.querySelectorAll(x),
  
    // 이벤트셋팅함수
    addEvt: (ele, evt, fn) => ele.addEventListener(evt, fn),

    // 바운딩 위치값 함수
    getBCR: (ele) => ele.getBoundingClientRect().top,
    // 옵셋 탑 반환 함수
    getOT: ele => ele.offsetTop,

}; /////// domFn 객체 /////////////