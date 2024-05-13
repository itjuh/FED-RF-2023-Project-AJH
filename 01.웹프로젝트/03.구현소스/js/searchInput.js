// 말풍선 내부의 글자값 #search넣기
// 키워드 대상: .bubble-key
const bubbleKey = document.querySelectorAll('.bubble-key');
// 검색 input
const searchInput = document.querySelector('#search');
// console.log(bubbleKey,searchInput);
// 추가구현 : .key-prod-box .view클래스 주고 업데이트
const keyProdBox = document.querySelector('.key-prod-box');

bubbleKey.forEach(ele=>{
    ele.addEventListener('click',()=>{
        let txt = ele.innerText.replace('#','');
        //console.log(txt);
        //데이터 읽어와서 검색창에 넣기
        searchInput.value = txt;
    });
}); ///////////말풍선 키워드 넣기/////////

// 키워드가 들어간 상태에서 돋보기 클릭 시 
// 제품 보여주기
// 대상: .search-box i
const more = document.querySelector('.search-box i');
more.addEventListener('click',()=>{
    let txt = searchInput.value;
    prodCodeMake(txt);
    keyProdBox.classList.add('view');
});

// 키워드 검색창에 넣으면 상품 데이터 뿌리기
// 대상: .list>ol
let itemBox = document.querySelector('.key-prod-box .list>ol');
// 코드변수
let cateCode = '';
let titleCode = '';
// 3개 제한 변수
let limitCnt = 0;

// 제품코드 만들기 함수
function prodCodeMake(atxt){
    titleCode = atxt;
    // 읽어온 값 가공하기
    atxt = '@'+atxt;
    // 코드변수 초기화
    cateCode = '';
    // 제한변수 초기화
    limitCnt = 0;
    console.log('가져온 값 :',atxt);
    for(let x in prod_info){ //x는 속성명
        // console.log(prod_info[x]["prod_tag"]);
        // 태그가 일치하면 꺼내온다
        // 태그 저장배열
        let tagList = prod_info[x]["prod_tag"];
        console.log('비교결과 :', x, tagList, sameTag(tagList,atxt));
        // 태그 확인하기
        if(sameTag(tagList,atxt)){
            limitCnt++;
            // console.log(prod_info[x]);
            cateCode += `
            <li>
            <div class="partbox">
                <div class="img-box">
                    <img src="${prod_info[x]["src"]}" alt="상품이미지1">
                </div>
                <div class="txt-box">
                    <ul>
                        <li class="prod-name">${prod_info[x]["prod_name"]}</li>
                        <li class="prod-price">${prod_info[x]["prod_price"]}</li>
                    </ul>
                </div>
            </div>
            </li>
            `;
            if(limitCnt == 3) break;
        }///////if//////////
    }///////////for in////////////////////
    console.log(cateCode);
    itemBox.innerHTML = cateCode;
    // document.querySelector('.key-prod-box .tit').innerText = titleCode;

}/////////제품코드 만들기 함수
// 데이터 검증 함수
function sameTag(arr,txt){
    for(let x in arr){
        // 배열을 돌면서 태그와 일치하면 true return
        if(txt == arr[x])
        return true;
    }
} //////태그 검증 함수 sameTag///////////

// 스크롤 이벤트 만들기
// 대상: #search 위치 이동
// 1. 스크롤 위치값 찍기 2360 2610이 getBoundingClientRect()top에서 0이 되면 원래자리로
// 2. 특정 위치값에서 ~~까지 위치지정

// 1-1. 위치대상
let keyBox = document.querySelector('.main-key-search');
// 1-2. 움직일 대상 : .search-box
let sBox = document.querySelector('.search-box');
let glass = document.querySelector('.search-box i');
// 2. 위치대상의 높이 값 읽기
let eleH = keyBox.clientHeight;
// 이벤트 설정하기
window.addEventListener('scroll',leaveOutOn);
window.addEventListener('ResizeObserver',leaveOutOn)
// 윈도우 높이
let winH = window.innerHeight;

function leaveOutOn(){ //추후에 확인할 요소값 받기
    // .main-key-search 위치를 지나가면 위치이동 on을 준다
    // 2. 위치대상의 바운딩값
    let bTop = keyBox.getBoundingClientRect().top + 70; 
    // 종료지점은 상단부에 붙는 순간
    // 3. 미디어쿼리용 윈도우 넓이 읽기
    let winW = window.innerWidth;
    // console.log(winW);
    let endPoint = 70;
    console.log('bTop:',bTop,winH);
    // 시작지점 : bTop >= winH 박스내려오자
    if(bTop < winH && bTop >= endPoint && winW >= 1050){
        // // 검색박스 위치이동
        // sBox.style.top = bTop + 'px';
        // sBox.style.transition = '0s';
        // sBox.style.paddingRight = '0';
        // sBox.style.textAlign = 'center';
        // sBox.style.left = '-74%';
        // // console.log('들어왔다',bTop);
        // // 돋보기 위치 이동
        // glass.style.transform = 'translate(calc(-50% + min(16vw,174px)),66%)';
        if(winW > 1450){
            sBox.style.transform = 'scale(1.9)';
            // 검색박스 위치이동
            sBox.style.top = bTop + 'px';
            sBox.style.transition = '0s';
            sBox.style.paddingRight = '0';
            sBox.style.textAlign = 'center';
            sBox.style.left = '-74%';
            // 돋보기 위치 이동
            glass.style.transform = 'translate(calc(-50% + min(16vw,174px)),66%)';
        }else if(winW <= 1450){ // 미디어쿼리 시작지점
            sBox.style.transform = 'scale(1.7)';
            sBox.style.top = bTop + 'px';
            sBox.style.transition = '0s';
            sBox.style.paddingRight = '0';
            sBox.style.textAlign = 'center';
            sBox.style.left = '-74%';
            // 돋보기 위치 이동
            glass.style.transform = 'translate(calc(-50% + min(16vw,174px)),66%)';
        }
    }else{
        // 검색박스 위치 복구
        sBox.style.top = 0;
        sBox.style.transition = '.5s';
        sBox.style.paddingRight = '1.5vw';
        sBox.style.textAlign = 'right';
        sBox.style.left = '0';
        sBox.style.transform = 'scale(1)';
        // 돋보기 위치 복구
        glass.style.transform = 'translate(calc(-50% + min(15vw,249px)),66%)';
        // console.log('나갔다',bTop);
    }
}
