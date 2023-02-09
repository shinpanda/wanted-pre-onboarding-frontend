import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchSignIn } from "../api";
import { useAuth } from "../Auth";

interface ISignInInputs {
  email: string;
  password: string;
}

function SignIn() {
  const { login } = useAuth();
  const [signInInputs, setSignInInputs] = useState<ISignInInputs>({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [signInBtn, setSignInBtn] = useState(false);
  const navigate = useNavigate();

  const emailValidation = (email: string): boolean => email.indexOf("@") >= 0;
  const passwordValidation = (password: string): boolean => password.length > 8;

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      emailValidation(signInInputs.email) &&
      passwordValidation(signInInputs.password)
    ) {
      const response = await fetchSignIn(
        signInInputs.email,
        signInInputs.password
      );
      console.log(response);
      if ("error" in response) {
        setErrorMessage(response.message);
      } else {
        const accessToken = response.access_token;
        if (accessToken) {
          login(accessToken);
          navigate(`/todo`);
        }
      }
    } else {
      setErrorMessage("이메일과 패스워드를 먼저 입력해주세요.");
    }
  };

  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    event.preventDefault();
    const { value, name } = event.currentTarget;
    setSignInInputs({
      ...signInInputs,
      [name]: value,
    });

    if (
      emailValidation(signInInputs.email) &&
      passwordValidation(signInInputs.password)
    ) {
      setSignInBtn(false);
    } else {
      setSignInBtn(true);
    }
  };

  return (
    <>
      <h1>로그인</h1>
      <hr />
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          data-testid="email-input"
          placeholder="email"
          type="email"
          name="email"
          value={signInInputs.email}
        />
        <input
          onChange={onChange}
          data-testid="password-input"
          placeholder="password"
          type="password"
          name="password"
          value={signInInputs.password}
        />
        <button data-testid="signin-button" disabled={signInBtn}>
          로그인
        </button>
      </form>
      {errorMessage ? <div>{errorMessage}</div> : ""}
      <Link to="/signup">&rarr; 회원가입</Link>
    </>
  );
}

export default SignIn;
