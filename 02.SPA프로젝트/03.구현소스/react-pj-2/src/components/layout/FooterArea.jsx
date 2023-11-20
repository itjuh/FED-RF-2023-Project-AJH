// 하단영역 컴포넌트

import { useEffect } from "react";
// 제이쿼리 + 제이쿼리 ui
import $ from "jquery";
import "jquery-ui-dist/jquery-ui";
import { KeyCon, UpArrowCon } from "../modules/Icons";

export function FooterArea() {
  useEffect(()=>{
    // 제이쿼리 드래그
    $('.tg-cir').draggable({
      axis: "x",
      containment: "parent"
    });
    $('.tg-btn').droppable({
      drop:function(evt,ele){
        // evt-이벤트전달변수 ele-드롭객체
        $(this).css({
          color: '#000',
        }).siblings().css({
          color: 'rgb(128, 128, 128)',
        })
        // 드롭된 요소는 ele.draggable
      }, ///////drop이벤트 옵션 메서드
    });
  }); /////////useEffect구역///////////
  return (
    <>
      {/* 3. 하단영역 */}
      <div id="footer">
      <footer className="footer in-box row-2 flex-box">
        <div className="part-box col-6"></div>
        {/* 3-1. 하단메뉴 아이콘 */}
        <div className="part-box col-4 flex-box menu-area">
          <a href="#" className="menu-icon" title="메뉴열기"><UpArrowCon /><span className="ir">위쪽방향화살표</span></a>
          <a href="#" className="menu-icon" title="메뉴열기"><KeyCon /><span className="ir">메뉴</span></a>
        </div>
        {/* 3-2. 토글버튼 영역 */}
        <div className="part-box col-6 flex-box toggle-area">
          <aside className="toggle-btn-box">
            <div className="tg-cir"></div>
            <div className="tg-keyboard tg-btn">keyboard</div>
            <div className="tg-switch tg-btn">switch</div>
          </aside>
        </div>
      </footer>
      </div>
    </>
  ); //////// return //////////
} ///////// FooterArea 컴포넌트 ////////////
