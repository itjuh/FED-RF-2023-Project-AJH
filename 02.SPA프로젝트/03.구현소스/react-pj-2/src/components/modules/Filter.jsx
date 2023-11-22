// LEOPOLD 메인페이지 keyboard Filter 컴포넌트

import { optionData } from "../data/optionData";
import { useContext } from "react";
import { LeoCon } from "../modules/LeopoldContext";
// 제이쿼리 가져오기
import $ from "jquery";
window.jQuery = $;
require("jquery-ui-dist/jquery-ui");
require("jquery-ui-touch-punch/jquery.ui.touch-punch");

export function Filter(){
    // 필터 업데이트 함수chgFn 필요함
    // 컨텍스트 API 사용하기
    const myCon = useContext(LeoCon);

    // 클릭한 필터 값 이동하기
    const addOn = function(e){
      const prog = $('.progress-area li');
      let tg = $(e.currentTarget);
      // 클릭 li 순번
      let idx = prog.index(tg);
      // progressbar 길이
      let wid = 33.3 * (idx+1);

      // 해당순번에 on넣고 이전순번까지on 적용
      prog.eq(idx).addClass('on').prevAll().addClass('on');
      // 해당순전 이후 on제거
      prog.eq(idx).nextAll().removeClass('on');
      // 프로그래스바 css적용
      $('.progress-bar').css({
        width: wid+'%'
      });
      myCon.chgSel(idx);
    }

    return(
        <>
        <div className="progress-area col-6">
            <ul className="flex-box">
              {
                optionData[0].top.map((v, i) => 
                  <li key={i} className={i==0?"on":''} onClick={addOn}>
                    <h2>{v}</h2>
                  </li>
                )
              }
            </ul>
            <div className="progress-bar"></div>
        </div>
        </>
    )
} /////////// Progress 컴포넌트