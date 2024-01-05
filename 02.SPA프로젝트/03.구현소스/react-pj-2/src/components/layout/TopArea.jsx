// 상단영역 컴포넌트
// 폰트어썸 아이콘
import { memo } from "react";
import { Logo } from "../modules/Logo";
import { Toggle } from "../modules/Toggle";

// 제이쿼리 + 제이쿼리 ui
import $ from "jquery";
import "jquery-ui-dist/jquery-ui";
import { CartCon, GlassCon, UserCon } from "../modules/Icons";
export const TopArea = memo(({ loginSts, logOutFn, goPage, wishCnt }) => {
  const goNav = (txt, e) => {
    e.preventDefault();
    // 페이지 이동
    goPage(txt, "");
  };

  // 클래스 생성 함수
  const addOn = function (e) {
    e.preventDefault();
    console.log($(e.currentTarget));
    $(e.currentTarget).addClass("on");
  }; ///////// addOn ///////////
  const closeOn = function (e) {
    // 이벤트/ 버블링 막기
    e.preventDefault();
    e.stopPropagation();
    $(e.currentTarget).parents(".gnb-icon").removeClass("on");
  };

  return (
    <>
      {/* 1. 상단영역 */}
      <div id="header">
        <header className="header in-box row-2 flex-box row-s-1">
          {/* 1-1. 토글영역 */}
          <div className="part-box col-3 flex-box row-s-1 col-s-0">
            <Toggle />
          </div>
          {/* 1-2. 로고영역 */}
          <div className="part-box col-6 col-s-8">
            <div className="top-title">
              <Logo />
            </div>
          </div>
          {/* 1-3. GNB메뉴 */}
          <div className="part-box col-3 flex-box gnb-zone col-s-7">
            <div className="welcome-tit">
              {loginSts !== null && "Welcome🎉" + JSON.parse(loginSts) + "😊"}
              {loginSts === null && <></>}
            </div>
            <div className="gnb-area flex-box col-s-12">
              {/* 검색버튼 */}
              <a href="#" title="SEARCH" onClick={addOn} className="gnb-icon">
                <span className="ir">SEARCH</span>
                <GlassCon />
                <div className="search-area">
                  <label>Search</label>
                  <div className="search-box">
                    <GlassCon />
                    <input type="text" placeholder="Filter by keyword" />
                  </div>
                  <button className="close-btn" onClick={closeOn}>
                    ×
                  </button>
                </div>
              </a>
              {/* 로그아웃 */}
              {loginSts !== null && (
                <a href="#" title="LOGOUT" style={{ color: "lightseagreen" }} className="gnb-icon" onClick={logOutFn}>
                  <div className='log-icon'>logout</div>
                  <span className="ir">LOGOUT</span>
                  <UserCon />
                </a>
              )}
              {/* 로그인 */}
              {loginSts === null && (
                <a
                  href="#"
                  title="LOGIN"
                  className="gnb-icon"
                  onClick={(e) => {
                    goNav("LOGIN", e);
                  }}
                >
                  <span className="ir">LOGIN</span>
                  <UserCon />
                </a>
              )}
              {/* 장바구니 */}
              <a
                href="#"
                title="WISHLIST"
                onClick={(e) => {
                  goNav("WISHLIST", e);
                }}
                className="gnb-icon"
              >
                {
                  wishCnt > 0 &&
                  <div className='wish-cnt'>{wishCnt}</div>
                }
                <span className="ir">WISHLIST</span>
                <CartCon />
              </a>
            </div>
          </div>
        </header>
      </div>
    </>
  );
}); ////////// TopArea 컴포넌트 //////////
