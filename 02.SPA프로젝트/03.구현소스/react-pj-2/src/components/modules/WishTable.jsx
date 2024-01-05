import { memo, useContext, useEffect, useState } from "react";
import $ from "jquery";
import { LeoCon } from "./LeopoldContext";

// LEOPOLD WishList Table만들기 컴포넌트
// export const WishTable = memo(({ data, chgFn }) => {
export const WishTable = memo(({ wishdata, flag }) => {
  // 받은 데이터 : 장바구니 localstorage data
  if (!wishdata) {
    localStorage.setItem("wish", JSON.stringify([]));
    wishdata = JSON.parse(localStorage.getItem("wish"));
  }
  // contextAPI
  const myCon = useContext(LeoCon);
  // 변경 데이터 변수
  const [data, setData] = useState(wishdata);
  // 데이터 변경 시에만 리랜더링
  if (data !== wishdata && flag.current) setData(wishdata);
  // console.log("wishTable// wishdata:",wishdata,'\ndata:',data);

  // 출력 리스트 변수
  // let listCnt = 10;
  // 총 합계 변수
  let subFee;
  let totalFee;
  let sendFee = 2500;
  let items = data.length;
  let cnt;
  // 총 합계 세팅함수
  const totalSet = () => {
    subFee = 0;
    cnt = 0;
    data.forEach((v) => {
      subFee += v.cost * v.count;
      cnt += v.count;
    });
    if (subFee > 0) {
      totalFee = Number(subFee) + sendFee;
    } else totalFee = 0;
  };
  const totalDisplaySet = () => {
    // 총 합계 세팅
    $(".total-fee td")
      .first()
      .text("￦" + addCommas(subFee) + "(Product Price) + ￦" + addCommas(sendFee) + "(delivery fee) =")
      .next()
      .find("i")
      .text("Total ￦" + addCommas(totalFee));
  };
  // 최종합계 세팅함수 호출
  totalSet();
  totalDisplaySet();
  // 3자리수 콤마 함수
  function addCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  // 수량조절 함수
  const updateCnt = (e) => {
    const txt = $(e.currentTarget).text();
    const target = $(e.currentTarget).siblings(".quant");
    let cnt = target.val();
    if (txt === "－") {
      cnt--;
      if (cnt === 0) cnt = 1;
    } else {
      cnt++;
      if (cnt > 99) cnt = 99;
    }
    //증감 수 화면에 반영하기
    target.val(cnt);
    //증감 수 데이터 반영하기
    const targetSeq = $(e.currentTarget).parent().attr("data-seq");
    //업데이트 데이터 번호
    let arrNum = 0;
    let updateData = data.filter((v, i) => {
      if (Number(v.idx) === Number(targetSeq)) {
        v.count = cnt;
        return true;
      } else return true;
    });
    setData(updateData);
    // 로컬 스토리지 반영하기
    localStorage.setItem("wish", JSON.stringify(data));
    // 아이템 가격 세팅
    $(e.currentTarget)
      .parent()
      .parent()
      .next()
      .find(".item-fee")
      .text("￦" + addCommas(data[arrNum].cost * data[arrNum].count));
    // 자식 컴포넌트 업데이트
    flag.current = false;
    // 합계 반영하기
    totalSet();
    totalDisplaySet();
  };
  const checkList = () => {
    let arr = $(".wish-chk-input:checked").parent().parent();
    let arrNum = [];
    arr.each((i, v) => {
      arrNum.push(v.className);
    });
    console.log(arrNum);
    return arrNum;
  };
  // 항목 삭제함수
  const deleteFn = (e) => {
    // 누른 대상의 seq 고유번호
    const tgSeq = $(e.currentTarget).parent().attr("data-seq");
    // 삭제창 열기
    $(".message-box").fadeIn(30);
    // 삭제창의 버튼 이벤트 분기
    let btns = $(".message-box button");
    btns.click(function () {
      let tg = $(this).text();
      let updateData;

      if (tg === "Delete") {
        // 삭제버튼 클릭
        if (tgSeq < 0) {
          // 체크삭제 클릭 : 체크박스 체크 된 데이터
          let arrNum = checkList();
          updateData = data.filter((v) => !arrNum.includes(v.src));
          // 데이터 제거 반영
          setData(updateData);
        } else {
          // 단순 삭제
          updateData = data.filter((v) => {
            if (Number(v.idx) !== Number(tgSeq)) {
              return true;
            }
          });
          // 데이터 제거 반영
          setData(updateData);
        }
        // 로컬 스토리지 반영하기
        localStorage.setItem("wish", JSON.stringify(updateData));
        // 자식컴포넌트 업데이트
        flag.current = false;
        // 체크박스 해제
        $('input[type="checkbox"]').prop("checked", false);
      }
      $(".message-box").fadeOut(30);
      // 위시리스트 업데이트
      myCon.wishUpdate();
    });
  };
  // 숫자 회계처리
  function addCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  // 체크박스 처리
  const allChkFn = function (e) {
    let isChk = $(e.currentTarget).prop("checked");
    let chkEach = $(".wish-chk-input");
    chkEach.prop("checked", isChk);
  };
  // 개별 체크박스
  const eachChkFn = function () {
    let num = $(".wish-chk-input:checked").length;
    if (num >= data.length) {
      $("#all-item").prop("checked", true);
    } else {
      $("#all-item").prop("checked", false);
    }
  };
  useEffect(() => {
    if (flag.current) $('input[type="checkbox"]').prop("checked", true);
  }, []);
  return (
    <section className="wish-box">
      <div className="wish-in-box scbar row-8">
        <table className="wish-table">
          <thead>
            {/* 장바구니 상단부 */}
            <tr>
              {items > 1 && <td colSpan={3}>SubTotal({items} items)</td>}
              {items <= 1 && <td colSpan={3}>SubTotal({items} item)</td>}
              <td colSpan={4}>
                <div className="sel-chk-box flex-box" data-seq="-1">
                  <button onClick={checkList}>checked order</button>
                  <button onClick={(e) => deleteFn(e)}>checked delete</button>
                </div>
              </td>
            </tr>
          </thead>
          {data.length !== 0 && (
            <>
              <tbody>
                <tr>
                  {/* 2-1. 체크박스 */}
                  <th>
                    <input type="checkbox" name="all-item" id="all-item" onChange={(e) => allChkFn(e)} />
                    <label className="wish-chk" htmlFor="all-item">
                      ✔
                    </label>
                  </th>
                  {/* 2-2. 이미지 */}
                  <th>Image</th>
                  {/* 2-3. 제품명 */}
                  <th>Product</th>
                  {/* 2-4. 단가 */}
                  <th>Price</th>
                  {/* 2-5. 수량 */}
                  <th>Quantity</th>
                  {/* 2-6. 합계 */}
                  <th>Sub Total</th>
                  {/* 2-7. 선택구역 */}
                  <th>Select</th>
                </tr>
                {data.map(
                  (v, i) => (
                    // i >= 1 && (
                    <tr key={i} className={v.src}>
                      {/* 2-1. 체크박스 */}
                      <td>
                        <input
                          type="checkbox"
                          name={"item" + v.idx}
                          id={"item" + v.idx}
                          className="wish-chk-input"
                          onChange={() => eachChkFn()}
                        />
                        <label className="wish-chk" htmlFor={"item" + v.idx}>
                          ✔
                        </label>
                      </td>
                      {/* 2-2. 이미지 */}
                      <td>
                        <img src={"./images/image_prod2/" + v.src + ".png"} alt={v.src + "이미지"} />
                      </td>
                      {/* 2-3. 제품명 */}
                      <td>
                        <span>
                          {v.code} - {v.sub}
                        </span>
                      </td>
                      {/* 2-4. 단가 */}
                      <td>
                        <span>￦{addCommas(v.cost)}</span>
                      </td>
                      {/* 2-5. 수량 */}
                      <td>
                        <div className="quant-box flex-box" data-seq={v.idx}>
                          <div className="quant-btn" onClick={(e) => updateCnt(e)}>
                            －
                          </div>
                          <input type="text" className="quant" readOnly defaultValue={v.count} />
                          <div className="quant-btn" onClick={(e) => updateCnt(e)}>
                            ＋
                          </div>
                        </div>
                      </td>
                      {/* 2-6. 합계 */}
                      <td>
                        <span className="item-fee">￦{addCommas(v.cost * v.count)}</span>
                      </td>
                      {/* 2-7. 선택구역 */}
                      <td>
                        <div className="sel-box flex-box" data-seq={v.idx}>
                          <button>order</button>
                          <button onClick={(e) => deleteFn(e)}>delete</button>
                        </div>
                      </td>
                    </tr>
                  )
                  // )
                )}
              </tbody>
              <tfoot>
                <tr className="total-fee">
                  <td colSpan={3}>
                    ￦{addCommas(subFee)}(Product Price) + ￦{addCommas(sendFee)}(delivery fee) =
                  </td>
                  <td colSpan={3}>
                    <i>Total ￦{addCommas(totalFee)}</i>
                  </td>
                </tr>
              </tfoot>
            </>
          )}
          {items === 0 && (
            <>
              <tbody>
                <tr>
                  {/* 2-1. 체크박스 */}
                  <th></th>
                  {/* 2-2. 이미지 */}
                  <th>Image</th>
                  {/* 2-3. 제품명 */}
                  <th>Product</th>
                  {/* 2-4. 단가 */}
                  <th>Price</th>
                  {/* 2-5. 수량 */}
                  <th>Quantity</th>
                  {/* 2-6. 합계 */}
                  <th>Sub Total</th>
                  {/* 2-7. 선택구역 */}
                  <th>Select</th>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={7} style={{ fontSize: "1.6rem", padding: "2vw" }}>
                    <i>You didn't put the product in wishlist.....</i>
                  </td>
                </tr>
              </tfoot>
            </>
          )}
        </table>
      </div>
    </section>
  );
}); ////////// WishTable 컴포넌트 ///////////
