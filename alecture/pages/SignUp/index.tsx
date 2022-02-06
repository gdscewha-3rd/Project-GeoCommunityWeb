
import useInput from '@hooks/useInput';
import React, { useCallback, useState, VFC } from 'react';
import axios from 'axios';
import { Success, Form, Error, Label, Input, LinkContainer, Button, Header } from './styles';
import { Link, Redirect } from 'react-router-dom'; //리액트 라우터에서는 a태그 대신에 Link 태그를 사용하는 것이 더 바람직 
import useSWR from 'swr';
import fetcher from '@utils/fetcher';

const SignUp = () => {
    const {data, error, revalidate}=useSWR('http://localhost:3095/api/users', fetcher);
  const [email, onChangeEmail] = useInput('');
  const [nickname, onChangeNickname] = useInput('');
  const [password, setPassword ] = useState('');
  const [passwordCheck, setPasswordCheck ] = useState('');
  const [mismatchError, setMismatchError] = useState(false);
  const [signUpError, setSignUpError]=useState('');
  const [signUpSuccess, setSignUpSuccess] =useState(false);

  const onChangePassword= useCallback((e)=>{
    setPassword(e.target.value);
    setMismatchError(e.target.value!==passwordCheck);
}, [passwordCheck]);

const onChangePasswordCheck =useCallback((e)=>{
    setPasswordCheck(e.target.value);
    setMismatchError(e.target.value!==password);
}, [password]);

const onSubmit = useCallback((e)=>{
    e.preventDefault();
    if(!mismatchError){
        console.log('서버로 회원가입하기');
        setSignUpError(''); //1. 비동기 요청 보내기 직전의 로딩
        setSignUpSuccess(false);
        axios //비동기 요청 
        .post('http://localhost:3095/api/users', {
            email,
            nickname,
            password,
        })
        .then((response)=>{ //2. 비동기 요청의 성공단계
            console.log(response); //요청에 대한 응답이 담겨있음
            setSignUpSuccess(true);
        })// 성공하면 이 코드 실행
        .catch((error)=>{ //3. 비동기 요청의 실패단계
            console.log(error.response); //에러가 있다면 에러가 여기 담겨있음
            setSignUpError(error.response.data); //error.response.data에는 어떤 에러가 발생했는지 적혀있음
        }) //실패하면 이 코드 실행
        .finally(()=>{}); //성공하든 싫패하든 이 코드는 무조건 실행 
    }
}, [email, nickname, password, passwordCheck, mismatchError]);

if(data){
    return <Redirect to="/workspace/channel"/>;
}

  return (
    <div id="container">
      <Header>Sleact</Header>
      <Form onSubmit={onSubmit}>
        <Label id="email-label">
          <span>이메일 주소</span>
          <div>
            <Input type="email" id="email" name="email" value={email}  onChange={onChangeEmail}/>
          </div>
        </Label>
        <Label id="nickname-label">
          <span>닉네임</span>
          <div>
            <Input type="text" id="nickname" name="nickname" value={nickname} onChange={onChangeNickname} />
          </div>
        </Label>
        <Label id="password-label">
          <span>비밀번호</span>
          <div>
            <Input type="password" id="password" name="password" value={password} onChange={onChangePassword} />
          </div>
        </Label>
        <Label id="password-check-label">
          <span>비밀번호 확인</span>
          <div>
            <Input
              type="password"
              id="password-check"
              name="password-check"
              value={passwordCheck}
              onChange={onChangePasswordCheck}
            />
          </div>
          {mismatchError && <Error>비밀번호가 일치하지 않습니다.</Error>}
          {!nickname && <Error>닉네임을 입력해주세요.</Error>}
          {signUpError && <Error>{signUpError}</Error>}
          {signUpSuccess && <Success>회원가입되었습니다! 로그인해주세요.</Success>}
        </Label>
        <Button type="submit">회원가입</Button>
      </Form>
      <LinkContainer>
        이미 회원이신가요?&nbsp;
        <Link to="/login">로그인 하러가기</Link> 
      </LinkContainer>
    </div>
  );
};

export default SignUp;