// 키보드 리스크 구성 js

// $("body").css({ transform: "scale(1)", transition: "transform .5s ease-out, opacity .5s ease-in", opacity: 1 });

// 배열 내 랜덤 수 만들기 함수 /////////////////
export function setNum() {
    let randomNum = 0;
    const imgArrNum = [];
    for (let i = 0; i < 10; i++) {
        function inputNum() {
            randomNum = Math.floor(Math.random() * 48 + 1);
            // 배열 내 랜덤 수 존재여부
            // if (imgArrNum.length !== 0) {
                let isIt = imgArrNum.find((v) => {
                    if (v == randomNum) return true;
                });
                if (!isIt) imgArrNum.push(randomNum);
                else inputNum();
            // } else imgArrNum.push(randomNum);
        } ///////inputNum//////////
        inputNum();
    } //////// for문 /////////
    return imgArrNum;
}
