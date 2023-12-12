// LEOPOLD 로고 넣기 컴포넌트
import { useContext } from "react";
import { LeoCon } from "./LeopoldContext";
import { initToggle } from "../func/init_toggle";
import { useNavigate } from "react-router-dom";

export function Logo() {
  // 컨텍스트
  const myCon = useContext(LeoCon);
  // 링크
  const goNav = useNavigate();

  function goMain() {
    // 메인 이동 시 토글 초기화
    if (myCon.toggleVal !== "main") {
      myCon.chgTog("main");
      initToggle();
    } else {
      // 페이지 이동
      goNav('/');
      // 타이틀 변경
      myCon.chgTit('Keyboard List');
    }
  } ////// 메인이동함수 //////////
  return (
    <>
      <div className="part-box col-3 flex-box">
        <h1 className="header__logo" onClick={(e) => goMain()}>
          <img src="./images/logo_bk1.png" alt="레오폴드 로고" />
          <span className="ir">레오폴드 로고</span>
        </h1>
      </div>
    </>
  );
} ///////// Logo컴포넌트 ///////////////////
