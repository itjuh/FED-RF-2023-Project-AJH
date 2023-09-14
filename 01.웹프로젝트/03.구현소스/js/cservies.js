// 온고롱 서브 고객센터페이지 JS - cservies.js

//domFn객체
const domFn = {
    // 요소선택 함수 ////////////
    qs : (x) => document.querySelector(x),
    qsEl : (el,x) => el.querySelector(x),
    qsa : (x) => document.querySelectorAll(x),
    qsaEl : (el,x) => el.querySelectorAll(x),
    // 이벤트 세팅함수 //////////
    addEvt : (ele,evt,fn) => ele.addEventListener(evt,fn),
}; /////////////////domFn////////////////

//호출은 domfn.qs(x);

// [ faq를 화면에 뿌린다. ]
// 1. 대상선정
// 1-1. 변경대상 .faq-content>ul
// 이벤트 대상 load
let faqContent = domFn.qs('.faq-content>ul');
// 코드변수
let hcode = '';
// console.log(faq_cont);
// 서브카테고리 li (데이터 정리될 때 마다 다시 읽기)
let faqContLi = domFn.qsa('.faq-content>ul>li');

// 전체 카테고리 내용 뿌리기 함수 실행
input_cate_all();


// 전체 카테고리 내용 html코드저장 함수
function input_cate_all(){
    faq_cont.forEach(ele=>{
        let seqNum = ele.seq % 10 + 1;
        // console.log(seqNum);
        hcode += `
        <li data-seq=${ele.seq}>${ele.질문}
            <!-- ${ele.카테고리} 질문${seqNum} 답변박스 -->
            <div class="asked-box">
                <span>${ele.응답}</span>
            </div>
        </li>
        `;
    }); //////faq forEach //////////////
    // console.log('전체카테고리 함수실행',hcode);
    faqContent.innerHTML = hcode;
    // 코드저장
    open_evt();
} ////////////input_cate_all ////////////////


// 일부 카테고리 내용html 코드저장 함수
function input_cate(cateName){
    hcode='';
    console.log(cateName, hcode);
    faq_cont.forEach(ele=>{
        let seqNum = ele.seq % 10 + 1;
        if(ele.카테고리 == cateName){
            console.log('ele.카테고리',ele.카테고리);
            hcode += `
            <li data-seq=${ele.seq}>${ele.질문}
                <!-- ${ele.카테고리} 질문${seqNum} 답변박스 -->
                <div class="asked-box">
                    <span>${ele.응답}</span>
                </div>
            </li>
            `;
        }
    }); //////faq forEach //////////////
    faqContent.innerHTML = hcode;
    //코드저장
    open_evt();
} ////////////input_cate ////////////////////


// [ 마우스를 클릭 한 li에 on을 준다 ]
// [ 서브카테고리별 내용 꺼내오기 ]
// on이 있는 서브카테고리의 내용만 가져오기

// 1. 대상선정 
// 1-1. 변경대상 faq-sub-cate>ol>li

let contactInfo = domFn.qsa('.faq-sub-cate>ol>li'); 
// 2. 클릭이벤트 설정
contactInfo.forEach(ele=>{
    domFn.addEvt(ele,'click',(e)=>{
        contactInfo.forEach(ele=>{
            // 모든 li에 on지우기
            ele.classList.remove('on');
            // 모든 faqContent 내용 지우기
            faqContent.innerHTML = '';
        });
        console.log(ele);
        // 클릭대상에 on넣기
        ele.classList.add('on');
        // 클릭대상에 대한 값 읽고 데이터 정렬해서 빼오기
        let cate = ele.innerText;
        console.log('클릭한 txt는 : ',cate);
        // 카테고리별 내용을 함수에 들고가서 리스트 만들기
        switch(cate){
            case '전체': 
                console.log('전체로 들어옴');
                input_cate_all();
                break;
            case '예약&변경':
                console.log('예약로 들어옴');
                input_cate('예약&변경');
                break;
            case '결제관련':
                console.log('결제로 들어옴');
                input_cate('결제관련');
                break;
            case '상품관련':
                console.log('상품로 들어옴');
                input_cate('상품관련');
                break;
            case '픽업관련':
                console.log('픽업로 들어옴');
                input_cate('픽업관련');
                break;
        } //////switch case //////////////
    });
}); //////////forEach ////////////////////

// 2. 서브카테고리 누르면 순번 읽어오고 open주기
// [ 마우스를 클릭 한 li에 open을 준다 ]
// 서브카테고리의 번호를 읽어오기 
// 값+1 / 2 >=n 이면 n/n+1
// grid-row: n/n+1
// 1. 대상선정 
// 1-1. 변경대상 .faq-content>ul>li
// 2. 변경사항
// 2-1. 클릭대상에 open 클래스 주기
// 2-2. 클릭대상에 style ='grid-row:n/n+1;' 넣어주기
function open_evt(){
    // faq_content>ul>li값 다시 읽기
    faqContLi = domFn.qsa('.faq-content>ul>li');
    // 클릭이벤트 만들어주기
    faqContLi.forEach((ele,idx)=>{
        domFn.addEvt(ele,'click',()=>{
            // 모든 li에 open빼기
            faqContLi.forEach(ele=>{
                ele.classList.remove('open');
                ele.style.gridRow = "";
                ele.style.marginBottom = "";
            });
            // 클릭한 요소에 open 넣기
            ele.classList.add('open');
            // 클릭한 요소의 위치값에 따라 grid조정
            // 조정변수 n : row조정을 위한 변수
            let n = Math.floor(idx/2 + 1);
            ele.style.gridRow = `${n}/${n+1}`;
            ele.style.marginBottom = '70px';
        });
    }); ////////faqContLi forEach ////////////
}

