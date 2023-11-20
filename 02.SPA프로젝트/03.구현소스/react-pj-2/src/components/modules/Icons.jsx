// 폰트어썸 아이콘 사용 컴포넌트
import React from "react";
import { faUser, faMagnifyingGlass, faCartShopping, faCheck, faKeyboard, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// 회원 아이콘
function UserCon(){
    return <FontAwesomeIcon icon={faUser} />
};
// 검색 아이톤
function GlassCon(){
    return <FontAwesomeIcon icon={faMagnifyingGlass} />
};
// 장바구니 아이콘
function CartCon(){
    return <FontAwesomeIcon icon={faCartShopping} />  
};
// 체크 아이콘
function CheckCon(){
    return <FontAwesomeIcon icon={faCheck} />
};
// 키보드 아이콘
function KeyCon(){
    return <FontAwesomeIcon icon={faKeyboard} />
};
// ^ 화살표 아이콘
function UpArrowCon(){
    return <FontAwesomeIcon icon={faChevronUp} />
}
export {UserCon, GlassCon, CartCon, CheckCon, UpArrowCon, KeyCon};
