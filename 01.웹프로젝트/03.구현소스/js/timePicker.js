const timePickerSetting = () => {
  // const moveDistance = document.querySelectorAll(".time-slider-wraper li")[0].getBoundingClientRect().height;
  const timeList = document.querySelectorAll(".time-slider-wraper li");
  const moveDistance = timeList[0].getBoundingClientRect().height;
  const ampmList = document.querySelector(".am-pm-slider ol");
  const hourList = document.querySelector(".hour-slider ol");
  const minList = document.querySelector(".minute-slider ol");

  const arrowBtns = document.querySelectorAll(".arrow-button");

  let ampmState = "am";
  let ampmInitPos = firstListPosition(ampmList);
  let hourInitPos = firstListPosition(hourList);
  let minInitPos = firstListPosition(minList);
  console.log(timeList[0].getBoundingClientRect().height, "ampmInitPos", ampmInitPos, "hourInitPos", hourInitPos, "minInitPos", minInitPos);

  let ampmCurrentPos = moveDistance * 2;
  // console.log("am/pm위치",ampmPos,"hour크기",hourPos,"min위치",minPos,'initpos',initPos);

  // 데이터 뿌리기 전에 동적구현 데이터
  function firstListPosition(ol) {
    // 데이터 길이에 따라서 동적으로 위치 구현
    let listLenght = ol.querySelectorAll("li").length;
    let firstListPosition = moveDistance * 2 - Math.floor((listLenght - 1) / 2) * moveDistance;
    console.log("리스트길이 초기값", listLenght, firstListPosition, moveDistance);
    return firstListPosition;
  }

  function initPosSetting() {
    // 초기 포지션
    ampmList.style.top = ampmInitPos + "px";
    hourList.style.top = hourInitPos + "px";
    minList.style.top = minInitPos + "px";
    // 초기 값 설정
    noTransitionMove(hourList.parentNode.parentNode, 6);
    noTransitionMove(minList.parentNode.parentNode, 1);
  }

  function ampmCurrentPosSetting(ampmState) {
    ampmCurrentPos = ampmState == "am" ? moveDistance * 2 : moveDistance * 1;
  }
  function setTransition(target, boolean) {
    if (boolean) target.style.transition = ".2s ease-in-out";
    else target.style.transition = "none";
  }

  // 버튼 클릭 시 이동
  arrowBtns.forEach((item) => {
    item.addEventListener("click", function go() {
      if (this.dataset.type == "am-pm") {
        ampmMove(isUp(this));
        console.log(ampmInitPos, ampmCurrentPos);
      } else {
        timeMove(this.parentNode, isUp(this));
      }
      timeRead(readData());
    });
  });

  // 초기위치 설정
  initPosSetting();

  // 트랜지션 설정(초기설정 시 트랜지션 없애기)
  setTimeout(() => {
    setTransition(ampmList, true);
    setTransition(hourList, true);
    setTransition(minList, true);
    timeList.forEach(ele=>ele.style.transition = ".3s"); // 글자색상
  }, 250);
  // 초기 시간 설정
  timeRead(readData());

  function isUp(button) {
    if (button.classList.contains("up-arrow")) return "up";
    else if (button.classList.contains("down-arrow")) return "down";
  }

  // 반복클릭 금지
  let clicking = false;
  function defendClick() {
    clicking = true;
    setTimeout(() => (clicking = false), 200);
  }

  function ampmMove(direction) {
    if (clicking) return;
    defendClick();
    // 1. 버튼 클릭 시 ol위치를 move만큼 이동
    // 2. 탭으로 이동 시 ol위치를 move만큼 이동
    // 3. 이동 후 pick-data의 값 변경
    setTransition(ampmList, true);
    if (direction == "up") {
      ampmState = "pm";
      ampmCurrentPosSetting(ampmState);
      ampmList.style.top = ampmCurrentPos + "px";
      ampmList.querySelectorAll("li")[0].dataset.pick = -1;
      ampmList.querySelectorAll("li")[1].dataset.pick = 0;
    } else {
      ampmState = "am";
      ampmCurrentPosSetting(ampmState);
      ampmList.style.top = ampmCurrentPos + "px";
      ampmList.querySelectorAll("li")[0].dataset.pick = 0;
      ampmList.querySelectorAll("li")[1].dataset.pick = 1;
    }
  }

  function timeMove(target, direction) {
    if (clicking) return;
    defendClick();
    // 1. 버튼 클릭 시 버튼을 구분하여 li를 잘라서 붙임
    // 2. 탭으로 이동 시 방향을 구분하여 li를 잘라서 붙임
    // 3. 이동 후 pick-data의 값을 변경
    let initPos = target.classList.contains("hour-slider") ? hourInitPos : minInitPos;
    target = target.querySelector("ol");
    let allList = target.querySelectorAll("li");
    let num = -Math.round(allList.length / 2) + 1;
    // console.log(target, direction, "타겟과 방향", "시작번호 : ", num);
    if (direction == "up") {
      // 이동
      setTransition(target, true);
      target.style.top = initPos - moveDistance + "px";
      // transition없애기 => 잘라붙이기
      setTimeout(() => {
        setTransition(target, false);
        target.appendChild(allList[0]);
        target.style.top = initPos + "px";
      }, 300);
      allList.forEach((li) => {
        li.dataset.pick = num - 1;
        num++;
      });
      allList[0].dataset.pick = num - 1; // num이 li를 다 돌아서 마지막 순번이 됨
    } else {
      // 이동
      setTransition(target, true);
      target.style.top = initPos + moveDistance + "px";
      // transition없애기 =>잘라붙이면서 위치초기화
      setTimeout(() => {
        setTransition(target, false);
        target.prepend(allList[allList.length - 1], allList[0]);
        target.style.top = initPos + "px";
      }, 300);
      allList.forEach((li) => {
        num++;
        li.dataset.pick = num;
      });
      allList[allList.length - 1].dataset.pick = -4;
    }
  }
  function noTransitionMove(target, repet) {
    let initPos = target.classList.contains("hour-slider") ? hourInitPos : minInitPos;
    target = target.querySelector("ol");
    let num;
    for (let i = 0; i < repet; i++) {
      let allList = target.querySelectorAll("li");
      // transition없애기 => 잘라붙이기
      target.appendChild(allList[0]);
      num = -Math.round(allList.length / 2) + 1;
      allList.forEach((li) => {
        li.dataset.pick = num - 1;
        num++;
      });
      allList[0].dataset.pick = num - 1 - repet; // num이 li를 다 돌아서 마지막 순번이 됨
    }
    // 이동
    target.style.top = initPos + "px";
  }

  function readData() {
    const ampm = ampmList.querySelector("[data-pick='0']").innerText;
    const hour = hourList.querySelector("[data-pick='0']").innerText;
    const min = minList.querySelector("[data-pick='0']").innerText;
    return ampm + " " + hour + " : " + min;
  }
  function timeRead(time) {
    // pickedView 에 세팅
    pickedView.innerText = time;
  }

  const timeSliderWraper = document.querySelectorAll(".time-slider-wraper ol");
  console.log("슬라이드랩퍼", timeSliderWraper);
  timeSliderWraper.forEach((item, idx) => {
    goDrag(item, idx);
  });
  let gapY = 0; // 위치이동 차이
  // 드래그 시 이동
  function goDrag(ele, idx) {
    let firstY;
    let limitgapY;
    let state = false;
    let init;
    const startDrag = () => {
      state = true;
    };
    const endDrag = () => {
      state = false;
    };
    const dragMove = (e) => {
      if (state) {
        setTransition(ele, false);
        gapY = firstY - e.clientY;
        ele.style.top = init - gapY + "px";
      }
    };
    const startSet = (e) => {
      firstY = e.clientY;
      init = idx == 0 ? ampmCurrentPos : idx == 1 ? hourInitPos : minInitPos; // top에 적용값
    };

    ele.addEventListener("mousedown", function (e) {
      startDrag();
      startSet(e);
    });
    ele.addEventListener("mouseup", function () {
      endDrag();
      gowhere(ele, idx);
    });
    ele.addEventListener("mousemove", dragMove);
    ele.addEventListener("mouseleave", endDrag);
  }

  // 방향 판별
  function gowhere(ele, idx) {
    let init = idx == 0 ? ampmCurrentPos : idx == 1 ? hourInitPos : minInitPos;
    let ref = init + 20;
    let targetPos = ele.offsetTop;
    let gap = targetPos - ref;
    // let targetPos = idx == 0 ? ele.offsetTop : ele.offsetTop - init; //기본위치 ampm 64 나머지는 20
    // console.log("gap", gap, "타겟위치:", targetPos, "초기값 init :", init, "기준 ref:", ref);
    if (gap > 12) {
      ele.parentNode.nextSibling.nextSibling.click();
    } else if (gap < -12) {
      ele.parentNode.previousSibling.previousSibling.click();
    } else {
      ele.style.top = init + "px";
      setTransition(ele, true);
    }
  }
}; /////////////////////////////////
//////// timerPickerSetting ////////

