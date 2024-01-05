// 토글 초기화 함수
import $ from "jquery";
import "jquery-ui-dist/jquery-ui";

function initToggle() {
  // 토글박스 원 초기설정
  $(".tg-cir").css({
    left: "4px",
  });
  // 토글박스 글자 초기설정
  $(".tg-btn")
    .first()
    .css({
      color: "#000",
    })
    .siblings()
    .css({
      color: "rgb(128, 128, 128)",
    });
  let res = ['main',"Keyboard List"];
  return res;
} /////////// initToggle 함수 ///////////
function swToggle() {
  
  // 토글박스 원 설정
  $(".tg-cir").css({
    left: "99px",
  });
  // 토글박스 글자 설정
  $(".tg-btn")
    .last()
    .css({
      color: "#000",
    })
    .siblings()
    .css({
      color: "rgb(128, 128, 128)",
    });
  let res = ['Switch',"Switch List"];
  return res;
}

export { initToggle, swToggle };
