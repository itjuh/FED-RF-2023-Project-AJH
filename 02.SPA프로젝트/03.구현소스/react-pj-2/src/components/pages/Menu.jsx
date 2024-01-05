import "../../css/menu.css";
import { insertText, resetAutoI } from "../func/typing";
import $ from "jquery";
// 키보드 데이터
import { keyData } from "../data/keyData.js";
import { menuData } from "../data/menuData";
import { MakeKey } from "../modules/MakeKey";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { LeoCon } from "../modules/LeopoldContext";
import { link } from "../data/link";

export function Menu(props) {
  // props.chgFn(useRef 변경 함수)
  // props.sts 메뉴상태

  // 링크 데이터
  let linkData = link;
  // 타이틀 변경용
  const myCon = useContext(LeoCon);
  // 페이지 이동용
  const nav = useNavigate();
  const goNav = (num) => {
    linkData = link[num];
    // 페이지 이동
    nav(linkData.link);
    // 메뉴닫기
    props.chgFn(0);
  };

  const keyinput = (e) => {
    resetAutoI();
    // 해당 타이핑 영역
    let target = $(e.currentTarget).find(".typing-area");
    let txt = $(e.currentTarget).text();
    insertText(txt,target);
  };
  const clear = (e) => {
    resetAutoI();
    // 전체박스 타이핑영역 초기화
    $(".typing-area").text("");
    $(e.currentTarget).find(".typing-area").text("");
  };

  ////// 리턴구역 ////////////////////
  return (
    <>
      <div className="part-box row-12">
        {/* 2-1. 메뉴영역 */}
        <ul className="gnb-menu-box">
          {menuData.map((v, i) => (
            <li key={i}  data-seq={i}
            onMouseEnter={keyinput} onMouseLeave={clear}
            onClick={()=>goNav(i)}>
              {/* <a href="#"> */}
              <span>{v}</span>
              <b className="typing-area"></b>
              <div className="text-cursor"></div>
              {/* </a> */}
            </li>
          ))}
        </ul>
        <div className="close-btn" onClick={() => props.chgFn(0)}>
          ×
        </div>
      </div>
      {/* 2-2. 키보드 메뉴 영역 */}
      <div className="part-box col-16 row-4 menu-footer row-s-0 col-s-0">
        <div className="keyboard-menu">
          {/* 키보드 구역 */}
          <div className="wrap">
            <div className="key-box">
              <MakeKey keyData={keyData}/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} ////////// Menu 컴포넌트  ////////////
