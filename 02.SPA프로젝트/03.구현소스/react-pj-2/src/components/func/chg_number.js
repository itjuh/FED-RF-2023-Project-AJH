// 정규식을 이용한 숫자 3자리마다 콤마(,)를 입력
function money_comma(str) {
  str = Number(str);
  str = str.replace(/[^\d]+/g, ""); // 숫자만 남김
  return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, "$1,");
}
function addCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
// 정규식을 이용한 숫자만 추출
function money_uncomma(str) {
  str = Number(str);
  return str.replace(/[^\d]+/g, "");
}

// 금액값 입력
var money = 25763000;

// 콤마 입력
console.log(money_comma(money));

// 결과값
// 25,763,000

// 콤마 제거
console.log(money_uncomma(money_comma(money)));

// 결과값
// 25763000
