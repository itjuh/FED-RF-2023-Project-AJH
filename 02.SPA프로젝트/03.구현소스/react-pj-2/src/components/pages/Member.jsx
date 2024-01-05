// 레오폴드 회원가입 jsx
import { useState } from "react";
import "../../css/member.css";
import { Link, useNavigate } from "react-router-dom";
import { link } from "../data/link";
import { useContext } from "react";
import { LeoCon } from "../modules/LeopoldContext";

export function Member() {
  const initData = () => {
    if (localStorage.getItem("member") === null) {
      let sample = [{
        idx: 0,
        uid: "",
        pwd: "sample11!!",
        unm: "sampledata",
        eml: "jh.2144.9679@gmail.com",
      }];
      localStorage.setItem("member",JSON.stringify(sample));
    }
  }; ////////// initData() ////////////////
  // 컨텍스트
  const myCon = useContext(LeoCon);
  // 링크 데이터
  let linkData = link;
   // 페이지 이동용
  const nav = useNavigate();
  const goNav = () => {
    linkData = link[2];
     nav(linkData.link);
     // 타이틀 변경
     myCon.chgTit(linkData.tit);
  };
  
  // [1] 상태관리변수 //////////////////////////
  // 1. 아이디 변수
  const [userId, setUserId] = useState("");
  // 2. 비밀번호 변수
  const [pwd, setPwd] = useState("");
  // 3. 비밀번호 확인 변수
  const [chkPwd, setChkPwd] = useState("");
  // 4. 이름 변수
  const [userName, setUserName] = useState("");
  // 5. 이메일 변수
  const [email, setEmail] = useState("");

  // [2] 에러상태관리 변수 //////////////////////////////
  // -> 에러 상태값 초기값은 에러아님
  // 1. 아이디 변수
  const [userIdError, setUserIdError] = useState(false);
  // 2. 비밀번호 변수
  const [pwdError, setPwdError] = useState(false);
  // 3. 비밀번호 확인 변수
  const [chkPwdError, setChkPwdError] = useState(false);
  // 4. 이름 변수
  const [userNameError, setUserNameError] = useState(false);
  // 5. 이메일 변수
  const [emailError, setEmailError] = useState(false);

  // [ 아이디 관련 메세지 프리셋 ]
  const msgId = ["User ID must contain a minimum of 5 characters", "This ID is already in use!", "That's a great ID!"];
  // [ 기타 메세지 프리셋 ]
  const msgEtc = {
    // 비밀번호
    pwd: "5 to 15 digits in the form of special characters, characters, and numbers",
    // 비밀번호 확인
    chkPwd: "Password verification does not match",
    // 필수입력)
    req: "This is a required entry",
    // 이메일
    email: "Please enter a valid email format",
  }; ///////// msgEtc
  // [3] 에러메세지 상태관리 변수 /////////////////////
  const [idMsg, setIdMsg] = useState(msgId[0]);

  ////////////////////////////////////////////////////
  //[ 유효성 검사 함수 ] //////////////////////////////
  // 1. ID 유효성 검사
  const changeUserId = (e) => {
    /**아이디 유효성 검사 정규식 :
     * 영문자로 시작하는 6~20글자 영문자/숫자
     */
    const valid = /^[a-z]{1}[a-z0-9]{4,19}$/g;

    if (valid.test(e.target.value)) {
      // 검사통과
      // 1. 사용중인 아이디 검사(로컬스 셋팅 후 추가)
      // 로컬스토리지 체크함수 호출(없으면 생성)
      initData();
      // 1) 로컬스토리지 변수 할당
      let data = localStorage.getItem("member");
      // 2) 로컬스토리지 객체 변환
      data = JSON.parse(data);
      // 3) 기존 아이디가 있으면 상태값 false로 업데이트
      let isOk = true;
      // 4) 검사 시작
      data.forEach((v) => {
        // 기존아이디와 같은 경우 찾기
        if (v.uid === e.target.value) {
          // 메세지 변경
          setIdMsg(msgId[1]);
          // 아이디 에러 상태값 업데이트
          setUserIdError(true);
          // 존재여부
          isOk = false;
        }
      }); /////// forEach ////////
      // 5) 기존 아이디 없는 경우
      if (isOk) {
        // 메세지 변경
        setIdMsg(msgId[0]);
        // 6)최종 결과 반영하기
        setUserIdError(false);
      }
    } else {
      // 에러상태
      setUserIdError(true);
    } /////// if else
    // 4) 실제 userId 상태변수 값이 업데이트 되어야만 화면에 출력 됨
    setUserId(e.target.value);
  }; /////// changeUserId 함수 //////////
  // 2. PW 유효성 검사
  const changePwd = (e) => {
    /** 비밀번호 유효성 검사 정규식
     * 특수문자,문자,숫자포함 형태의 5~15자리
     */
    const valid = /^.*(?=^.{5,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;

    if (valid.test(e.target.value)) setPwdError(false);
    else setPwdError(true);
    // 입력 값 반영하기
    setPwd(e.target.value);
  }; /////// changePwd 함수 //////////
  // 3. PW확인 유효성 검사
  const changeChkPwd = (e) => {
    /**
     * 비밀번호 입력 내용과 일치여부 확인
     */
    if (pwd === e.target.value) setChkPwdError(false);
    else setChkPwdError(true);
    // 입력 값 반영하기
    setChkPwd(e.target.value);
  }; /////// changeChkPwd 함수 //////////
  // 4. 사용자이름 유효성 검사
  const changeUserName = (e) => {
    /** 이름 유효성 검사 정규식
     * 문자, 한글포함 형태의 2~15자리
     */
    const valid = /^([a-zA-Z]{2,15}|[가-힣]{2,15})$/;

    if (valid.test(e.target.value)) {
      // 검사통과
      setUserNameError(false);
    } else setUserNameError(true);
    // 3) 입력 값 반영하기
    setUserName(e.target.value);
  }; /////// changeUserName 함수 //////////
  // 5. 이메일 유효성 검사
  const changeEmail = (e) => {
    // 1) 유효성 검사
    const vaild = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;
    // 2) 에러상태값 변경
    if (vaild.test(e.target.value)) setEmailError(false);
    else setEmailError(true);
    // 3) 입력 값 반영하기
    setEmail(e.target.value);
  }; /////// changeEmail 함수 //////////
  // 6. 전체 유효성 검사 체크 함수 ///////////////
  const totalValid = () => {
    // 1) 모든 입력창 확인 후 상태변수 전환 -> 입력 전 상태는 false
    if (!userId) setUserIdError(true);
    if (!pwd) setPwdError(true);
    if (!chkPwd) setChkPwdError(true);
    if (!userName) setUserNameError(true);
    if (!email) setEmailError(true);
    // 2) 전체 통과 시 true
    // 통과조건 -> 빈값아님 && 에러변수 false
    if (
      userId &&
      pwd &&
      chkPwd &&
      userName &&
      email &&
      !userIdError &&
      !pwdError &&
      !chkPwdError &&
      !userNameError &&
      !emailError
    )
      return true;
    else return false;
  }; /////////// totalValid 함수 ///////////////
  // 7. submit 기능함수
  const onSubmit = (e) => {
    // 1) submit 기본이동 막기
    e.preventDefault();
    // 2. 유효성 검사 전체 통과 시
    if (totalValid()) {
      // 통과
      // 회원가입 정보를 로컬스토리지에 저장하기

      // 로컬스토리지 체크함수 호출
      initData();
      // 1. 로컬스토리지 변수 할당
      let data = localStorage.getItem("member");
      // 2. 로컬스토리지 객체 변환
      data = JSON.parse(data);
      // 마지막 데이터 idx+1
      let lastData = data[data.length - 1];
      lastData = lastData.idx;
      // 3. 새로운 데이터 구성하기
      let newData = {
        idx: Number(lastData) + 1,
        uid: userId,
        pwd: pwd,
        unm: userName,
        eml: email,
      };
      // 4. 데이터 추가하기 : 배열에 데이터 추가하기 push()
      data.push(newData);
      localStorage.setItem("member", JSON.stringify(data));
      // 5. 로그인 페이지로 이동(라우터 이동)
      goNav();
    } else {
      // 불통과
      alert("please fill the forms");
    }
  }; ///////// onSubmit 함수 //////////////

  return (
    <main className="main in-box row-12 row-s-13">
      {/* 1. 회원가입 박스 */}
      <div className="part-box col-16 row-12 row-s-13">
        <div className="member-area">
          {/* 1-1. 상단 타이틀 */}
          <h2>
            LEOPOLD
            <br />
            Join Us
          </h2>
          <form action="process.php" method="post">
            <ul>
              <li>
                {/* 1-2. 아이디 박스 */}
                <label className="label-member">ID</label>
                <input
                  className="input-member"
                  type="text"
                  maxLength="20"
                  placeholder="Please enter your ID"
                  value={userId}
                  onChange={changeUserId}
                />
                {
                  // 에러일 경우 메세지 출력
                  userIdError && (
                    <div className="msg">
                      <small style={{ color: "red", fontSize: "10px" }}>{idMsg}</small>
                    </div>
                  )
                }
                {
                  // 에러 아닐 경우 메세지 출력
                  // 조건 후가 : userId가 입력 전일때 안보임!
                  !userIdError && userId && (
                    <div className="msg">
                      <small style={{ color: "green", fontSize: "10px" }}>{msgId[2]}</small>
                    </div>
                  )
                }
              </li>
              <li>
                {/* 1-3. 비밀번호 박스 */}
                <label className="label-member">Password</label>
                <input
                  className="input-member"
                  type="password"
                  maxLength="20"
                  placeholder="Please enter your Password"
                  value={pwd}
                  onChange={changePwd}
                />
                {
                  // 에러일 경우 메세지 출력
                  pwdError && (
                    <div className="msg">
                      <small style={{ color: "red", fontSize: "10px" }}>{msgEtc.pwd}</small>
                    </div>
                  )
                }
              </li>
              <li>
                {/* 1-4. 비밀번호 확인 */}
                <label className="label-member">Confirm Password</label>
                <input
                  className="input-member"
                  type="password"
                  maxLength="20"
                  placeholder="Please enter your Confirm Password"
                  value={chkPwd}
                  onChange={changeChkPwd}
                />
                {
                  // 에러일 경우 메세지 출력
                  chkPwdError && (
                    <div className="msg">
                      <small style={{ color: "red", fontSize: "10px" }}>{msgEtc.chkPwd}</small>
                    </div>
                  )
                }
              </li>
              <li>
                {/* 1-5. 이름 */}
                <label className="label-member">User Name</label>
                <input
                  className="input-member"
                  type="text"
                  maxLength="20"
                  placeholder="Please enter your Name"
                  value={userName}
                  onChange={changeUserName}
                />
                {
                  // 에러일 경우 메세지 출력
                  userNameError && (
                    <div className="msg">
                      <small style={{ color: "red", fontSize: "10px" }}>{msgEtc.req}</small>
                    </div>
                  )
                }
              </li>
              <li>
                {/* 1-6. 이메일 */}
                <label className="label-member">Email</label>
                <input
                  className="input-member"
                  type="text"
                  maxLength="50"
                  placeholder="Please enter your Email"
                  value={email}
                  onChange={changeEmail}
                />
                {
                  // 에러일 경우 메세지 출력
                  emailError && (
                    <div className="msg">
                      <small style={{ color: "red", fontSize: "10px" }}>{msgEtc.email}</small>
                    </div>
                  )
                }
              </li>
              <li>
                {/* 1-7. 로그인링크 */}
                Are you already a member?
                <Link to="/login"> Log In</Link>
              </li>
              <li>
                {/* 1-8. 버튼 */}
                <button className="submit-member" onClick={onSubmit}>
                  SUBMIT
                </button>
              </li>
            </ul>
          </form>
        </div>
      </div>
      <div className="part-box col-16 row-1"></div>
    </main>
  );
}
