// 타이핑 효과 js
import $ from "jquery";

// 타이핑 시간
const TYPING_TIME = 50;
// 인터발 함수 autoI
let autoI;

// let psts = 0; // 1잠금 0해제
const keylist = {
  KEYBOARD:[['K', 'E', 'Y', 'B', 'O', 'A', 'R', 'D'],[36, 17, 20, 46, 23, 29, 18, 31]],
  SWITCH:[['S', 'W', 'I', 'T', 'C', 'H'],[30, 16, 22, 19, 44, 34]],
  LOGIN:[['L', 'O', 'G', 'I', 'N'],[37, 23, 33, 22, 47]],
  REGISTER:[['R', 'E', 'G', 'I', 'S', 'T', 'E', 'R'],[18, 17, 33, 22, 30, 19, 17, 18]],
  WISHLIST:[['W', 'I', 'S', 'H', 'L', 'I', 'S', 'T'],[16, 22, 30, 34, 37, 22, 30, 19]],
  CONTACT:[['C', 'O', 'N', 'T', 'A', 'C', 'T'],[44, 23, 47, 19, 29, 44, 19]],
};
// 초마다 글자를 입력하는 인터발 함수
function insertText(txt, area) {
  // 데이터 초기화
  let count = 0;
  let inTxt = keylist[txt][0];
  let tglist = [];
  keylist[txt][1].forEach((ele,idx) => {
    tglist[idx] = $('.key').filter(`:eq(${ele})`);
  });
  clearInterval(autoI);
  // 인터발 함수
  autoI = setInterval(() => {
    $(area).append(inTxt[count]);
    tglist[count].addClass('push');
    count++;
    reset(tglist[count-1]);
    // 글자데이터 길이보다 길어지면 멈춤
    if (count >= inTxt.length) {
      clearInterval(autoI);
    }
  }, TYPING_TIME);
} ////////////insertText함수/////////////

// 스타일 초기화 함수
function reset(ele) {
  // 리셋 setTime함수 호출
  setTimeout(() => {
    ele.removeClass("push");
  }, 200);
} ////////// reset 함수 //////////

function resetAutoI() {
  clearInterval(autoI);
}
export { insertText, resetAutoI };

// 텍스트 매칭 키 찾기
