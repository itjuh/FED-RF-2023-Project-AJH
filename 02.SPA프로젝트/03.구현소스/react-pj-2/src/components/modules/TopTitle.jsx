// 상단 타이틀 컴포넌트
export function TopTitle(props) {
  // props.tit - 타이틀
  return (
    <div className="part-box col-6">
      <div className="top-title">
        <h2>{props.tit}</h2>
      </div>
    </div>
  );
} ////// TopTitle 컴포넌트 //////////
