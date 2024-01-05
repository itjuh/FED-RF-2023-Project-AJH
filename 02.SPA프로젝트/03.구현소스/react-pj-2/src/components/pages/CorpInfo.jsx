// 레오폴드 Contact페이지
import { corpData } from "../data/corpData";
import '../../css/contact.css';

export function CorpInfo() {
  return (
    <main className="main in-box row-12 row-s-13">
      {/* 1. 회사정보 박스 */}
      <div className="part-box col-16 row-12 row-s-13">
        <div className="contact-area">
          {/* 1-1. 상단 타이틀 */}
          <h2>
            Contact Us
          </h2>
          <ul>
            {
              corpData.map((v, i) =><li key={i}>
                <ol>
                  <li className='tit-corp'>{v.con} {v.tit}</li>
                  <li className='txt-corp'>{v.txt}</li>
                  {
                    v.txtsub !== null &&
                    <li className='txtsub-corp'>{v.txtsub}</li>
                  }
                </ol>
              </li>
              )
            }
          </ul>
        </div>
      </div>
    </main>
  );
}
