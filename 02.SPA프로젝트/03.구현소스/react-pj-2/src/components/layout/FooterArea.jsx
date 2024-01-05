// 하단영역 컴포넌트

import { memo, useRef } from "react";

import $ from "jquery";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faKeyboard } from "@fortawesome/free-solid-svg-icons";
import { Menu } from "../pages/Menu";

export const FooterArea = memo(() => {
  console.log('footer');
  // 메뉴 열림 닫힘 useRef 상태변경 함수 1-메뉴열림 0-닫힘
  const menuSts = useRef(0);
  // 메뉴 열림닫힘
  const chgMenuSts = (num) => {
    // useRef 변경
    menuSts.current = num;
    // props 상태변경
    // props.chgsts(menuSts.current);
    // 메뉴상태 변경
    onOff(menuSts.current);
  };

  // 메뉴 열림 닫힘 상태변경
  const onOff = (num) => {
    if (num) {
      // console.log($(".basic-footer"));
      $(".basic-footer").slideUp(400);
      // keyboard 보이기
      $(".gnb-menu-area").addClass("on");
    } else {
      // keyboard 없애기
      $(".gnb-menu-area").removeClass("on");
      // 메뉴창 닫힘
      $(".basic-footer").slideDown(400);
    } ////////// else ////////////
  };

  return (
    <>
      {/* 3. 하단영역 */}
      <div id="footer">
        <footer className="footer in-box row-2">
          <div className="basic-footer flex-box">
            <div className="part-box col-6 col-s-0"></div>
            {/* 3-1. 하단메뉴 아이콘 */}
            <div className="part-box col-4 menu-area col-s-6">
              <a className="flex-box" href="#" title="메뉴열기" onClick={(e) => {e.preventDefault();chgMenuSts(1);}}>
                <FontAwesomeIcon icon={faChevronUp} className="menu-icon" />
                <span className="ir">위쪽방향화살표</span>
                <FontAwesomeIcon icon={faKeyboard} className="menu-icon" />
                <span className="ir">메뉴</span>
              </a>
            </div>
            
          </div>
          {/* 하위메뉴 열기영역 */}
          <section className="in-box row-16 gnb-menu-area">
            <Menu chgFn={chgMenuSts} sts={menuSts.current} />
          </section>
        </footer>
      </div>
    </>
  ); //////// return //////////
}); ///////// FooterArea 컴포넌트 ////////////
