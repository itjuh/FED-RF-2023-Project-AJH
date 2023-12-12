// 네비게이션 컴포넌트
export function MakeProgress(props){
  // props.data
  const data = props.data;
  return (
    <div className="part-box col-14 row-1 nav-area">
      <ul className="flex-box">
        {data.map((v, i) => (
          <li key={i}>
            {/* 네비게이션 안내 */}
            <h2 className="nav-tit">{v["ialt"]}</h2>
            <div className="nav-cont">
              {/* 네비게이션 색 채우기 구역 */}
              <div className="nav-full"></div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
} ///////////// 네비게이션 컴포넌트 //////////////
