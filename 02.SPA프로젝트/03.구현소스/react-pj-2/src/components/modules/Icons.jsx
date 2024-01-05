// 폰트어썸 아이콘 사용 컴포넌트
import React from "react";
import {
  faUser,
  faMagnifyingGlass,
  faCartShopping,
  faCheck,
  faEnvelope,
  faLocationDot,
  faClock,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// 회원 아이콘
function UserCon() {
  return <FontAwesomeIcon icon={faUser} />;
}
// 검색 아이톤
function GlassCon() {
  return <FontAwesomeIcon icon={faMagnifyingGlass} />;
}
// 장바구니 아이콘
function CartCon() {
  return <FontAwesomeIcon icon={faCartShopping} />;
}
// 체크 아이콘
function CheckCon() {
  return <FontAwesomeIcon icon={faCheck} />;
}
// 이메일 아이콘
function MailCon() {
  return <FontAwesomeIcon icon={faEnvelope} />;
}
// 전화 아이콘
function CallCon() {
  return <FontAwesomeIcon icon={faPhone} />;
}
// 위치 아이콘
function LocaCon() {
  return <FontAwesomeIcon icon={faLocationDot} />;
}
// 시계 아이콘
function ClockCon() {
  return <FontAwesomeIcon icon={faClock} />;
}
export { UserCon, GlassCon, CartCon, CheckCon, MailCon, CallCon, LocaCon, ClockCon };
