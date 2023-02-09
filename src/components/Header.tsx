import { Link } from "react-router-dom";
import { useAuth } from "../Auth";

function Header() {
  const { auth, logout } = useAuth();

  return (
    <>
      <ul>
        <li>
          <Link to="/">홈</Link>
        </li>
        {auth ? (
          <>
            <li>
              <button onClick={() => logout()}>로그아웃</button>
            </li>
            <li>
              <Link to="/todo">투두리스트</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/signin">로그인</Link>
            </li>
            <li>
              <Link to="/signup">회원가입</Link>
            </li>
          </>
        )}
      </ul>
    </>
  );
}

export default Header;
