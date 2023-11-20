// 메인페이지 Main KeyboardList page - Main.jsx

// 메인페이지 css
import "../../css/main.css";
import { Options } from "../modules/Options";
import { BoardList } from "../modules/BoardList";
import { Filter } from "../modules/Filter";
import { useState } from "react";


export function Main() {
  // 필터용 후크변수 설정
  const [selNum, setSelNum] = useState(0);
  const chgSel = (num)=>{
    setSelNum(num);
  }
  // 클릭한 필터를 옵션 세부옵션에 적용하기
  // -> props 다운 시킴
  // 세부 옵션을 제품리스트에 적용하기
  // -> selNum으로 세팅
  
  return (
    <>
      <main className="main in-box row-12">
        {/* 2-1. 제품 정렬옵션 */}
        <div className="part-box col-16 row-1">
        <Filter chgFn={chgSel} />
        </div>
        {/* 2-2. 옵션 선택 시 세부옵션 */}
        <Options selNum={selNum}/>
        {/* 2-2. 제품 리스트 */}
        <div className="part-box col-16 row-10 prod-area">
        <BoardList selNum={selNum}/>
        </div>
      </main>
    </>
  );
} ////////// Main컴포넌트 //////////////
