// LEOPOLD Switch List만들기 컴포넌트 - SwtichList.jsx
// 스위치 데이터
import { useNavigate } from 'react-router-dom';
import { switchData } from '../data/switchData';

export function SwitchList() {
  // 스위치 페이지 링크연결
  const nav = useNavigate();
  function goNav(txt){
    nav('/subswitch',{state:{name:txt}})
  }
  return (
    
      <dl key={'swlist'} className="switch-info flex-box row-10">
        {
        switchData.map((v, i) => (
          <div key={i} className="switch-box" onClick={()=>goNav(v.swname)}>
            {/* 1-1. 스위치 이름 */}
            <dt className="sw-tit">
              <h2>{v.swname.split("-")[0]}</h2>
              <small>{v.swname.split("-")[1]}</small>
            </dt>
            {/* 1-2. 스위치 이미지 */}
            <dd className="sw-img">
              <figure className={v.swclass}>
                {/* 더보기 버튼 */}
                <div className="prod-detail-view">view more</div>
              </figure>
              <figcaption className="ir">{v.swkname}</figcaption>
            </dd>
            {/* 1-3. 스위치 설명 */}
            <dd className="sw-desc">{v.swdesc}</dd>
          </div>
        ))
        }
      </dl>
   
  );
} ///////// SwitchList 컴포넌트 //////////////
