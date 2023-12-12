// index.js는 public/index.html 페이지에 적용되는 컴포넌트다! - root컴포넌트
// 레오폴드 공통 css
import './css/index.css'; 
// css 덮어쓰지 않도록 최상단 불러오기
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { Main } from "./components/pages/Main";
import { SubBoard } from './components/pages/SubBoard';
import { Switch } from './components/pages/Switch';
import { SubSwtich } from './components/pages/SubSwitch';
import { Menu } from './components/pages/Menu';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 중요!! 레이아웃 컴포넌트를 루트로 설정!! */}
        <Route path="/" element={<Layout />}>
          {/* 하위 라우터 세팅 */}
          <Route index element={<Main />} />
          {/* 키보드 상세페이지 */}
          <Route path='subboard' element={<SubBoard />} />
          {/* 스위치 페이지 */}
          <Route path='switch' element={<Switch />} />
          {/* 스위치 상세페이지 */}
          <Route path='subswitch' element={<SubSwtich />} />
          {/* 메뉴 페이지 */}
          <Route path='menu' element={<Menu />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
} /////////App /////////////

// 컴포넌트 출력 //////////////////
// root객체 ReactDOM.createRoot() -> root.render(</>)
const root = ReactDOM.createRoot(document.querySelector("#root"));
root.render(<App />);
