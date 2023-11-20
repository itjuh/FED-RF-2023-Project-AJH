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
/*
optionData 구조
{
    label: "array",
    inputList : [
      { val:'900',
        id:'array-900',
        labelClass:'',},
      { val:'750',
        id:'array-750',
        labelClass:'', },
    ]
  },
*/
export function Options(props) {
  // props.selNum - 하위리스트 display순번
  useEffect(()=>{
    // console.log($('.progress-sub-area').eq(props.selNum));
    $('.progress-sub-area').eq(props.selNum).css({display:'flex'}).siblings().css({display:'none'});
  },[props.selNum]);
  // 배열 옵션 리스트 함수
  const makeList = (data) => {
    return (
      <div className={"progress-sub-area col-5 flex-box " + data.label + "-area"}>
        {data.inputList.map((v, i) => (
          <Fragment key={i}>
            {/* 옵션 선택 구역 */}
            <input type="checkbox" value={v.val} id={v.id} defaultChecked />
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
