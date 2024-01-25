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
const mapBox = domFn.qs(".map");
window.addEventListener("DOMContentLoaded", function () {
  mapBox.innerHTML += `<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3160.642052702756!2d127.07570277646172!3d37.610582521600264!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357cbb25952d435d%3A0x2ac6e7c724f5f77c!2z7Jio6rOg66Gx!5e0!3m2!1sko!2skr!4v1694680397650!5m2!1sko!2skr" 
    allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade">
    </iframe>`;
});

let contactInfo = domFn.qsa(".contact-info>ul>li");
// 2. 클릭이벤트 설정
contactInfo.forEach((ele) => {
  domFn.addEvt(ele, "click", (e) => {
    contactInfo.forEach((ele) => {
      // 모든 li에 on지우기
      ele.classList.remove("on");
    });
    console.log(ele);
    // 클릭대상에 on넣기
    ele.classList.add("on");
  });
});
