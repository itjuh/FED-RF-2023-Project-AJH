import { memo } from "react";

// 상단 타이틀 컴포넌트
export const TopTitle = memo((props) => {
  // props.tit - 타이틀
  let tit = props.tit;
  // console.log('타이틀 변경');
  // let myCon = useContext(LeoCon);
  // myCon.titVal - 타이틀
  // (서브페이지는 타이틀 2개를 ^구분자로 연결)
  const isSub = tit.indexOf("^");
  if (isSub != -1) tit = tit.split("^");
  return (
    <>
      {isSub != -1 && (
        <>
          <h2>{tit[0]}</h2>
          <small>{tit[1]}</small>
        </>
      )}
      {isSub == -1 && <h2>{tit}</h2>}
    </>
  );
}); ////// TopTitle 컴포넌트 //////////
