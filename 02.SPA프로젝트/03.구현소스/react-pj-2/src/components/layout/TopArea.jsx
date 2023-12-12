// 상단영역 컴포넌트
// 폰트어썸 아이콘

import { memo, useEffect } from "react";
import { gnbData } from "../data/gnbData";
import { Logo } from "../modules/Logo";
import { TopTitle } from "../modules/TopTitle";
// 제이쿼리 + 제이쿼리 ui
import $ from "jquery";
import "jquery-ui-dist/jquery-ui";

export const TopArea = memo((props) => {
  // props.tit : 상단타이틀
  // props.sts : 1-메뉴열림 0-닫힘

  // console.log('상단 불러옴');
  useEffect(() => {
    $(".gnb-area a").first().click(addOn);
  });
  // 클래스 생성 함수
  const addOn = function (e) {
    $(e.currentTarget).toggleClass("on");
  };
  // gnb메뉴 생성 함수
  const makeGnb = () => {
    return gnbData.map((v, i) => (
      <a href="#" title={v.txt} key={i}>
        <span className="ir">{v.txt}</span>
        {v.txt === "검색" ? <input type="text" className="search-area" /> : <></>}
        {v.com}
      </a>
    ));
  };
  return (
    <>
      {/* 1. 상단영역 */}
      <div id="header">
        <header className="header in-box row-2 flex-box">
          {/* 1-1. 로고영역 */}
          <Logo />
          {/* 1-2. 타이틀영역 */}
          <div className="part-box col-6">
            <div className="top-title">
              { 
                props.sts == 0 && 
                <TopTitle tit={props.tit} />
              }
            </div>
          </div>
          {/* 1-3. GNB메뉴 */}
          <div className="part-box col-3 flex-box gnb-area">{makeGnb()}</div>
        </header>
      </div>
    </>
  );
}); ////////// TopArea 컴포넌트 //////////
