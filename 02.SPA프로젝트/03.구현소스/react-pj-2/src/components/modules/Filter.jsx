// LEOPOLD 메인페이지 keyboard Filter 컴포넌트

import { optionData } from "../data/optionData";
import { filterBoardData } from "../data/boardData";
import { useContext } from "react";
import { LeoCon } from "../modules/LeopoldContext";
// 제이쿼리 가져오기
import $ from "jquery";
window.jQuery = $;
require("jquery-ui-dist/jquery-ui");
require("jquery-ui-touch-punch/jquery.ui.touch-punch");

export function Filter({chgOptFn}) {
  // 선택 데이터
  const selData = filterBoardData;
  // 필터 업데이트 함수chgFn 필요함
  // 컨텍스트 API 사용하기
  const myCon = useContext(LeoCon);

  // 클릭한 필터 값 이동하기
  const addOn = function (e) {
    const prog = $(".progress-area li");
    let tg = $(e.currentTarget);
    // 클릭 li 순번
    let idx = prog.index(tg);
    // progressbar 길이
    let wid = 33.3 * (idx + 1);

    // 해당순번에 on넣고 이전순번까지on 적용
    prog.eq(idx).addClass("on").prevAll().addClass("on");
    // 해당순전 이후 on제거
    prog.eq(idx).nextAll().removeClass("on");
    // 프로그래스바 css적용
    $(".progress-bar").css({
      width: wid + "%",
    });
    myCon.chgSel(idx);
  };

  // 필터 - 대분류 읽기 -> 소분류 :checked val읽어서 데이터 꺼내오기
  function subFilter() {
    // 1. 대분류 읽기
    let topFilter = "array";
    // 2. 대분류 세부값 읽기
    let topVal = ['900','750'];
    // 3. 세부 값 담을 배열
    let newList = [];
    // 4. 전체 배열
    let resList = [];
    // 3. 세부값이 대분류와 일치하는 데이터 검색
    topVal.forEach((ele,idx)=>{
      // 대분류 세부값에 해당하는 데이터를 골라서 담는다
      newList[idx] = selData.filter(v=>{
        if(v[topFilter].toLowerCase().indexOf(ele) != -1) return true;
      }); ///////// filter /////////////////
    });
    resList = [...newList[0],...newList[1]];
    console.log(resList);
  }

  //////////////////////////////////
  // 대분류 변경 함수 /////////////
  const chkTop = (e) => {
    // 1. 체크박스 대분류
    const topchk = $(e.currentTarget).text();
    // 프롭스 펑션 업
    chgOptFn(topchk);
  }; //////// chkTop함수 ///////////



  return (
    <>
      <div className="progress-area col-6">
        <ul className="flex-box">
          {optionData[0].top.map((v, i) => (
            <li key={i} className={i == 0 ? "on" : ""} onClick={(e)=>{chkTop(e); addOn(e)}}>
              <h2>{v}</h2>
            </li>
          ))}
        </ul>
        <div className="progress-bar"></div>
      </div>
    </>
  );
} /////////// Progress 컴포넌트
