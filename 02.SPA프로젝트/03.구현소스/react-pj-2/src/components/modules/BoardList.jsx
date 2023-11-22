// LEOPOLD Keyboard List만들기 컴포넌트
// 키보드 제품 데이터
// import { boardData } from "../data/boardData";
import { boardData } from '../data/boardData';
import { useLayoutEffect } from "react";

// 제이쿼리 가져오기
import $ from "jquery";
import { Link } from "react-router-dom";
window.jQuery = $;
require("jquery-ui-dist/jquery-ui");
require("jquery-ui-touch-punch/jquery.ui.touch-punch");

export function BoardList() {

  // 랜더링되기 전 이미지 넣기
  useLayoutEffect(()=>{
    $('.prod-item').each((i,v)=>{
      // console.log($(v).data('seq'));
      let num = $(v).data('seq');
      $(v).css({
        backgroundImage:'url(../images/image_prod2/keyboard'+num+'.png)'
      })
    });
  },[]); /////////// useEffect ///////

  // 대상 출력하기
  const makeList = (num) => {
    const hcode = [];
    // 10개의 데이터 넣기
    for(let i=num; i < num+10; i++){
      let seq = i+1;
      hcode[i] = <li key={i}>
      <Link to='/subboard' state={{name:'keyboard'+seq}}>
      <div
        className="prod-item"
        data-seq={seq}
      >
        {/* 더보기 */}
        <div className="prod-detail-view">view</div>
      </div>
      <h3 className="prod-item-title">{boardData[i][0]}</h3>
      <h3 className="prod-item-title">{boardData[i][1]}</h3>
      {/* 위시리스트 버튼 */}
      <div className="add-wish">add to wishlist ＞</div>
      </Link>
      </li>
    }///////// for/////////
    return hcode;
  };
  return (
    <ol>
        {makeList(0).map(v=>v)}
    </ol>
  );
} /////////// BoardList 컴포넌트 ////////////
