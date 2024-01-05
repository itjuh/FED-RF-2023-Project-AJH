// 레오폴드 장바구니 페이지
import { useRef, useState } from "react";
import "../../css/wishlist.css";
import { WishTable } from "../modules/WishTable";

export function Wishlist() {
  // 로컬 데이터 읽어오기
  let data = JSON.parse(localStorage.getItem("wish"));
  /** flag true 새로추가 false 내부변경 */
  const flag = useRef(true); // true 부모변경 false 내부변경

  return (
    <main className="main in-box row-12">
      {/* 장바구니 박스 */}
      <div className="part-box col-16 row-12 ">
        <div className="wish-area">
          {/* 1. 상단부 */}
          {/* 1-1. 상단 타이틀 */}
          <h2>WishList</h2>
          {/* 1-2. 닫기버튼 */}
          {/* <div className="close-btn" onClick={() => closeList()}>
            ×
          </div> */}
          {/* 2. 장바구니 영역 */}
          {/* <WishTable data={data} chgFn={chgFn}/> */}
          <WishTable wishdata={data} flag={flag}/>
        </div>
      </div>
      <div className="message-box">
        <div className="message-wrap">
          <div className="message-tit">
            <span>❗ delete confirm</span>
            <button>×</button>
          </div>
          <div className="message-cont">Do you really want to delete it????</div>
          <div className="message-btns">
            <button>Delete</button>
            <button>Cancel</button>
          </div>
        </div>
      </div>
    </main>
  );
} //////////// WishList 컴포넌트 ///////////////
