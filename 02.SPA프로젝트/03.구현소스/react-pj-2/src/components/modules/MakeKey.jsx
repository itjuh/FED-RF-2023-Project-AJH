// 레오폴드 키보드 배열세팅 컴포넌트 - MakeKey.jsx
// css
import '../../css/menu_key.css';
import { memo } from "react";

export const MakeKey = memo(({keyData})=>{
  return <>
    {keyData.map((v,i)=><div key={i} className={"key "+v[0]} data-seq={i}>
        {/* 키 윗면 */}
        <span className="span1 key-part">
        {/* 키 윗면 글자부분 */}
        <div className="key-top">
            {
              Array.isArray(v[1])?
              <>
              <aside className="part2">{v[1][0]}</aside>
              <aside className="part2">{v[1][1]}</aside>
              </>:
              <aside className="part1">{v[1]==='SpaceBar'?"":v[1]}</aside>
            }
        </div>
        </span>
        {/* left */}
        <span className="span2"></span>
        {/* right */}
        <span className="span3"></span>
        {/* top */}
        <span className="span4"></span>
        {/* bottom */}
        <span className="span5"></span>
        {/* 키 맨뒷면 */}
        <span className="span6"></span>
    </div>
    )}
  </>;
}); //////////// MakeKey ///////////////
