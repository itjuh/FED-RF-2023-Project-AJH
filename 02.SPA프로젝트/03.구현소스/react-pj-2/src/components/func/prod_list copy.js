// 키보드 리스크 구성 js

// $("body").css({ transform: "scale(1)", transition: "transform .5s ease-out, opacity .5s ease-in", opacity: 1 });

export function imgSetting() {
  const imgArrNum = [];
  for (let i = 1; i < 11; i++) {
    let randomNum = 0;
    // 배열 내 랜덤 수 만들기 함수 /////////////////
    function inputNum() {
      randomNum = Math.floor(Math.random() * 48 + 1);
      // 배열 내 랜덤 수 존재여부
      let isIt = imgArrNum.find((v) => {
        if (v == randomNum) return true;
      });
      if (!isIt) imgArrNum.push(randomNum);
      else inputNum();
      console.log(isIt, imgArrNum);
    } ///////inputNum//////////
    // 랜덤 수 만들기
    inputNum();
    // console.log(imgArrNum[i - 1]-1,boardData[imgArrNum[i - 1]-1][0]);
    $(".prod-area ol").append(`
        <li>    
            <div class="prod-item" style="background-image: url(./images/image_prod2/keyboard${
              imgArrNum[i - 1]
            }.png)" data-seq='${imgArrNum[i - 1] - 1}'>
              <!-- 더보기 -->
              <div class='prod-detail-view'>view</div>
            </div>
            <h3 class='prod-item-title'>${boardData[imgArrNum[i - 1] - 1][0]}</h3>
            <h3 class='prod-item-title'>${boardData[imgArrNum[i - 1] - 1][1]}</h3>
            <!-- 위시리스트 버튼 -->
            <div class='add-wish'>add to wishlist ＞</div>
        </li>`);
  } ///////////for문//////////////////////
}
