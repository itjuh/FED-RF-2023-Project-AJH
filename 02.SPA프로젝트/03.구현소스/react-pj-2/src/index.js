// index.js는 public/index.html 페이지에 적용되는 컴포넌트다! - root컴포넌트
// 레오폴드 공통 css
import './css/index.css'; 
// css 덮어쓰지 않도록 최상단 불러오기
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, HashRouter } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { Main } from "./components/pages/Main";
import { SubBoard } from './components/pages/SubBoard';
import { Switch } from './components/pages/Switch';
import { SubSwtich } from './components/pages/SubSwitch';
import { Menu } from './components/pages/Menu';
import { Member } from './components/pages/Member';
import { Login } from './components/pages/Login';
import { Wishlist } from './components/pages/Wishlist';
import { CorpInfo } from './components/pages/CorpInfo';
import { FindMember } from './components/pages/FindMember';
import { TestPage } from './components/pages/Test';

export default function App() {
  return (
    <HashRouter>
      <Routes>
        {/* 중요!! 레이아웃 컴포넌트를 루트로 설정!! */}
        <Route path="/" element={<Layout />}>
          {/* 하위 라우터 세팅 */}
          <Route index element={<Main />} />
          <Route path='main'  element={<Main />} />
          {/* 키보드 상세페이지 */}
          <Route path='subboard' element={<SubBoard />} />
          {/* 스위치 페이지 */}
          <Route path='switch' element={<Switch />} />
          {/* 스위치 상세페이지 */}
          <Route path='subswitch' element={<SubSwtich />} />
          {/* 회원가입 페이지 */}
          <Route path='member' element={<Member />} />
          {/* 로그인 페이지 */}
          <Route path='login' element={<Login />} />
          {/* 아이디/비밀번호 찾기 페이지 */}
          <Route path='find' element={<FindMember />} />
          {/* 장바구니 페이지 */}
          <Route path='wishlist' element={<Wishlist />} />
          {/* 회사정보 페이지 */}
          <Route path='contact' element={<CorpInfo/>} />
          {/* 테스트 페이지 */}
          <Route path='testpage' element={<TestPage/>} />
        </Route>
      </Routes>
    </HashRouter>
  );
} /////////App /////////////

// 컴포넌트 출력 //////////////////
// root객체 ReactDOM.createRoot() -> root.render(</>)
const root = ReactDOM.createRoot(document.querySelector("#root"));
root.render(<App />);
