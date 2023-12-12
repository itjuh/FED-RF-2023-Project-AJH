// 메인페이지 Main KeyboardList page - Main.jsx

// 메인페이지 css
import "../../css/main.css";
import { Options } from "../modules/Options";
import { BoardList } from "../modules/BoardList";
import { Filter } from "../modules/Filter";
import { useEffect,useState } from "react";
import { filterBoardData } from "../data/boardData";

export function Main() {
  // 대분류/세부분류 변수
  const [optSel, setOptSel] = useState('array');
  const [optSubSel, setOptSubSel] = useState([900,750,980]);
  // 데이터 변수
  const [dataIdx, setDataIdx] = useState(['1','2','3','4','5','6','7','8','9','10']);
  // 변경함수
  const chgOpt = txt => setOptSel(txt);
  const chgOptSub = arr => setOptSubSel(arr);
  // 정렬값에 맞는 데이터만 보내준다.
  // 데이터 선택 함수
  const selData = (arr) =>{
    // 1. 대분류 : optSel
    // 2. 세부값 : optSubSel (배열형)
    // 3. 세부 필터 값 담을 배열 idx만 담으면 됨
    let newList = [];
    // 4. 전체 배열
    let resList = [];
    // 3. 세부값이 대분류와 일치하는 데이터 검색
    arr.forEach((ele,idx)=>{
      // 세부값에 해당하는 데이터의 idx를 골라서 담는다
      newList[idx] = filterBoardData.filter(v=>{
        if(v[optSel].indexOf(ele) != -1) return true;
      }); ///////// filter /////////////////
    });
    // 수량변수
    let num = 0;
    newList.map(v=>{
      v.map(i=>{
      resList[num]=i.idx;
      num++;
    })});
    // console.log(resList);
    setDataIdx(resList);
  }; ///// selData ///////

  useEffect(()=>{
    console.log(optSel,optSubSel);
    selData(optSubSel);
  }, [optSel,optSubSel]);

  return (
    <>
      <main className="main in-box row-12">
        {/* 2-1. 제품 정렬옵션 */}
        <div className="part-box col-16 row-1">
        <Filter chgOptFn={chgOpt}/>
        </div>
        {/* 2-2. 옵션 선택 시 세부옵션 */}
        <Options chgOptFn={chgOptSub} opt={optSel}/>
        {/* 2-2. 제품 리스트 */}
        <div className="part-box col-16 row-10 prod-area">
        <BoardList data={dataIdx}/>
        </div>
      </main>
    </>
  );
} ////////// Main컴포넌트 //////////////
