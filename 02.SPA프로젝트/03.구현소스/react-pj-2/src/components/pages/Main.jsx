// 메인페이지 Main KeyboardList page - Main.jsx

// 메인페이지 css
import "../../css/main.css";
import { Options } from "../modules/Options";
import { BoardList } from "../modules/BoardList";
import { Filter } from "../modules/Filter";

export function Main() {
  return (
    <>
      <main className="main in-box row-12">
        {/* 2-1. 제품 정렬옵션 */}
        <div className="part-box col-16 row-1">
        <Filter />
        </div>
        {/* 2-2. 옵션 선택 시 세부옵션 */}
        <Options />
        {/* 2-2. 제품 리스트 */}
        <div className="part-box col-16 row-10 prod-area">
        <BoardList />
        </div>
      </main>
    </>
  );
} ////////// Main컴포넌트 //////////////
