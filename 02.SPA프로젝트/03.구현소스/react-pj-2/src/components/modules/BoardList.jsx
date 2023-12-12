// LEOPOLD Keyboard List만들기 컴포넌트
// 키보드 제품 데이터
// import { boardData } from "../data/boardData";
import { boardData } from "../data/boardData";
import { useEffect, useRef } from "react";

// 제이쿼리 가져오기
import $ from "jquery";
import { useNavigate } from "react-router-dom";
window.jQuery = $;
require("jquery-ui-dist/jquery-ui");
require("jquery-ui-touch-punch/jquery.ui.touch-punch");

export function BoardList({ data }) {
  // 받은 데이터 리스트 - data [값이 배열형]
  console.log("전달받음", data);
  const nav = useNavigate();
  // 네비게이션 설정 함수
  function goNav(seq) {
    nav("/subboard", { state: { name: "keyboard" + seq } });
  }

  // 리스트 만들기 함수
  const makeList = (data) => {
    let temp = [];
    data.map((v, i) => {
      if(i > 9) return; // 10개만 넣기
      temp[i] = (
        <li key={i} onClick={() => goNav(v)}>
          <div
            className="prod-item"
            data-seq={v}
            style={{ backgroundImage: "url(../images/image_prod2/keyboard" + v + ".png)" }}
          >
            {/* 더보기 */}
            <div className="prod-detail-view">view</div>
          </div>
          <h3 className="prod-item-title">{boardData[v - 1][0]}</h3>
          <h3 className="prod-item-title">{boardData[v - 1][1]}</h3>
          {/* 위시리스트 버튼 */}
          <div className="add-wish">add to wishlist ＞</div>
        </li>
      );
    });
    return temp;
  };
  useEffect(() => {

  }); /////////// useEffect ///////

  return (
    <ol>
      {
        makeList(data)
      }
    </ol>
  );
} /////////// BoardList 컴포넌트 ////////////

// {data.map(
//   (v, i) =>
//     i < 10 && (
//       <li key={i} onClick={() => goNav(v)}>
//         <div
//           className="prod-item"
//           data-seq={v}
//           style={{ backgroundImage: "url(../images/image_prod2/keyboard" + v + ".png)" }}
//         >
//           {/* 더보기 */}
//           <div className="prod-detail-view">view</div>
//         </div>
//         <h3 className="prod-item-title">{boardData[v - 1][0]}</h3>
//         <h3 className="prod-item-title">{boardData[v - 1][1]}</h3>
//         {/* 위시리스트 버튼 */}
//         <div className="add-wish">add to wishlist ＞</div>
//       </li>
//     )
// )}