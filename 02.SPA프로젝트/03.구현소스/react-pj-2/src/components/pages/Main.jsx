// 메인페이지 Main KeyboardList page - Main.jsx

import { LeoCon } from "../modules/LeopoldContext";
import { useContext } from "react";


// 메인페이지 css
import "../../css/main.css";
import { BoardList } from "../modules/BoardList";
import { Fragment, useEffect, useState } from "react";
import { useRef } from "react";
// 데이터 가져오기
import { filterBoardData } from "../data/boardData";
import { optionData } from "../data/optionData";
// 제이쿼리 가져오기
import $ from "jquery";
import { CheckCon } from "../modules/Icons";
import { useLocation } from "react-router-dom";

window.jQuery = $;
require("jquery-ui-dist/jquery-ui");
require("jquery-ui-touch-punch/jquery.ui.touch-punch");


let num = 0;
export function Main() {

  // 컨텍스트
  const myCon = useContext(LeoCon);

  let idxData = [];
  // filterBoardData idx값만 가져오기
  filterBoardData.map((v, i) => {
    idxData[i] = v.idx;
  });

  let prodList = JSON.parse(JSON.stringify(idxData));
  
  // localStorage.setItem('pList',JSON.stringify(prodList));



  // 대분류 변경에 따른 리스트 변수
  num++;
  console.log(prodList, "prodList", idxData, "idxData",num);
  console.log("Main불러옴");
  const [force, setForce] = useState(null);

  // 대분류/세부분류
  const [optSel, setOptSel] = useState("array");
  // 세부분류 옵션 -> 변경 시 데이터변수 변경
  const arrayOpt = useRef(["full", "tenkey less", "slim"]);
  const colorOpt = useRef(["co-wt", "co-bk", "co-gy", "co-bu", "co-ye", "co-rd"]);
  const switchOpt = useRef(["sw-bu", "sw-br", "sw-sl", "sw-lr", "sw-cl", "sw-sr", "sw-bk"]);

  // 데이터 변수 -> 리스트가 바뀌어도 상단 리랜더링 금지
  const dataIdx = useRef(prodList);
  // const [dataIdx, setDataIdx] = useState(idxData);

  
  

  // 선택 옵션에 대한 idx 배열 리턴함수
  const otherOptionList = (opt, arr) => {
    // opt 옵션명 / arr 선택한 옵션배열
    // 배열의 교집합이 존재할 경우 idx를 리턴
    let selData = [];
    filterBoardData.filter((v) => {
      if (Array.isArray(v[opt])) {
        //옵션값이 단일이 아닌경우 color switch
        v[opt].find((val) => {
          if (arr.includes(val)) {
            selData.push(v.idx);
            return true;
          }
        });
      } else {
        arr.find((val) => {
          if (v[opt] === val) {
            selData.push(v.idx);
            return true;
          }
        }); ////// find
      }
    });
    return selData;
  };

  // 대분류 변경 함수 /////////////
  const chkTop = (e) => {
    // 1. 체크박스 대분류
    const topchk = $(e.currentTarget).text();
    // 2. 대분류 변경
    if (optSel !== topchk) setOptSel(topchk);
  }; //////// chkTop함수 ///////////

  // 정렬함수
  const sortFn = (data) => {
    // console.log(data);
    if (data.lenght !== 0) {
      data.sort((a, b) => {
        return a == b ? 0 : a > b ? 1 : -1;
      });
      return data;
    }
  };

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
  };
  // 소분류 변경함수
  const checkOnOff = (e) => {
    // 소분류 체크
    const chked = [];
    // 0) 클래스명 가공하기
    let tgName =
      optSel == "switch" ? ".option-" + optSel + "-area>input:checked" : "." + optSel + "-area>input:checked";
    // 1) 체크 값 가져오기
    $(tgName).each((i, v) => (chked[i] = v.value));
    let list0;
    let list1;
    let list2;
    // 리스트 업데이트
    switch (optSel) {
      case "array":
        // setArrayOpt(chked);
        arrayOpt.current = chked;
        list0 = otherOptionList(optSel, chked);
        list1 = otherOptionList("color", colorOpt.current);
        list2 = otherOptionList("switch", switchOpt.current);
        break;
      case "color":
        // setColorOpt(chked);
        colorOpt.current = chked;
        list0 = otherOptionList("array", arrayOpt.current);
        list1 = otherOptionList(optSel, chked);
        list2 = otherOptionList("switch", switchOpt.current);
        break;
      case "switch":
        // setSwitchOpt(chked);
        switchOpt.current = chked;
        list0 = otherOptionList("array", arrayOpt.current);
        list1 = otherOptionList("color", colorOpt.current);
        list2 = otherOptionList(optSel, chked);
        break;
    }
    // 리스트 교집합만 고르기
    let listSum = list1.filter((val) => list2.includes(val));
    listSum = list0.filter((val) => listSum.includes(val));

    // 데이터 정렬
    sortFn(listSum);
    // 전달 데이터 업데이트
    dataIdx.current = listSum;
    // setDataIdx(listSum);
    // 강제 리랜더링
    setForce(Math.random());
  };
  const filterReset = () => {
    // 전달 데이터 업데이트
    // setDataIdx(prodList);
    dataIdx.current = prodList;
    // 옵션 초기화
    arrayOpt.current = ["full", "tenkey less", "slim"];
    colorOpt.current = ["co-wt", "co-bk", "co-gy", "co-bu", "co-ye", "co-rd"];
    switchOpt.current = ["sw-bu", "sw-br", "sw-sl", "sw-lr", "sw-cl", "sw-sr", "sw-bk"];
    // 체크박스 초기화
    let tg = $('input[type="checkbox"]');
    tg.prop("checked", true);
    // 강제 리랜더링
    setForce(Math.random());
  }; ///// filterReset ////

  // useEffect 구역
  useEffect(() => {
    let selNum = optSel == "array" ? 0 : optSel == "color" ? 1 : 2;
    // 선택옵션 하위옵션만 보이기
    $(".progress-sub-area").eq(selNum).css({ display: "flex" }).siblings().css({ display: "none" });
  }, [optSel]);

  useEffect(()=>{
    if(dataIdx.length !== prodList.lenght){
      // 페이지 이동에 의한 main -> 강제 리랜더링 처리 필요
      // setForce(Math.random());
    }
  });

  
  const myNav = useLocation();
  console.log('파라:',myNav.state)
  if(myNav.state) {
    dataIdx.current = prodList;
    filterReset();
    myNav.state = null;
  }
  
  // 배열 옵션 리스트 함수
  const makeOptionList = (data) => {
    return (
      <div className={"progress-sub-area col-5 flex-box col-s-14 " + data.label + "-area"}>
        {data.inputList.map((v, i) => (
          <Fragment key={i}>
            {/* 옵션 선택 구역 */}
            <input type="checkbox" value={v.val} id={v.id} defaultChecked onChange={checkOnOff} />
            <label className={v.labelClass} htmlFor={v.id}>
              {v.labelClass === "check-array" && v.val}
              {v.labelClass !== "check-array" && (
                <h1>
                  <CheckCon />
                </h1>
              )}
            </label>
          </Fragment>
        ))}
      </div>
    );
  };
  return (
    <>
      <main className="main row-12 row-s-13">
        <div className="desc-box">
          <span>Choose an option</span>
        </div>
        {/* 필터 리셋 버튼 */}
        <div className="reset-filter-btn" onClick={() => filterReset()}>
          reset filter
        </div>
        {/* 2-1. 제품 정렬옵션 */}
        <div className="part-box in-box col-16 row-1">
          <div className="progress-area col-6 col-s-14">
            <ul className="flex-box">
              {optionData[0].top.map((v, i) => (
                <li
                  key={i}
                  className={i == 0 ? "on" : ""}
                  onClick={(e) => {
                    chkTop(e);
                    addOn(e);
                  }}
                >
                  <h2>{v}</h2>
                </li>
              ))}
            </ul>
            <div className="progress-bar"></div>
          </div>
        </div>
        {/* 2-2. 옵션 선택 시 세부옵션 */}
        <div className="part-box in-box col-16 row-1">
          {/* 1) 배열 옵션 */}
          {makeOptionList(optionData[1])}
          {/* 2) 색 옵션 */}
          {makeOptionList(optionData[2])}
          {/* 3) 스위치 옵션 */}
          {makeOptionList(optionData[3])}
        </div>
        {/* 2-2. 제품 리스트 */}
        <div className="part-box col-16 row-10 prod-area prod-area-board">
          <BoardList dataIdx={dataIdx.current} />
          {/* <BoardList dataIdx={dataIdx} /> */}
        </div>
      </main>
    </>
  );
} ////////// Main컴포넌트 //////////////
