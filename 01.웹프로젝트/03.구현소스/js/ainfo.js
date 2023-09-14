// 온고롱 서브A 안내페이지 js - ainfo.js

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


// 로드함수
domFn.addEvt(window,'load',loadFn);
function loadFn(){
    /* 안내페이지 재료소개 구역에 데이터 뿌리기 */
    // 1. 대상선정
    // 1-1. 변경대상 : .intro-grad
    const introGrad = domFn.qs('.intro-grad');
    // delay시간 지정상수
    const DELAY_TIME = .8;
    // html 코드저장 함수
    let hcode = '';
    // 코드 저장하기
    for(let i=0;i<2;i++){
        grad_info.forEach(ele=>{
            // console.log(ele, introGrad);
            hcode+=`
            <li class="grad-box">
                <img src="${ele.src}" alt="${ele.alt}">
                <mark>${ele.재료명}</mark>
            </li>
            `;
        });

    }
    console.log(hcode);
    // 코드 뿌리기
    introGrad.innerHTML = hcode;
    /* 주의사항 페이지에 데이터 뿌리기 */
    // 1. 대상선정
    // 1-1. 변경대상 : .cautions-info>ol
    const cautionOl = domFn.qs('.cautions-info>ol');
    // html 코드저장 함수 초기화
    hcode = '';
    // 코드 저장하기
    for(let x in caution_data){
        hcode += `
            <li class="caution-box">
                <h3 class="sub-title">${x}</h3>
                <div class="cont">${caution_data[x]}</div>
            </li>
        `;
    }
    // console.log(hcode);
    // 코드 뿌리기
    cautionOl.innerHTML = hcode;
    /* 화면이 로드 된 후 brand-span 순차적으로 떨어지기 */
    // 비동기 처리구현
    setTimeout(() => {
        // right-box span 다 떨어지면 left-box 떨어지기
        // transform = translateY(0);
        // 1. 대상선정
        // 1-1. 변경대상 : .top-title span
        const moveSpan = domFn.qsa('.top-title span');
        let i = 0;
        for(i = 0; i < moveSpan.length; i++){
            moveSpan[i].style.transform = 'translateY(0)';
            moveSpan[i].style.transitionDelay = i*DELAY_TIME + 's';
            moveSpan[i].style.opacity = 1;
        }
    }, 0);
    /* span태그 다 나온 후 배경과 이미지 이동하기*/
    setTimeout(()=>{
        // 1. 대상선정
        // 1-1. 변경대상 : .background-box
        const bgBox = domFn.qs('.background-box');

        // 2. 변경내용
        bgBox.style.transform = 'translateX(0)';
        bgBox.style.transitionDelay= DELAY_TIME*7 + 's';
    }, 0);
    /* 배경박스 나오고 글자 올라오기, 그림 움직이기 */
    setTimeout(()=>{
        // 1. 대상선정 : aside
        const infoAside = domFn.qs('.info-box aside');
        // 2. 변경내용 : 투명도 조절 1로
        infoAside.style.opacity = '1';
    }, 7500);
    /* 그림 움직이기 */ 
    setTimeout(()=>{
        // 1. 대상선정 : 재료박스 .intro-grad
        const gradBox = domFn.qs('.intro-grad');
        // 2. 변경내용 
        // 2-1. 위치이동(1회성)
        gradBox.style.transform = 'translateX(0)';
        // 2-2. li 안쪽에서 계속 흐르기
        
    }, 8000);

    // 원리 : ul을 이동, li의 2번째와 ul왼쪽이 만나면 
    // 잘라붙이기
    // 대상선정 : 
    // 움직일 대상 .grad-list>ul이 왼쪽으로 움직임
    // appendClide 사용할 예정
    // 1. 대상 : .grad-list>ul
    let listUl = domFn.qs('.intro-grad');
    // console.log(listUl);
    // 2. 이벤트 선정 ( 시간에 따른 이벤트 )
    // setTimeout(()=>{
        // const myFn = ()=> setInterval(scrollGrad, 3000);

        // setTimeout(myFn,9000);
    // },8000);


    // let sldNum = 0;
    // // listUl.style.transition='.02s linear';

    // // 재료이미지 자동스크롤 함수
    // function scrollGrad(){
    //     sldNum--;
    //     listUl.style.left = sldNum+'px';
    //     // 1. 트랜지션 주기
    //     // -------
    //     if(sldNum==-450) {
    //         let newli = listUl.querySelectorAll('li');
    //         listUl.appendChild(newli[0]);
    //         listUl.style.left = '0';
    //         sldNum = 0;
    //     }
    //     console.log(sldNum);
    //     setTimeout(scrollGrad, 20);
    // } ////////scrollGrad///////////

    // setTimeout(scrollGrad,9000);

    //////////////////////////////////////////////////////
    ////////////////주문절차 on 넣고빼기 //////////////////
    // 주문절차 클릭 시 .process와 .bullet-box li에 on 넣기
    // 다른 목록 클릭 시 on 없애기
    // 화면이 나가면 on 없애기
    /////////////////////////////////////////////////////
    
    // 1. 대상선정
    // 1-1. 변경대상 : .process , .bullet-box li
    const process = domFn.qsa('.process');
    const bullet = domFn.qsa('.bullet-box li');
    // console.log(process, bullet);
    // 2. 이벤트 선정
    // 2-1. 클릭이벤트 모든 대상을 돌면서 넣어야함
    process.forEach((ele)=>{
        domFn.addEvt(ele,'click',inputOn);
    });
    bullet.forEach((ele)=>{
        domFn.addEvt(ele,'click',inputOn);
    });
    
    // 2-2. 스크롤이벤트 스크롤이 벗어나면 모든 대상에 on제거
    domFn.addEvt(window,'scroll',leaveOutOn);

    // 3. 함수만들기
    // 3-1. on넣기 함수
    function inputOn(){
        // 인덱스 받아오기
        let idx = indexNum(this);
        console.log(idx);
        if(this.classList.contains('on')){
            // on이 있는 대상 누른경우 outOn()실행
            outOn();
        }else{
            outOn();
            // on이 없는 대상 on 주기
            bullet[idx].classList.add('on');
            process[idx].classList.add('on');
        }
    } ///////////inputOn///////////////
    // 3-2. on빼기 함수
    function outOn(){
        process.forEach(ele=>{
            ele.classList.remove('on');
        });
        bullet.forEach(ele=>{
            ele.classList.remove('on');
        }); 
    } ///////////outOn//////////////
    // 3-3. 순번검사
    function indexNum(child){
        let papaNode = child.parentElement;
        console.log(domFn.qsaEl(papaNode,'li'));
        // 순번검사용 n
        let n = 0;
        for(let x of domFn.qsaEl(papaNode,'li')){
            if(x == child){
                // console.log('들어왔나?',n);
                return n;
            }else {
                // console.log('실팬가?',n);
                n++;
            }
        }
    } /////////순번검사 indexNum//////////////
    // 3-4. 위치 확인해서 on제거하기 함수
    const winH = window.innerHeight;
    function leaveOutOn(){ //추후에 확인할 요소값 받기
        // console.log('요소1 바운딩값:',요소.getBoundingClientRect().top);
        // 1. 확인 할 요소 선정
        // .intro-process 위치를 지나가면 모든 요소에 on을 제거한다 (608)
        let processInfo = domFn.qs('.intro-process');
        // 2. 요소의 높이 값 읽기
        let eleH = processInfo.clientHeight;
        // 상단메뉴 크기 제외 ( 높이값 - 메뉴크기 )
        // 해당값이 getBoundingClientRect()의 음수값과 같으면 제외
        // 3. 요소의 바운딩 값
        let eleB = processInfo.getBoundingClientRect().top;
        // 윈도우 높이와 바운딩 높이가 동일하면 해당 요소의 위치가 시작
        // -(요소 높이 - 상단높이)가 바운딩 값과 일치하면 종료

        // 시작지점 부터 줄어들어서 종료시점에는 음수임
        // 시작구역 : eleB <= winH
        // 종료구역 : eleB > -(eleH - 100px) 
        let endPoint = -(eleH - 100);
        // console.log(endPoint);
        if(eleB>winH || eleB<endPoint){
            // console.log(eleB,eleH,winH);
            outOn();
        }
    }

    ////////////////////////////////////////////
    /////////////스크롤 등장 액션////////////////
    //기준값인 화면높이에서 on 넣기 /////////////
    ///////////////////////////////////////////
    // 1. 대상선정
    // 1-1. 이벤트 대상 : .caution-box
    const cautions = domFn.qsa('.caution-box');
    // 1-2. 기준값 : 화면의 5/6 위치에서 나오기
    const CRITERIA = (winH/6) * 5;
    // 2. 이벤트 설정
    domFn.addEvt(window,"scroll", showIt);
    // 3. 함수만들기
    // 3-1. 요소의 바운딩 위치값에서 on 넣기 함수 showIt
    // 요소 돌기 > 위치값 검사 > on넣기 > on 빼기
    function showIt(){
        for (let x of cautions) {
            addOn(x);
        } //////// for of ////////////////
    } //////////showIt함수/////////////////
    // 3-2. on 넣고 빼기 함수
    function addOn(ele){
        let boundingTop = ele.getBoundingClientRect().top;
        // 기준값보다 작으면 나오기 크면 돌아가기
        if (boundingTop < CRITERIA) ele.classList.add("on");
        // 기준값보다 클때 돌아가기
        else ele.classList.remove("on");
    } ////////// addOn함수/////////////
}///////////로드구역/////////////