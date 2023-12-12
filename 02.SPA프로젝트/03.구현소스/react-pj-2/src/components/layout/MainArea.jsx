// 메인영역 컴포넌트

import { Outlet } from "react-router-dom";

export function MainArea() {

  // 리턴함수
  return (
    <>
      {/* 2. 메인영역 */}
      <div id="main">
        <Outlet />
      </div>
    </>
  ); ///////////return//////////////
} /////////// MainArea 컴포넌트 //////////////////
