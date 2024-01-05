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
// import { useLayoutEffect } from "react";
// import axios from "axios";

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
  if (!location.state) {
    //데이터 없으면
    name = myCon.sub;
  } else {
    // 데이터 받아오면
    name = location.state.name;
  }
  // console.log('name',name,'myCon.sub',myCon.sub);
  selData = detailData[name] ? detailData[name] : false;

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
  const loadFn = () => {
    $(() => {
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

      // 휠 이벤트
      moveImgInfo($(".detail-page"));
    });
  }; ///////////// loadFn 함수 //////////////
  // useLayoutEffect구역
  // useLayoutEffect(() => {
  //   // axios 라이브러리를 이용한 데이터 조회하기! //
  //   /**
  //    * 설치 : npm i axios
  //    * axios는 데이터를 프라미스로 처리하여 원하는 결과를 보장하는
  //    * 간편한 데이터 처리 라이브러리다
  //    * 파일가져오기 메서드 get()
  //    * 다음 실행 메서드 then()
  //    */

  //   axios
  //     .get(selData) // file loading
  //     .then((res) => {
  //       // file auto parsing
  //       console.log(res);
  //       /**주의: data속성에 실제 데이터가 담김 : res.data해야 fetch()와 데이터가 동일 */
  //       const imgWd = [];
  //       let all = 0;
  //       $(".info-box img").each((i, v) => (all += v.height));
  //       $(".info-box img").each((i, v) => {
  //         imgWd[i] = Math.floor((v.height / all) * 100);
  //       });
  //       // 네비게이션 길이 적용
  //       $(".nav-area li").each((i, v) => $(v).css({ width: imgWd[i] + "%" }));
  //     }) // then //
  //     .catch((err) => {
  //       console.log(err);
  //     }); // error ////
  //   /////////////// axios end ///////////
  // });
  // 리턴구역 ///////////////////
  return (
    <>
      <main className="main in-box row-12 detail-page" onLoad={loadFn}>
        {/* 네비게이션 구역 */}
        {selData && <MakeProgress data={selData["img"]} />}
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
