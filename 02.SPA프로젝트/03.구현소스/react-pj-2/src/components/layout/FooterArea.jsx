// 하단영역 컴포넌트

import { KeyCon, UpArrowCon } from "../modules/Icons";
import { Toggle } from "../modules/Toggle";

export function FooterArea() {
  
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
        <Toggle />
      </footer>
      </div>
    </>
  ); //////// return //////////
} ///////// FooterArea 컴포넌트 ////////////
