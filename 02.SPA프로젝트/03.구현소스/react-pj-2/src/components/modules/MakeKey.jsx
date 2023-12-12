// 레오폴드 키보드 배열세팅 컴포넌트 - MakeKey.jsx
// 키보드 데이터
import { keyData } from "../data/keyData.js";
// css
import '../../css/menu_key.css';

export function MakeKey() {

  // 키 윗면 글자넣기 함수
  function insertTop(ele) {
    let res = [];
    if (Array.isArray(ele)) {
      res[0] = <aside key={0} className="part2">{ele[0]}</aside>;
      res[1] = <aside key={1} className="part2">{ele[1]}</aside>;
    } else {
      res[0] = <aside key={0} className="part1">{ele == "SpaceBar" ? "" : ele}</aside>;
    }
    return res;
  } /////////insertTop함수//////////////

  return <>
    {keyData.map((v,i)=><div key={i} className={"key "+v[0]}>
        {/* 키 윗면 */}
        <span className="span1 key-part">
        {/* 키 윗면 글자부분 */}
        <div className="key-top">
            {insertTop(v[1])}
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
}
