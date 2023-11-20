// LEOPOLD Keyboard List만들기 컴포넌트 - 랜덤번호 사용
// 키보드 제품 데이터
// import { boardData } from "../data/boardData";
import { setNum } from "../func/prod_list";
import { boardData } from '../data/boardData';
import { useLayoutEffect } from "react";
// 제이쿼리 가져오기
import $ from "jquery";
import { Link } from "react-router-dom";
window.jQuery = $;
require("jquery-ui-dist/jquery-ui");
require("jquery-ui-touch-punch/jquery.ui.touch-punch");

export function BoardList() {

  // 랜더링 후 이미지 넣기
  useLayoutEffect(()=>{
    $('.prod-item').each((i,v)=>{
      // console.log($(v).data('seq'));
      let num = $(v).data('seq');
      $(v).css({
        backgroundImage:'url(../images/image_prod2/keyboard'+num+'.png)'
      })
    });
  },[]); /////////// useEffect ///////

  // 이미지 출력 할 랜덤이미지 번호 생성
  const setImgNum = setNum();
  // 대상 출력하기
  const makeList = (data) => {
    console.log(setImgNum);
    return data.map((v, i) => 
      <li key={i}>
        <Link to='subboard'>
        <div
          className="prod-item"
          data-seq={v}
        >
          {/* 더보기 */}
          <div className="prod-detail-view">view</div>
        </div>
        <h3 className="prod-item-title">{boardData[v-1][0]}</h3>
        <h3 className="prod-item-title">{boardData[v-1][1]}</h3>
        {/* 위시리스트 버튼 */}
        <div className="add-wish">add to wishlist ＞</div>
        </Link>
      </li>
    );
  };
  return (
    <ol>
        {makeList(setImgNum)}
    </ol>
  );
} /////////// BoardList 컴포넌트 ////////////
