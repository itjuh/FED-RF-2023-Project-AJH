// LEOPOLD 로고 넣기 컴포넌트
import {useNavigate} from 'react-router-dom';

export function Logo() {
  // 라우터 네비게이션
  const nav = useNavigate();
  // 메인 라우터 연결
  function goMain(){
    nav('/');
  };
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
