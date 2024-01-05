// 서브페이지 sub switch page - SubSwitch.jsx
import { useLocation } from "react-router-dom";
import "../../css/subswitch.css";
// 서브페이지용 데이터
import { detailData } from "../data/detailData";
// 네비게이션
import { MakeProgress } from "../modules/MakeProgress";
// 제이쿼리
import $ from "jquery";
import { moveBoxInfo } from "../func/info_scroll_sw";
import { useContext, useEffect } from "react";
import { LeoCon } from "../modules/LeopoldContext";

export function SubSwtich() {
  // 본페이지에서 데이터 받아오기
  const location = useLocation();
  // 컨텍스트
  const myCon = useContext(LeoCon);
  let name;
  // 선택 데이터
  let selData;
  if(!location.state){//데이터 없으면
    name = myCon.sub;
  }else{ // 데이터 받아오면
    name = location.state.name;
  }
  console.log('name',name,'myCon.sub',myCon.sub);
  selData = detailData[name] ? detailData[name] : false;

  // useEffect 구역
  useEffect(()=>{
    if(location.state){//데이터 없으면
      myCon.chgSub(name);
    }
  },[]);
  // 로드구역
  const loadFn = () => {
    const imgWd = [];
    let all = 0;
    const setNav = () => {
      $(".info-box-sw .info-inbox").each((i, v) => (all += v.clientWidth));
      $(".info-box-sw .info-inbox").each((i, v) => {
        imgWd[i] = Math.floor((v.clientWidth / all) * 100);
      });
      // 네비게이션 길이 적용
      $(".nav-area li").each((i, v) => $(v).css({ width: imgWd[i] + "%" }));
      // 휠 이벤트
      moveBoxInfo($(".detail-page-sw"));
    }; /////// nav세팅 함수 /////////////

    // imgMap(selData['img'][1]);
    if (!selData) return;
    else setNav();
  }; ///////////// loadFn 함수 //////////////

  // 이미지
  const makeImage = (data) => {
    return (
      <section className="prod-info-sw row-10">
        <div className="info-box-sw flex-box">
          {/* 제품 정보 옆으로 흘러갈 박스 */}
          {data.map((v, i) => imgMap(v, i))}
        </div>
      </section>
    );
  };
  // 이미지 분기 후 mapping 함수
  const imgMap = (data, num) => {
    // 이미지가 있는 경우
    if (data["isrc"] !== "") {
      return (
        <div key={num} className="info-inbox">
          <img className='sw-img' src={data["isrc"]} alt={selData["sub"] + " " + data["ialt"]} />
        </div>
      );
    }
    // 제품 설명이 있는 경우
    else {
      let dataInfo = [];
      // :기준으로 설명값 나눔
      data["iinfo"].map((v, i) => (dataInfo[i] = v.split(":")));
      return (
        <div key={num} className="info-inbox info-txt">
          <table className="info-table">
            <caption>📌 스위치 정보</caption>
            <tbody>
              {dataInfo.map((v, i) => (
                <tr key={i}>
                  <td>{v[0]}</td>
                  <td>{v[1]}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <section className="info-desc">
            <h2>📌 스위치 특징</h2>
            <h2>{data["desc"].split(":")[1]}</h2>
          </section>
        </div>
      );
    }
  };

  // 리턴구역 ///////////////////
  return (
    <>
      <main className="main in-box row-12 detail-page-sw" onLoad={loadFn}>
        {/* 네비게이션 구역 */}
        { selData &&
          <MakeProgress data={selData["img"]}/>
         }
        {/* 제품 설명 구역 */}
        <div className="part-box col-16 row-11 prod-area-sw">
          {/* 제품이미지 */}
          {selData ? makeImage(selData["img"]) : <h2>세부이미지가 없습니다.</h2>}
          {/* 버튼들 */}
          <section className="prod_pick flex-box">
            <div className="add-wish wish-sub">show related product＞</div>
          </section>
        </div>
      </main>
    </>
  );
} //////// SubSwitch ///////////
