// 온고롱 서브 주문하기 js - order.js

// footer영역 가져오기
import startFooterFn from "./footer.js";
// dom 가져오기
import domFn from "./dom.js";
// footer영역 실행
startFooterFn();


////////////////////단계이동//////////////////////
// 변경대상 : .proceed-list
// 변경 : transform: translateX(pageNum * -100%);
// 변경대상 : .point-box .proceed-nav li
// 변경 : left: pageNum * 33%; top: pageNum>2?0:60%; 
// 이벤트 대상 : .main-btn button.next .main-btn button.prev
// 단계변수 : pageNum
let pageNum = 0;
// row값 변수
let rowNum = 0;
// col값 변수
let colNum = 0;
// 이름저장, 번호저장 변수
let nameTxt = "", numberTxt ="";
// 단계이동 시 주문서창도 변경
// 대상선정
const formDt = domFn.qsa('.form-content dt');
const formDd = domFn.qsa('.form-content dd');
// 업데이트 구역 만들기
let upArea = [];
for(let i = 0; i < formDt.length; i++){
    upArea[i] = [formDt[i],formDd[i]];
} //////// for문 업데이트 구역/////////////
// console.log(upArea);
// 대상선정
const proceedList = domFn.qs('.proceed-content>ol');
const pointBox = domFn.qs('.point-box');
const mainNxBtn = domFn.qs('.main-btn button.next');
const mainPvBtn = domFn.qs('.main-btn button.prev');
const proceedTitle = domFn.qs('.proceed-title h2');
const proNav = domFn.qsa('.proceed-nav li');
// console.log("proceedList",proceedList,"pointBox",pointBox,"mainNxBtn",mainNxBtn,"mainPvBtn",mainPvBtn)
// 이벤트 등록
domFn.addEvt(mainNxBtn,'click',stepFn);
domFn.addEvt(mainPvBtn,'click',stepFn);

// 함수만들기
// 단계이동 함수
function stepFn(){
    console.log(this);
    if(this.classList.contains('prev')){ //이전버튼
        pageNum--;
        colNum--;
        if(pageNum < 0){ //1단계 일때
            pageNum = 0;
        }
        console.log('이전클릭;',pageNum);
    }else{ //다음버튼
        pageNum++;
        colNum++;
        if(pageNum == 6){ //6단계 일때
            pageNum = 5;
        }
        console.log('다음클릭;',pageNum,colNum);
    // 데이터 업데이트하기
    switch(pageNum){
        case 1 :
            updateData(0,stepBox1);
            break;
        case 2 : 
            updateData(2,pickUpLi);
            nameTxt = inputName.value;
            numberTxt = inputNumber.value;
            if(!nameTxt == '') updateData2(3,nameTxt);
            if(!numberTxt == '') updateData2(4,numberTxt);
            break;
    }/////////switch case ///////////
    }
    // 변수설정
    let trX = pageNum * 16.7;
    // 값 고치기
    proceedList.style.transform = `translateX(-${trX}%)`;
    proceedTitle.innerText = step_title[pageNum];
    proNav.forEach((ele,idx)=>{
        ele.classList.remove('on');
        if(idx == pageNum){
            ele.classList.add('on');
        }
    }); 
} ///////////stepChg 함수 /////////////////////

//////////////////목적선택/////////////////////////
// 클릭한 li on주고 on 상태로 다음 누르면 데이터 왼쪽에 업데이트
// 변경대상, 이벤트 대상 : .step-0 li
// 이벤트 대상2 : mainNxBtn
// 변경대상2 : .form-content dt:nth-child(1)
// 변경대상2 : .form-content dd:nth-child(1)
//////////////////////////////////////////////
// 대상선정
const stepBox1 = domFn.qsa('.step-0 li');

// on 넣기 함수
function inputOnFn(ele){
    if(ele.classList.contains('on')){ //on 이미 있으면
        ele.classList.remove('on');
    }else{ //on 없으면
        stepBox1.forEach(ele=>{
            ele.classList.remove('on');
        });
        ele.classList.add('on');
    }///////////if else//////////////
} ///////inputOnFn/////////////

// 클릭이벤트 주기
stepBox1.forEach(ele=>{
    domFn.addEvt(ele,'click',()=>{
        inputOnFn(ele);
    });
});/////////step-01 click이벤트 설정////////

