// 서브페이지 sub KeyboardList page - SubBoard.jsx
// 서브 페이지용 css
import '../../css/subboard.css'
// 서브페이지용 데이터
import { detailData } from "../data/detailData";


export function SubBoard(props) {
  // 본페이지에서 데이터 받아오기
  // console.log(detailData[props.name]);
  let name = 'keyboard1';
  // console.log(detailData[name]);
  const makeProgress = (data)=>{
    return(
      data.map((v,i)=><li>
        <h2 className='nav-tit'>{'image'+(i+1)}</h2>
        <div className='nav-cont'></div>
      </li>)
    )
  };
  return (
    <>
      <main className="main in-box row-12">
        {/* 네비게이션 구역 */}
        <div className="part-box col-14 row-1 nav-area">
          <ul className="flex-box">
            {makeProgress(detailData[name]['img'])}
          </ul>
        </div>
        {/* 제품 설명 구역 */}
        <div className="part-box col-16 row-11 prod-area">
          <section className="prod-info row-10">
            {/* 제품 정보 옆으로 흘러갈 박스 */}
            <div className="info-img flex-box">
              <img src="../images/FC900RBTPD/01.jpg" alt="키보드 이미지" />
              <img src="../images/FC900RBTPD/02.jpg" alt="키보드 이미지" />
              <img src="../images/FC900RBTPD/03.jpg" alt="키보드 이미지" />
              <img src="../images/FC900RBTPD/04.jpg" alt="키보드 이미지" />
              <img src="../images/FC900RBTPD/05.jpg" alt="키보드 이미지" />
              <img src="../images/FC900RBTPD/06.jpg" alt="키보드 이미지" />
            </div>
          </section>
          <section className="prod_pick flex-box">
            <div className="add-wish wish-sub">add to wishlist ＞</div>
            <div className="add-wish wish-sub buy-btn">buy now ↗</div>
          </section>
        </div>
      </main>
    </>
  );
} /////////// SubBoard 컴포넌트 ////////////////