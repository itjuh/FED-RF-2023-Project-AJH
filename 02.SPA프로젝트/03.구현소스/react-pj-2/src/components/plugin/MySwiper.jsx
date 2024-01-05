import $ from "jquery";
import "jquery-ui-dist/jquery-ui";
import { boardData } from "../data/boardData";

export function MySwiper({ data, inputWish }) {
  // 데이터 받아서 swiper구현하기
  console.log("myswiper:", data);
  /**
   * 1. 드래그 배너 구현하기
   * 요구사항
   * 1) 화면에 5개의 상품이 보여짐
   * 2) 1번 대상은 scale 0.7의 크기로 줄어들고 2번 요소가 덮는 형태
   * 3) 무한 루프 드래그
   * 4) 1/3지점까지 움직이면 이동
   * 5) z-index설정
   * ___________________________
   * 드래그 대상 slider-box
   * 드래그는 Y축 방향만 적용
   * 클릭인지 드래그인이 확인해서 구분하기
   */

  // const tg = document.querySelector('.slider-box');
  // 1. 대상선정 : .dtg는 .slide와 일치함!
  let pos = 0;
  // 정방향 이동함수
  const moveNext = (e) => {
    pos -= 25;
    // 대상요소 움직이기
    $(".slider-box").animate({ top: pos + "%" }, 500, "easeInOutQuad");
    let isFirst = $(".slide").first().hasClass("on");
    // 대상 분기
    if (!isFirst) {
      //첫 대상인 경우
      $(".slide").first().addClass("on");
      $(".slider")
        .first()
        .animate({ top: -pos + "%" }, 500, "easeInOutQuad");
    } else {
      // 두번째 대상인 경우
      $(".slider")
        .first()
        .animate({ top: -pos + "%" }, 500, "easeInOutQuad", () => {});
      pos += 25;
      $(".slide").eq(1).addClass("on");
      $(".slider")
        .eq(1)
        .animate({ top: -pos + "%" }, 500, "easeInOutQuad", function () {
          $(".slider-box").css({ top: pos + "%" });
          $(".slider-box").append($(".slider").first().css({ top: 0 }));
          $(".slide").last().removeClass("on");
        });
    }
  };
  // 역방향 이동함수
  const movePrev = (e) => {
    pos += 25;
    //대상 분기
    
    //대상요소 움직이기
    $(".slider-box").animate({ top: pos + "%" }, 500, "easeInOutQuad");
  }
  const bindSlider = (data) => {
    return data.map((v, i) => (
      <div className="slider" key={i}>
        <div className="slide">
          <div
            className="prod-item"
            data-seq={v}
            // onClick={() => goNav(v)}
            style={{ backgroundImage: "url(./images/image_prod2/keyboard" + v + ".png)" }}
          >
            {/* 더보기 */}
            <div className="prod-detail-view">view</div>
          </div>
          <h3 className="prod-item-title">{boardData[v - 1][0]}</h3>
          <h3 className="prod-item-title">{boardData[v - 1][1]}</h3>
          {/* 위시리스트 버튼 */}
          <div className="add-wish" onClick={inputWish} data-seq={v}>
            add to wishlist ＞
          </div>
        </div>
      </div>
    ));
  };
  return (
    <div className="slider-area row-s-11">
      <div className="slider-box" onClick={moveNext}>
        {bindSlider(data)}
      </div>
    </div>
  );
}