// on상태로 다음 누르면 데이터 업데이트
function updateData(num,coll){
    //매개변수
    //num : 업데이트 위치
    //coll : on검증할 collection
    // 업데이트 검증
    let bool = verifFn(coll);
    if(bool[0]){ //on이 있는 상태로 넘어온 경우
        console.log(upArea[num]);
        // 주문서 타이틀 업데이트
        upArea[num][0].style.color = '#000';
        // 주문서 내용 업데이트
        upArea[num][1].style.color = '#000';
        upArea[num][1].innerText = bool[1];  
    }
}

// on 검증 함수
function verifFn(coll){
    let bool = [false,''];
    coll.forEach(ele=>{
        if(ele.classList.contains('on')){
            bool[0] = true;
            bool[1] = ele.innerText;
            return;
        }//////if///////
    });
    return bool;
} /////////// 검증함수 verifFn //////////

//////////////////일정선택/////////////////////////
// 일정 클릭하면 달력창 열리기
// 달력창 다음 > 시간창 열리기 이전 > 닫기
// 시간창 다음 > 값 가져오기 이전 > 달력창
// 이벤트 대상 : .day-time , .cal-btn, .time-btn
// 변경 대상 : .hide-box .calendar-box .timer
// 이벤트 종류 : click
//////////////////////////////////////////////////
// 1. 대상선정
// 1-1. 이벤트대상
const dayTime = domFn.qs('.day-time');
const calBtn = domFn.qsa('.cal-btn button');
const timeBtn = domFn.qsa('.time-btn button');
// 1-2. 변경대상
const hideBox = domFn.qs('.hide-box');
const calBox = domFn.qs('.calendar-box');
const timeBox = domFn.qs('.timer');

// 2. 이벤트 설정하기
domFn.addEvt(dayTime,'click',popOpen);
calBtn.forEach(ele=>{
    domFn.addEvt(ele,'click',popOpen);
});
timeBtn.forEach(ele=>{
    domFn.addEvt(ele,'click',popOpen);
});

// 3. 함수만들기
// 팝업창 열고 닫기 함수
function popOpen(){
    console.log('입장!',this.value,this.innerText);
    let txt = '';
    if(this.value==''){
        txt = this.innerText.trim();
    }else txt = this.value;
    switch(txt){
        case '찾아가실 날짜와 시간' :
            hideBox.style.display = 'block';
            calBox.style.display = 'block';
            break;
        case '다음' :
            calBox.style.display = 'none';
            timeBox.style.display = 'block';
            break;
        case '완료' :
            hideBox.style.display = 'none';
            timeBox.style.display = 'none';
            updateData2(1,'2023년 9월 30일 오후 1시 30분');
            break;
        case '닫기' :
            hideBox.style.display = 'none';
            calBox.style.display = 'none';
            break;
        case '이전' :
            calBox.style.display = 'block';
            timeBox.style.display = 'none';
            break;
    }
}
// 데이터 보내기 함수
function updateData2(num,txt){
    //매개변수
    // area : 업데이트 위치
    // 주문서 타이틀 업데이트
    console.log(txt);
    upArea[num][0].style.color = '#000';
    // 주문서 내용 업데이트
    upArea[num][1].style.color = '#000';
    upArea[num][1].innerText = txt;  
}

///////////////픽업관련///////////////////
// 픽업대상 누르면 데이터 업데이트
// 성함 연락처 입력하고 다음 누르면 업데이트
// 1. 대상선정
// 1-1. 이벤트 대상 : .pick-up li, .name, .number
// 1-2. 변경대상 upArea[3] upArea[4] upArea[5]
// 2. 이벤트 종류 : click
//////////////////////////////////////////////
// 1. 대상선정
const pickUpLi = domFn.qsa('.pick-up li');
const inputName = domFn.qs('.pick-up .name');
const inputNumber = domFn.qs('.pick-up .number');
// console.log(pickUpLi,inputName,inputNumber);

// 2. 클릭이벤트 주기
pickUpLi.forEach(ele=>{
    domFn.addEvt(ele,'click',()=>{
        if(ele.classList.contains('on')){ //on 이미 있으면
            ele.classList.remove('on');
        }else{ //on 없으면
            pickUpLi.forEach(ele=>{
                ele.classList.remove('on');
            });
            ele.classList.add('on');
        }///////////if else//////////////
    });
});/////////pickUpLi click이벤트 설정////////
//////////////////추가선택/////////////////////////

