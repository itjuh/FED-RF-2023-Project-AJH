// 하단영역 컴포넌트

import { memo, useRef } from "react";
import { Toggle } from "../modules/Toggle";
import { useNavigate } from "react-router-dom";
import $ from "jquery";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faKeyboard } from "@fortawesome/free-solid-svg-icons";
import { Menu } from "../pages/Menu";

export const FooterArea = memo((props) => {
  // props.tit - 상단타이틀 props.chgsts - 상태변경 함수 1-메뉴열림 0-닫힘
  // const nav = useNavigate();
  // 메뉴 열림 닫힘 useRef 상태변경 함수 1-메뉴열림 0-닫힘
  const menuSts = useRef(0);
  const chgMenuSts = num => {
    // useRef 변경
    menuSts.current = num;
    // props 상태변경
    props.chgsts(menuSts.current);
    // 메뉴상태 변경
    onOff(menuSts.current);
  }
  // 네비게이션 설정 함수
  // function goNav() {
  //   console.log("어디로든 가자");
  // } /////// goNav함수 /////////

  // 메뉴 열림 닫힘 상태변경
  const onOff = (num) => {
    if (num) {
      // console.log($(".basic-footer"));
      $(".basic-footer").animate(
        {
          opacity: "0",
          height: "0",
        },
        300,
        "easeInCirc",
        () => {
          // keyboard 보이기
          $('.gnb-menu-area').addClass('on');
        }
      );
    } else {
      // 메뉴창 닫힘
      $('.gnb-menu-area').removeClass('on');
      $(".basic-footer").animate(
        {
          opacity: "1",
          height: "auto",
        },
        300,
        "easeInCirc",
      );
    } ////////// else
  };

  return (
    <>
      {/* 3. 하단영역 */}
      <div id="footer">
        <footer className="footer in-box row-2">
          <div className="basic-footer flex-box">
            <div className="part-box col-6"></div>
            {/* 3-1. 하단메뉴 아이콘 */}
            <div className="part-box col-4 menu-area">
              <a className="flex-box" href="#" title="메뉴열기" onClick={()=>chgMenuSts(1)}>
                <FontAwesomeIcon icon={faChevronUp} className="menu-icon" />
                <span className="ir">위쪽방향화살표</span>
                <FontAwesomeIcon icon={faKeyboard} className="menu-icon" />
                <span className="ir">메뉴</span>
              </a>
            </div>
            {/* 3-2. 토글버튼 영역 */}
            <Toggle />
          </div>
          {/* 하위메뉴 열기영역 */}
          <section className="in-box row-12 gnb-menu-area">
            <Menu chgFn={chgMenuSts} sts={menuSts.current}/>
          </section>
        </footer>
      </div>
    </>
  ); //////// return //////////
}); ///////// FooterArea 컴포넌트 ////////////
