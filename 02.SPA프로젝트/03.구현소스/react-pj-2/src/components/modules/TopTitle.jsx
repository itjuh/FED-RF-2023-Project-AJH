import { useContext } from "react";
import { LeoCon } from "./LeopoldContext";

// 상단 타이틀 컴포넌트
export function TopTitle() {
  const myCon = useContext(LeoCon);
  // props.tit - 타이틀
  return (
    <div className="part-box col-6">
      <div className="top-title">
        <h2>{myCon.titVal}</h2>
      </div>
    </div>
  );
} ////// TopTitle 컴포넌트 //////////