//////////////////주문하기/////////////////////////


/////////////////상품선택 , 옵션선택//////////////////////
// 클릭데이터 가져와서 상품 뿌리기
// 클릭대상 : proceed-list li, .sub-menu span
const category = domFn.qsa('.step-2>ul>li');
const subcate = domFn.qsa('.sub-menu span');
// 바꿀대상 : .step-3>ul>li, .step-3>ul :open,on
// 바꿀대상 : .form-box, prod-box :view
// 바꿀대상 : .prod-option :view제거
const categoryParent = domFn.qs('.step-2>ul');
const formBox = domFn.qs('.form-box');
const prodBox = domFn.qs('.prod-box');
const prodOptionBox = domFn.qs('.prod-option');
// 이벤트 설정 : category li, 
category.forEach(ele=>{
    domFn.addEvt(ele,'click',cataOpen);
});
subcate.forEach(ele=>{
    domFn.addEvt(ele,'click',subOpen);
});
// 데이터 가져오기변수
let atxt = '';

// 3. 누른 카테고리 읽기함수
function cataOpen(){
    let clickCode = this.innerHTML;
    if(this.innerHTML !== this.innerText){ //하위메뉴 있는경우
        // console.log(clickCode,this);
        // 상위 ul 클래스 주기
        categoryParent.classList.add("open");
        // 기존 li 클래스 삭제
        category.forEach(ele=>{
            ele.classList.remove("on");
            ele.classList.remove("open");
        });
        // click한 li 클래스 주기
        this.classList.add("on");
        this.classList.add("open");
    }else{ //하위메뉴 없는 경우
        // 상위 ul 클래스 삭제
        categoryParent.classList.remove("open");
        // 기존 li 클래스 삭제
        category.forEach(ele=>{
            ele.classList.remove("on");
            ele.classList.remove("open");
        });
        // click한 li 클래스주기
        this.classList.add("on");
        // li안쪽 text 가져오기
        atxt = clickCode;
        // 왼쪽 열기
        formBox.classList.add("view");
        prodBox.classList.add("view");
        // 왼쪽 옵션박스가 열려있다면 닫기
        if(prodOptionBox.classList.contains('view')){
            prodOptionBox.classList.remove('view');
        }
        // 코드 만들어서 뿌리기
        prodCodeMake(atxt);
    }
} ////////cateOpen함수//////////////
// 4. 누른 서브메뉴 읽기 함수
function subOpen(){
    let clickCode = this.innerText;
    // console.log(clickCode,this);
    // 기존 span 클래스 삭제
    subcate.forEach(ele=>{
        ele.classList.remove("open");
    });
    // click한 li 클래스 주기
    this.classList.add("open");
    // span안쪽 text 가져오기
    atxt = clickCode;
    // 왼쪽 열기
    formBox.classList.add("view");
    prodBox.classList.add("view");
    // 왼쪽 옵션박스가 열려있다면 닫기
    if(prodOptionBox.classList.contains('view')){
        prodOptionBox.classList.remove('view');
    }
    // 코드 만들어서 뿌리기
    prodCodeMake(atxt);
} ////////subOpen함수//////////////


