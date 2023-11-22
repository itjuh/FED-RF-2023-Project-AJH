// LEOPOLD 로고 넣기 컴포넌트
import { useContext } from 'react';
import { LeoCon } from './LeopoldContext';

export function Logo() {
  // 컨텍스트
  const myCon = useContext(LeoCon);

  function goMain(){
    // 토글변경시 메인 이동함
    myCon.chgTog('main');
  }; ////// 메인이동함수 //////////
  return (
    <>
      <div className="part-box col-3 flex-box">
        <h1 className="header__logo" onClick={(e)=>goMain()}>
          <img src="./images/logo_bk1.png" alt="레오폴드 로고" />
          <span className="ir">레오폴드 로고</span>
        </h1>
      </div>
    </>
  );
} ///////// Logo컴포넌트 ///////////////////
