// 하단 토글 변환 컴포넌트
import { useEffect, useRef } from "react";
// 제이쿼리 + 제이쿼리 ui
import $ from "jquery";
import "jquery-ui-dist/jquery-ui";
import { useContext } from "react";
import { LeoCon } from "../modules/LeopoldContext";

export function Toggle() {
  const myCon = useContext(LeoCon);
  // console.log(window.location.href.split('/')[1]);
  let val = myCon.toggleVal == "switch" ? 0 : 1;
  // 토글상태 변수
  const board = useRef(val);
  // 토글상태 변경함수(true/false)
  const chgBoard = (num) => {
    board.current = num;
  };


  // 토글 변경 함수 : 위치를 분기하여 값을 적용한다.
  const swToggle = (tg) => {
    let tgTxt = $(tg).text();
    if (tgTxt !== "") {
      // 기존값에서 변경 됨
      let num = board.current ? 0 : 1;
      setPage(num);
      chgBoard(board.current ? 0 : 1); // 토글 변경
    }
    // 변경적용 함수 호출
  };
  // 변경적용 함수 (css/pagelink)
  const setPage = (num) => {
    // 토글값에 따른 위치이동
    if (num) {
      // 토글 키보드
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
      myCon.chgTog("main");
    } else {
      // 토글 스위치
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
      myCon.chgTog("switch");
    }
  };

  useEffect(() => {
    const cir = $(".tg-cir");
    // 제이쿼리 드래그
    cir.draggable({
      axis: "x",
      containment: "parent",
    });
    $(".tg-btn").droppable({
      drop: function (evt, ele) {
        // evt-이벤트전달변수 ele-드롭객체
        // 드롭 시 위치 조정 + 토글변경
        let txt = $(this).text();
        if (txt === "switch") {
          chgBoard(0);
          // 변경적용 함수 호출
          setPage(0);
        } else {
          chgBoard(1);
          // 변경적용 함수 호출
          setPage(1);
        }
      }, ///////drop이벤트 옵션 메서드
    });
  }); /////////useEffect구역///////////

  return (
      <aside
        className="toggle-btn-box"
        onClick={(e) => {
          swToggle(e.target);
        }}
      >
        <div className="tg-cir"></div>
        <div className="tg-keyboard tg-btn">keyboard</div>
        <div className="tg-switch tg-btn">switch</div>
      </aside>
  );
}
