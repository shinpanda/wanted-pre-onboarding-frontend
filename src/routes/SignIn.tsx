import { useState } from "react";
import { Link, redirect } from "react-router-dom";
import { fetchSignIn } from "../api";
import { setAccessToken } from "../atoms";

interface iForm {
  email: string;
  password: string;
}

function SignIn() {
  const [signInInputs, setSignInInputs] = useState<iForm>({
    email: "",
    password: "",
  });
  const [signInBtn, setSignInBtn] = useState(false);

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
      const accessToken = response.access_token;
      if (accessToken) {
        setAccessToken(accessToken);
        redirect(`/todo`);
      }
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
      <Link to="/signup">&rarr; 회원가입</Link>
    </>
  );
}

export default SignIn;
