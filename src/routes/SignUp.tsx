import { useState } from "react";
import { redirect } from "react-router-dom";
import { fetchSignUp } from "../api";

interface iForm {
  email: string;
  password: string;
}

function SignUp() {
  const [signUpInputs, setSignUpInputs] = useState<iForm>({
    email: "",
    password: "",
  });
  const [signUpBtn, setSignUpBtn] = useState(false);

  const emailValidation = (email: string): boolean => email.indexOf("@") >= 0;
  const passwordValidation = (password: string): boolean => password.length > 8;

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      emailValidation(signUpInputs.email) &&
      passwordValidation(signUpInputs.password)
    ) {
      const response = await fetchSignUp(
        signUpInputs.email,
        signUpInputs.password
      );
      return redirect("/signin");
    }
  };

  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    event.preventDefault();
    const { value, name } = event.currentTarget;

    setSignUpInputs({
      ...signUpInputs,
      [name]: value,
    });

    if (
      emailValidation(signUpInputs.email) &&
      passwordValidation(signUpInputs.password)
    ) {
      setSignUpBtn(false);
    } else {
      setSignUpBtn(true);
    }
  };

  return (
    <>
      <h1>회원가입</h1>
      <hr />
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          data-testid="email-input"
          placeholder="email"
          type="email"
          name="email"
          value={signUpInputs.email}
        />
        <input
          onChange={onChange}
          data-testid="password-input"
          placeholder="password"
          type="password"
          name="password"
          value={signUpInputs.password}
        />
        <button data-testid="signup-button" disabled={signUpBtn}>
          회원가입
        </button>
      </form>
    </>
  );
}

export default SignUp;
