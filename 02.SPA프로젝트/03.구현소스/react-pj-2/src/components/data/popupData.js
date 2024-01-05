// msg-box데이터
export const msgPopupData = {
  loginPass: {
    span: "😀Success",
    cont: "You are logged in. Go to the main page. Welcome ",
    link: "main",
  },
  loginFailNotSame: {
    span: "😢Failed - not same.",
    cont: "You are checked your information.",
    link: false,
  },
  loginFailVaild: {
    span: "😢Failed - vaildation",
    cont: "You are checked your information.",
    link: false,
  },
  loginFailNoData: {
    span: "😢Failed - no data.",
    cont: "No information found.",
    link: false,
  },
  findIdPass: {
    span: "😀Success",
    cont: "Your id is ",
    link: 'LOGIN',
  },
  findFail: {
    span: "😢Failed",
    cont: "No matching information found.",
    link: false,
  },
  findPwPass: {
    span: "😀Success",
    cont: "We reset your password. Please login with the password written to the next - a12345678!!",
    link: 'LOGIN',
  },
};
