// 서브페이지 sub KeyboardList page - SubBoard.jsx
// 서브 페이지용 css
import { useLocation } from "react-router-dom";
import "../../css/subboard.css";
// 서브페이지용 데이터
import { detailData } from "../data/detailData";
// 네비게이션
import { MakeProgress } from "../modules/MakeProgress";
// 제이쿼리
import $ from "jquery";
import { moveImgInfo } from "../func/info_scroll";
import { useContext, useEffect } from "react";
import { LeoCon } from "../modules/LeopoldContext";

/*
  keyboard1: {
    code: "FC900RBTPD",
    sub: "코랄 블루",
    type: "keyboard",
    img: [
      { isrc: "./images/keyboard1/01.jpg", ialt: "image1" },
      { isrc: "./images/keyboard1/02.jpg", ialt: "image2" },
      { isrc: "./images/keyboard1/03.jpg", ialt: "image3" },
      { isrc: "./images/keyboard1/04.jpg", ialt: "must-read" },
      { isrc: "./images/keyboard1/05.jpg", ialt: "infomation1" },
      { isrc: "./images/keyboard1/06.jpg", ialt: "infomation2" },
    ],
*/
export function SubBoard() {
  // 본페이지에서 데이터 받아오기
  const location = useLocation();
  // 컨텍스트
  const myCon = useContext(LeoCon);
  // detailData key
  let name;
  // 선택 데이터
  let selData;
  name = location.state.name;
  selData = detailData[name] ? detailData[name] : false;
  // useEffect
  useEffect(()=>{
    // 데이터 있는 경우만 작동
    if(name) {
      let tit = selData.code +'^'+ selData.sub;
      myCon.chgTit(tit);
    }
    // 휠 이벤트
    moveImgInfo($(".detail-page"));
  },[myCon,name,selData.code,selData.sub]);

  const loadFn = () => {
    const imgWd = [];
    let all = 0;
    const setNav = () => {
      $(".info-box img").each((i, v) => (all += v.height));
      $(".info-box img").each((i, v) => {
        imgWd[i] = Math.floor((v.height / all) * 100);
      });
      // 네비게이션 길이 적용
      $(".nav-area li").each((i, v) => $(v).css({ width: imgWd[i] + "%" }));
    }; /////// nav세팅 함수 /////////////
    if (!selData) return;
    else {
      // 네비게이션 세팅
      setNav();
    }
  }; ///////////// loadFn 함수 //////////////


  // 이미지
  const makeImage = (data) => {
    return (
      <section className="prod-info row-10">
        <div className="info-box flex-box">
          {/* 제품 정보 옆으로 흘러갈 박스 */}
          {data.map((v, i) => (
            <img key={i} src={v["isrc"]} alt={selData["sub"] + " " + v["ialt"]} />
          ))}
        </div>
      </section>
    );
  };

  // 리턴구역 ///////////////////
  return (
    <>
      <main className="main in-box row-12 detail-page" onLoad={loadFn}>
        {/* 네비게이션 구역 */}
         { selData &&
          <MakeProgress data={selData["img"]}/>
         }
        {/* 제품 설명 구역 */}
        <div className="part-box col-16 row-11 prod-area">
          {/* 제품이미지 */}
          {selData ? makeImage(selData["img"]) : <h2>세부이미지가 없습니다.</h2>}
          {/* 버튼들 */}
          <section className="prod_pick flex-box">
            <div className="add-wish wish-sub">add to wishlist ＞</div>
            <div className="add-wish wish-sub buy-btn">buy now ↗</div>
          </section>
        </div>
      </main>
    </>
  );
} /////////// SubBoard 컴포넌트 ////////////////
