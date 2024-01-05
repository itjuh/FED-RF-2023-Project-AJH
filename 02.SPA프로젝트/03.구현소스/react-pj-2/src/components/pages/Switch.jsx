// 스위치페이지 Switch page - Switch.jsx

import { SwitchList } from "../modules/SwitchList";
// 스위치 개별 css 적용
import "../../css/switch.css";

export function Switch() {
  
  return (
    <>
      <main className="main in-box row-12 row-s-13">
        <div className="part-box col-16 row-1"></div>
        {/* 1. 스위치 리스트 */}
        <div className="part-box col-16 row-11 prod-area row-s-13">
          <section className="row-10 row-s-13">
            <SwitchList />
          </section>
        </div>
      </main>
    </>
  );
} ///////// Switch 컴포넌트 /////////////
