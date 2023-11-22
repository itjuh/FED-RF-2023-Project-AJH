// 하단 토글 변환 컴포넌트
import { useEffect } from "react";
// 제이쿼리 + 제이쿼리 ui
import $ from "jquery";
import "jquery-ui-dist/jquery-ui";
import { useContext } from "react";
import { LeoCon } from "./LeopoldContext";
import { useLayoutEffect } from "react";


export function Toggle() {
  const myCon = useContext(LeoCon);

  useLayoutEffect(()=>{
    // 토글박스 원 초기설정
    $(".tg-cir").css({
      left:'4px',
    })
  },[]);
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
        $(this)
          .css({
            color: "#000",
          })
          .siblings()
          .css({
            color: "rgb(128, 128, 128)",
          });
        // 드롭 시 위치 조정 + 토글변경
        let txt = $(this).text();
        if(txt == 'switch') {
          cir.css({
                left:'99px',
            })
            myCon.chgTog(txt);
            myCon.chgTit('Switch List');
        }else {
          cir.css({
                left:'4px',
            })
            myCon.chgTog('main');
            myCon.chgTit('Keyboard List');
        }
      }, ///////drop이벤트 옵션 메서드
    });
  }); /////////useEffect구역///////////
  return (
    <div className="part-box col-6 flex-box toggle-area">
      <aside className="toggle-btn-box">
        <div className="tg-cir"></div>
        <div className="tg-keyboard tg-btn">keyboard</div>
        <div className="tg-switch tg-btn">switch</div>
      </aside>
    </div>
  );
}