// 상품 데이터 뿌리기
// 대상: .list>ol
let itemBox = domFn.qs('.prod-box .list>ol');
// 코드변수
let cateCode = '';
let titleCode = '';
// 3개 제한 변수
let limitCnt = 0;
// 뿌린 데이터 저장 변수
let itemList;
// 제품코드 만들기 함수
function prodCodeMake(atxt){
    titleCode = atxt;
    // 읽어온 값 가공하기
    atxt = '@'+atxt;
    // 코드변수 초기화
    cateCode = '';
    // 제한변수 초기화
    limitCnt = 0;
    // console.log('가져온 값 :',atxt);
    for(let x in prod_info){ //x는 속성명
        // console.log(prod_info[x]["prod_tag"]);
        // 태그가 일치하면 꺼내온다
        // 태그 저장배열
        let tagList = prod_info[x]["prod_tag"];
        // console.log('비교결과 :', x, tagList, sameTag(tagList,atxt));
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
    // console.log(cateCode);
    itemBox.innerHTML = cateCode;
    domFn.qs('.tit').innerText = titleCode;

    //코드 생성 후에 클릭이벤트 주기
    itemList = domFn.qsa('.list>ol>li');

    // 상품 누르면 옵션창에 보내기 함수
    // 이벤트 설정
    itemList.forEach(ele=>{
        domFn.addEvt(ele,'click',sendInfo); 
    });
}/////////제품코드 만들기 함수
// console.log(hCode);
// 데이터 검증 함수
function sameTag(arr,txt){
    for(let x in arr){
        // 배열을 돌면서 태그와 일치하면 true return
        if(txt == arr[x])
        return true;
    }
} //////태그 검증 함수 sameTag///////////


// 옵션 데이터 뿌리기

// 1. 대상선정 : 고정옵션/선택옵션
// 클릭대상 정보로 데이터 뿌릴 곳
const optionImg = domFn.qs('.prod');
// 기본구성품
const basic = domFn.qs('.option-basic>dl');
// 선택옵션
const option = domFn.qsa('.option-select>dl');
// 이벤트 대상 (추후에 리스트에 넣음)


// 코드 저장변수
let selCode = [];
selCode.length = 4;
// 코드저장변수
let hCode = '';
// 클릭대상 정보 가져오기
// itemBox 안쪽 li 그대로 코드 저장해서 옮기면 됨
// 제품 누르면 제품옵션박스 올라오기 .prod-option > prodOptionBox

// 고정옵션/선택옵션 뿌리기
for(let x in option_list){
    switch(x){
        case "기본구성품 안내":
            hCode +=
            `
            <dt>${x}</dt>
            <dd>${option_list[x]}</dd>
            `;
            break;
        case "보관 안내":
            hCode +=
            `
            <dt>${x}</dt>
            <dd>${option_list[x]}</dd>
            `;
            break;
        case "맛 선택" :
            selCode[0] =
            `
            <dt>${x}</dt>
            <dd>${depth2(option_list[x])}</dd>
            `;
            break;
        case "사이즈" :
            selCode[1] =
            `
            <dt>${x}</dt>
            <dd>${depth2(option_list[x])}</dd>
            `;
            break;
        case "문구" :
            selCode[2] =
            `
            <dt>${x}(0/15)</dt>
            <dd>
                <input id="message"type="text" placeholder="${option_list[x]}">
            </dd>
            `;
            break;
        case "요청사항" :
            selCode[3] =
            `
            <dt>${x}(0/100)</dt>
            <dd>
                <textarea id="request" cols="30" rows="5" placeholder="${option_list[x]}"></textarea>
            </dd>
            `;
            break;
    }////////switch case문///////////////
} /////////for in//////////////////
// console.log(selCode);
option.forEach((ele,idx) =>{
    ele.innerHTML = selCode[idx];
});
// console.log(hCode);
basic.innerHTML = hCode;

// 함수 만들기
// 1.서서브 코드구성 함수
function depth2(list){
    let depCode = '';
    for(let x in list){
        // console.log(list[x].name);
        depCode += `
        <div class="details ${list[x].img?'flavor':'size-box'}">
            <div class="${list[x].img?'img-box':'container'}">
                ${list[x].img?`<img src="${list[x].img}" alt="${list[x].alt}">`:`<div class="container"><div class="cylinder"></div></div>`}
            </div>
            <div class="txt-box">
                <span>${list[x].name}</span>
                <span>+${list[x].price}</span>
            </div>
        </div>
        `;
    } ////////for in문///////////
    // console.log('depCode',depCode);
    return depCode;
} //////depth2함수////////////////

// 2. 누른 제품코드 읽기함수 
function sendInfo(){
    let cCode = this.innerHTML;
    // 누른 코드 적용
    optionImg.innerHTML = cCode;
    console.log(cCode);
    // 옵션박스 크기 늘리기

    prodOptionBox.classList.add('view');
}

////////////////옵션박스 닫기/////////////////////
// 1. 대상 : prodOptionBox  .aside-btn btn
// 2. 이벤트 : click
// 3. 변경사항 : view 제거
const asideBtn = domFn.qsa('.aside-btn .btn');
asideBtn.forEach(ele=>{
    domFn.addEvt(ele,'click',optionClose);
});
function optionClose(){
    if(this.classList.contains('prev')){
        //이전버튼 -> 바로 닫히기
        console.log(this,'이전버튼누름');
    }else{
        //다음버튼 ->
        console.log(this,'다음버튼 누름');
        //
    }
    prodOptionBox.classList.remove('view');
}