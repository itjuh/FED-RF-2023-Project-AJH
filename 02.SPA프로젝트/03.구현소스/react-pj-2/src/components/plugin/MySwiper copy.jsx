import $ from "jquery";
import "jquery-ui-dist/jquery-ui";
import { useEffect } from "react";

export function MySwiper({arr}) {

  // arr받아서 

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
    const move = (e) => {
        pos -= 25;
        // 대상요소 움직이기
        $(".slider-box").animate({ top: pos + "%" }, 500, "easeInOutQuad");
        let isFirst = $(".slide").first().hasClass("on");
        // 첫 대상 분기
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
                .animate({ top: -pos + "%" }, 500, "easeInOutQuad", () => {

                });
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

    return (
        <div className="slider-area row-s-11">
            <div className="slider-box" onClick={move}>
                <div className="slider">
                    <div className="slide">1111111111</div>
                </div>
                <div className="slider">
                    <div className="slide">2222222222</div>
                </div>
                <div className="slider">
                    <div className="slide">3333333333</div>
                </div>
                <div className="slider">
                    <div className="slide">4444444444</div>
                </div>
                <div className="slider">
                    <div className="slide">5555555555</div>
                </div>
                <div className="slider">
                    <div className="slide">6666666666</div>
                </div>
                <div className="slider">
                    <div className="slide">7777777777</div>
                </div>
                <div className="slider">
                    <div className="slide">8888888888</div>
                </div>
                <div className="slider">
                    <div className="slide">9999999999</div>
                </div>
            </div>
        </div>
    );
}