// 수집
const pickerBody = document.querySelector(".time-picker-body");
const pickedView = document.querySelector(".time-picker-view");

// 데이터 동적구현해서 리스트 출력
async function makeList() {
  let data = liMaker();
  let hour = `<button class="arrow-button up-arrow" aria-label="previous" data-type="hour"></button>
  <div class="time-slider-wraper">
    <ol>
      ${data[0]}
    </ol>
  </div>
  <button class="arrow-button down-arrow" aria-label="next" data-type="hour"></button>`;
  let minute = `<button class="arrow-button up-arrow" aria-label="previous" data-type="min"></button>
  <div class="time-slider-wraper">
    <ol>
    ${data[1]}
    </ol>
  </div>
  <button class="arrow-button down-arrow" aria-label="next" data-type="min"></button>`;

  pickerBody.querySelector(".hour-slider").innerHTML = hour;
  pickerBody.querySelector(".minute-slider").innerHTML = minute;
}

function liMaker() {
  const STARTHOUR = 9;
  const ENDHOUR = 19;
  const MINUTEGAP = 10;
  const hourCount = ENDHOUR - STARTHOUR + 1;
  // 보여지는 리스트가 5개이므로 드래그를 고려해서 개수를 두배로 수정함
  const minuteCount = (60 / MINUTEGAP) * 2;
  let startHourNum = -Math.round(hourCount / 2) + 1;
  let startMinuteNum = -Math.round(minuteCount / 2) + 1;

  const twoDigitHour = (num) => {
    if (num < 10) return "0" + num;
    else if (num > 12) return twoDigitHour(num - 12);
    else return num;
  };
  const isAm = (num) => {
    if (num <= 12) return "am";
    else return "pm";
  };
  const twoDigitMinute = (num) => {
    if (num < 10) return "0" + num;
    else return num;
  };

  let hourList = ``;
  let minuteList = ``;
  for (let i = STARTHOUR; i <= ENDHOUR; i++) {
    hourList += `<li data-pick="${startHourNum++}" data-type=${isAm(i)}>${twoDigitHour(i)}</li>`;
  }
  for (let j = 0; j < 2; j++) {
    for (let i = 0; i < minuteCount / 2; i++) {
      minuteList += `<li data-pick="${startMinuteNum++}">${twoDigitMinute(i * MINUTEGAP)}</li>`;
    }
  }
  return [hourList, minuteList];
}

function timePicker() {
  // 시간선택 만들기
  makeList();
  // 이벤트 세팅
  timePickerSetting();
}
export { timePicker };
