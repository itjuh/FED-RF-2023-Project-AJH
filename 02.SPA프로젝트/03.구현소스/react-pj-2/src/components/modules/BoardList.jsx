// LEOPOLD Keyboard List만들기 컴포넌트
// 키보드 제품 데이터
import { boardData, filterBoardData } from "../data/boardData";
import { memo, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { LeoCon } from "./LeopoldContext";

import "swiper/css";
import "swiper/css/pagination";
import { Keyboard, Navigation, Pagination } from "swiper/modules";
import "../plugin/css/swiper.css";

// 제이쿼리 가져오기
import $ from "jquery";
window.jQuery = $;
require("jquery-ui-dist/jquery-ui");
require("jquery-ui-touch-punch/jquery.ui.touch-punch");


export const BoardList = memo(({ dataIdx }) => {
  // console.log(dataIdx, dataIdx.length===0);
  // if(dataIdx.length===0){ // 데이터 전달이 없으면 전체데이터 출력
  //   for(let i=0;i<filterBoardData.length;i++){
  //     dataIdx.push(i+1);
  //   }
  // }
  // 총 리스트 개수 구하기
  /**
   * [ 변수설정 ] 
   * PAGE_BLOCK : 페이지당 출력 제품수 
   * pageCount : 페이지 수
   * pagePad : 마지막페이지 제품수
   * pageNum : 현재 페이지
   */
  const PAGE_BLOCK = 10;
  let pageCount = dataIdx.length/PAGE_BLOCK;
  const pagePad = dataIdx.length%PAGE_BLOCK;
  pageCount = pagePad===0?pageCount:pageCount+1;

  // context API
  const myCon = useContext(LeoCon);
  // 받은 데이터 리스트 - dataIdx [값이 배열형]

  const nav = useNavigate();
  // 네비게이션 설정 함수
  function goNav(seq) {
    nav("/subboard", { state: { name: "keyboard" + seq } });
  }
  // 위시 상태 관리 변수
  // 위시 상태 업데이트 변수
  const inputWish = (e) => {
    // 1. 상품 불러오기
    let prodCode = "keyboard" + $(e.currentTarget).attr("data-seq");
    let selData = filterBoardData.find((v) => {
      if (v["src"] === prodCode) return true;
    });
    // 수량항목 추가
    selData.count = 1;
    // 2. 상품 로컬에 담기
    if (!localStorage.getItem("wish")) {
      // 로컬이 빈 경우
      let arr = [];
      arr.push(selData);
      localStorage.setItem("wish", JSON.stringify(arr));
    } else {
      // 기존 카트 있는 경우
      let localData = localStorage.getItem("wish");
      // 객체변환
      localData = JSON.parse(localData);
      // 동일상품 존재여부
      let exist = 1; // 0-있는상품, 1-없는상품
      localData.forEach((v) => {
        if (v.src === selData.src) {
          // 동일상품 존재
          exist = 0;
          // 수량만 증가
          v.count += 1;
        }
      });
      if (exist) {
        // 동일상품 없는경우만 push;
        localData.push(selData);
        // 다시 문자 형 변환하여 넣기
        localStorage.setItem("wish", JSON.stringify(localData));
        // 위시리스트 업데이트
        myCon.wishUpdate();
      } else {
        // 다시 문자 형 변환하여 넣기
        localStorage.setItem("wish", JSON.stringify(localData));
      }
    }
  }; /////// inputWish 함수 ///////////

  // 페이지 리스트 만들기
  const makeOnePage = ()=>{
    // 데이터 잘라서 넘기기
    let temp = [];
    for(let i=0; i<=pageCount-1; i++){
      let pageDataIdx = dataIdx.splice(0,PAGE_BLOCK);
      // console.log(pageDataIdx);
      temp.push(
      <SwiperSlide key={i}>
        <ol className="list-area-ol in-box">
        {makeList(pageDataIdx)}
        </ol>
      </SwiperSlide>
      );
    }
    return temp;
  }
  // 리스트 만들기 함수
  const makeList = (arr) => {
    let temp = [];
    arr.map((v, i) => {
      if (i > PAGE_BLOCK-1) return; // 10개만 넣기
      temp[i] = (
        <li key={i}>
          <div
            className="prod-item"
            data-seq={v}
            onClick={() => goNav(v)}
            style={{ backgroundImage: "url(./images/image_prod2/keyboard" + v + ".png)" }}
          >
            {/* 더보기 */}
            <div className="prod-detail-view">view</div>
          </div>
          <h3 className="prod-item-title">{boardData[v - 1][0]}</h3>
          <h3 className="prod-item-title">{boardData[v - 1][1]}</h3>
          {/* 위시리스트 버튼 */}
          <div className="add-wish" onClick={inputWish} data-seq={v}>
            add to wishlist ＞
          </div>
        </li>
      );
    });
    return temp;
  };

  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        navigation={{
          clickable: true,
        }}
        keyboard={true}
        loop={true}
        // 사용 할 모듈을 여기에 적용시킨다
        modules={[Pagination, Navigation, Keyboard]}
        className="mySwiper"
      >
        {makeOnePage()}
      </Swiper>
    </>
  );
}); /////////// BoardList 컴포넌트 ////////////
