// LEOPOLD Keyboard 필터 옵션만들기 컴포넌트
import { CheckCon } from "../modules/Icons";
// 옵션데이터 불러오기
import { optionData } from "../data/optionData";
import { Fragment, useEffect } from "react";
// 제이쿼리 가져오기
import $ from "jquery";
window.jQuery = $;
require("jquery-ui-dist/jquery-ui");
require("jquery-ui-touch-punch/jquery.ui.touch-punch");

export function Options({ opt, chgOptFn }) {
  // opt-상위옵션/chgOptFn 하위옵션 변경메서드
  // opt - 선택 상위옵션 0-array 1-color 2-switch
  let selNum = opt == "array" ? 0 : opt == "color" ? 1 : 2;

  // [1] 하위옵션 정보
  // 0) 클래스명 가공하기
  let tgName = opt == "switch" ? ".option-" + opt + "-area>input:checked" : "." + opt + "-area>input:checked";
  // 1) 체크정보 저장배열
  const chked = [];
  const checkOnOff = (e) => {
    // 1) 체크 값 가져오기
    $(tgName).each((i,v)=>chked[i] = v.value);
    // 2) 프롭스 펑션 업
    if(chked.length == 0){ //모두 체크 해제 시
      $(e.currentTarget).attr("checked",true);
      console.log(e.currentTarget);
    }
    chgOptFn(chked);
  };

  // useEffect 구역
  useEffect(() => {
    // 선택옵션 하위옵션만 보이기
    $(".progress-sub-area").eq(selNum).css({ display: "flex" }).siblings().css({ display: "none" });
  }, [selNum]);
  // 배열 옵션 리스트 함수
  const makeList = (data) => {
    return (
      <div className={"progress-sub-area col-5 flex-box " + data.label + "-area"}>
        {data.inputList.map((v, i) => (
          <Fragment key={i}>
            {/* 옵션 선택 구역 */}
            <input type="checkbox" value={v.val} id={v.id} defaultChecked onChange={checkOnOff}/>
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
    <div className="part-box col-16 row-1">
      {/* 1) 배열 옵션 */}
      {makeList(optionData[1])}
      {/* 2) 색 옵션 */}
      {makeList(optionData[2])}
      {/* 3) 스위치 옵션 */}
      {makeList(optionData[3])}
    </div>
  );
} ////////// Options 컴포넌트 ///////////
