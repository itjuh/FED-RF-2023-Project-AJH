// 레오폴드 로그인 페이지
import { useContext, useRef, useState } from "react";
import "../../css/login.css";
import { Link } from "react-router-dom";
import { LeoCon } from "../modules/LeopoldContext";
import $ from "jquery";
import { msgPopupData } from "../data/popupData";

export function Login() {
  // validation check 0-fail 1-pass
  // 아이디 체크 변수
  const okId = useRef(0);
  // 비밀번호 체크 변수
  const okPw = useRef(0);
  // 비밀번호 체크 변수

  // 컨텍스트
  const myCon = useContext(LeoCon);

  const popup = (key,txt)=>{
    $(".message-tit span").text(msgPopupData[key].span);
    if(txt!=='') $(".message-cont").text(msgPopupData[key].cont+txt);
    else $(".message-cont").text(msgPopupData[key].cont);
    $(".message-box").fadeIn(30);
    let btns = $(".message-box button");
    btns.click(function () {
      $(".message-box").fadeOut(30);
      // pass 페이지 이동
      if(msgPopupData[key].link){
        myCon.goPage(msgPopupData[key].link, "");
      }
    });
  }

  // 유효성 검사
  const validCheckIdPW = ()=>{
    let vaildOk = true;
    
    // 유효성 정규식
    const idValid = /^[a-z]{1}[a-z0-9]{4,19}$/g;
    const pWValid = /^.*(?=^.{5,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
    
    // 값 가져오기
    let inId = $(".log-id").val();
    let inPw = $(".log-pw").val();
    
    // 값이 없으면 빈값넣기
    if (inId.trim() == null || inPw.trim() == null) {
      inId = "";
      inPw = "";
    }

    if (idValid.test(inId)) {
      okId.current = 1;
    } else {
      okId.current = 0;
      vaildOk = false;
    } ///////// id 유효성 /////
    if (pWValid.test(inPw)) {
      okPw.current = 1;
    } else {
      okPw.current = 0;
      vaildOk = false;
    } ///////// pw 유효성 /////
    return vaildOk;    
  }; ///////// validCheckIdPW /////////

  const onSubmit = (e) => {
    e.preventDefault();
    let inId = $(".log-id").val();
    let inPw = $(".log-pw").val();
    if (validCheckIdPW()) {
      let data = localStorage.getItem("member");
      data = JSON.parse(data);
      // 데이터 일치 조회
      data.some((v) => {
        if (v.uid === inId) {
          if (v.pwd === inPw) {
            sessionStorage.setItem("loginMem", JSON.stringify([v.uid]));
            popup('loginPass',v.uid);
            myCon.setLoginSts(sessionStorage.getItem("loginMem"));
            return;
          }
        }
        popup('loginFailNotSame','');
        return;
      });
    }else if (localStorage.getItem("member") === null || JSON.parse(localStorage.getItem("member")).length === 0) {
      popup('loginFailNoData','');
      return;
    }
    else if(!validCheckIdPW()) {
      popup('loginFailVaild','');
      return;
    }else{
      popup('loginFailNotSame','');
      return;
    } //////// if-else local exist //////////
  }; ///////// onSubmit 함수 //////////////
  return (
    <main className="main in-box row-12 row-s-13">
      {/* 1. 로그인 박스 */}
      <div className="part-box col-16 row-12 row-s-13">
        <div className="login-area">
          {/* 1-1. 상단 타이틀 */}
          <h2>
            LEOPOLD
            <br />
            Log-In
          </h2>
          <form action="process.php" method="post">
            <ul>
              <li>
                {/* 1-2. 아이디 박스 */}
                <label className="label-login">ID</label>
                <input className="input-login log-id" type="text" maxLength="20" placeholder="Please enter your ID" />
              </li>
              <li>
                {/* 1-3. 비밀번호 박스 */}
                <label className="label-login">Password</label>
                <input
                  className="input-login log-pw"
                  type="password"
                  maxLength="20"
                  placeholder="Please enter your Password"
                />
              </li>
              <li>
                {/* 1-4. 아이디 분실 */}
                <Link to="/find"> Did you forget id/password?</Link>
              </li>
              <li>
                {/* 1-5. 회원가입 */}
                <Link to="/member"> Don't have an account?</Link>
              </li>
              <li>
                {/* 1-7. 로그인 버튼 */}
                <button className="submit-login" onClick={onSubmit}>
                  LOGIN
                </button>
              </li>
            </ul>
          </form>
        </div>
      </div>
      <div className="message-box">
        <div className="message-wrap">
          <div className="message-tit">
            <span></span>
            <button>×</button>
          </div>
          <div className="message-cont" style={{ lineHeight: "2" }}></div>
          <div className="message-btns">
            <button>Confirm</button>
          </div>
        </div>
      </div>
    </main>
  );
}
