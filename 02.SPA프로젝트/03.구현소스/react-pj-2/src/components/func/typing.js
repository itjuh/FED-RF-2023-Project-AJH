// 타이핑 효과 js
import $ from "jquery";

// 타이핑 시간
const TYPING_TIME = 50;
// 타이핑 글자배열 변수
let typingArr;
// 인터발 함수 autoI
let autoI;
// 잠금설정
let psts = 0; // 1잠금 0해제

// .25초마다 글자를 입력하는 인터발 함수
function insertText(data, area) {
  if (psts === 1) return true; //돌아가!
  psts = 1; //잠금!
  setTimeout(function () {
    psts = 0; //해제
  }, 300); //0.3초후 해제///////////
  // 데이터 초기화
  area.text("");
  typingArr = data.split("");
  let txt = "";
  let count = 0;
  // 인터발 함수
  autoI = setInterval(() => {
    txt += typingArr[count];
    $(area).text(txt);
    count++;
    // 글자데이터 길이보다 길어지면 멈춤
    if (count >= typingArr.length) {
      clearInterval(autoI);
    }
  }, TYPING_TIME);
} ////////////insertText함수/////////////

// 타이핑 텍스트 키 매칭함수
function typingKey(txt) {
  // 타이핑 텍스트 나누기
  let eachTxt = txt.toUpperCase().split("");
  // console.log(eachTxt);
  // 타이핑 효과 줄 키 저장 변수
  let sameKeyList = [];
  for (let i = 0; i < eachTxt.length; i++) {
    $(".key-top aside").each((idx, ele) => {
      if ($(ele).text() == eachTxt[i]) {
        //조부모찾아서 담기(스타일 대상)
        sameKeyList[i] = $(ele).parent();
      } /////// if 일치하면 담기//////////
    }); /////////// key-top forEach /////////////
  } ///////// for ////////////////

  // 스타일 적용
  sameKeyList.forEach((ele, idx) => {
    setTimeout(() => {
      ele.css({ transform: "translateY(10px)", backgroundColor: "cornflowerblue" });
      // 일정시간 후 타이핑 초기화
      typingShow(ele);
    }, 30 + idx * TYPING_TIME);
  });
} ////////// typingKey 함수 //////////

// 스타일 초기화 함수
function typingShow(ele) {
  setTimeout(() => {
    ele.css({ transform: "translateY(0px)", backgroundColor: "#fff" });
  }, 100);
} ////////// typingShow 함수 //////////

export { insertText, typingKey };
