import { Link } from "react-router-dom";
import { removeAccessToken } from "./atoms";

function Home() {
  return (
    <>
      <p>원티드 프리온보딩 인턴십 과제입니다.</p>

      <p>1. 로그인</p>
      <Link to="signin">&rarr; 로그인</Link>

      <p>2. 회원가입</p>
      <Link to="signup">&rarr; 회원가입</Link>

      <p>3. 투두리스트</p>
      <Link to="todo">&rarr; 투두리스트</Link>

      <p>4. 로그아웃</p>
      <>
        <button onClick={() => removeAccessToken()}>로그아웃</button>
      </>
    </>
  );
}

export default Home;
