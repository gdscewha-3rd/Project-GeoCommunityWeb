"use strict";(self.webpackChunkalecture=self.webpackChunkalecture||[]).push([[319],{6319:(e,a,t)=>{t.r(a),t.d(a,{default:()=>p});var l=t(8678),n=t(7294),r=t(9669),c=t.n(r),s=t(3046),u=t(5977),m=t(3727),o=t(5767),i=t(3564);const p=()=>{const{data:e,error:a,revalidate:t}=(0,o.ZP)("http://localhost:3095/api/users",i.Z),[r,p]=(0,l.Z)(""),[d,E]=(0,l.Z)(""),[h,v]=(0,n.useState)(""),[k,g]=(0,n.useState)(""),[w,b]=(0,n.useState)(!1),[C,_]=(0,n.useState)(""),[I,S]=(0,n.useState)(!1),f=(0,n.useCallback)((e=>{v(e.target.value),b(e.target.value!==k)}),[k]),j=(0,n.useCallback)((e=>{g(e.target.value),b(e.target.value!==h)}),[h]),y=(0,n.useCallback)((e=>{e.preventDefault(),w||(console.log("서버로 회원가입하기"),_(""),S(!1),c().post("http://localhost:3095/api/users",{email:r,nickname:d,password:h}).then((e=>{console.log(e),S(!0)})).catch((e=>{console.log(e.response),_(e.response.data)})).finally((()=>{})))}),[r,d,h,k,w]);return e?n.createElement(u.l_,{to:"/workspace/channel"}):n.createElement("div",{id:"container"},n.createElement(s.h4,null,"Sleact"),n.createElement(s.l0,{onSubmit:y},n.createElement(s.__,{id:"email-label"},n.createElement("span",null,"이메일 주소"),n.createElement("div",null,n.createElement(s.II,{type:"email",id:"email",name:"email",value:r,onChange:p}))),n.createElement(s.__,{id:"nickname-label"},n.createElement("span",null,"닉네임"),n.createElement("div",null,n.createElement(s.II,{type:"text",id:"nickname",name:"nickname",value:d,onChange:E}))),n.createElement(s.__,{id:"password-label"},n.createElement("span",null,"비밀번호"),n.createElement("div",null,n.createElement(s.II,{type:"password",id:"password",name:"password",value:h,onChange:f}))),n.createElement(s.__,{id:"password-check-label"},n.createElement("span",null,"비밀번호 확인"),n.createElement("div",null,n.createElement(s.II,{type:"password",id:"password-check",name:"password-check",value:k,onChange:j})),w&&n.createElement(s.jj,null,"비밀번호가 일치하지 않습니다."),!d&&n.createElement(s.jj,null,"닉네임을 입력해주세요."),C&&n.createElement(s.jj,null,C),I&&n.createElement(s.fB,null,"회원가입되었습니다! 로그인해주세요.")),n.createElement(s.zx,{type:"submit"},"회원가입")),n.createElement(s.Ji,null,"이미 회원이신가요? ",n.createElement(m.rU,{to:"/login"},"로그인 하러가기")))}}}]);