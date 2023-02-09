import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const [errorMessage, setErrorMessage] = useState("");

  const emailValidation = (email: string): boolean => email.indexOf("@") >= 0;
  const passwordValidation = (password: string): boolean => password.length > 8;
  const navigation = useNavigate();
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

      if ("error" in response) {
        setErrorMessage(response.message);
      } else {
        navigation("/signin");
      }
    } else {
      setErrorMessage("입력 값을 확인해주세요");
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

      {errorMessage ? <div>{errorMessage}</div> : ""}
    </>
  );
}

export default SignUp;
