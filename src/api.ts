import { getAccessToken } from "./atoms";

const BASE_URL = "https://pre-onboarding-selection-task.shop";

// user
// 회원가입 [signup]
export async function fetchSignUp(email: string, password: string) {
  return await fetch(`${BASE_URL}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((response) => {
      if (response.status !== 201) {
        throw new Error("정상적으로 생성하지 못했습니다.");
      }
      return response.json();
    })
    .catch((reason) => {
      return { errorMessage: reason };
    });
}

// 로그인 [signin]
export async function fetchSignIn(email: string, password: string) {
  const response = await fetch(`${BASE_URL}/auth/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  if (response.status !== 200) {
    throw new Error("로그인에 실패했습니다.");
  }
  return response.json();
}

// todo Api
interface ITodo {
  id: number;
  todo: string;
  isCompleted: boolean;
  userId: number;
}

export async function fetchCreateToDo(todo: string) {
  return await fetch(`${BASE_URL}/todos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getAccessToken()}`,
    },
    body: JSON.stringify({ todo }),
  })
    .then((response) => {
      if (response.status !== 201) {
        throw new Error("정상적으로 생성하지 못했습니다.");
      }
      return response.json();
    })
    .then((json) => json as ITodo);
}

export async function fetchGetTodos() {
  return await fetch(`${BASE_URL}/todos`, {
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
    },
  })
    .then((response) => {
      if (response.status !== 200) {
        throw new Error("정상적으로 조회하지 못했습니다.");
      }
      return response.json();
    })
    .then((json) => json as ITodo[]);
}

export async function fetchUpdateTodo(
  id: number,
  todo: string,
  isCompleted: boolean
) {
  return await fetch(`${BASE_URL}/todos/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getAccessToken()}`,
    },
    body: JSON.stringify({ todo, isCompleted }),
  })
    .then((response) => {
      if (response.status !== 200) {
        throw new Error("정상적으로 수정되지 않았습니다.");
      }
      return response.json();
    })
    .then((json) => json as ITodo);
}

export async function fetchDeleteTodo(id: number) {
  return await fetch(`${BASE_URL}/todos/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getAccessToken()}`,
    },
  }).then((response) => {
    if (response.status !== 204) {
      throw new Error("삭제가 정상적으로 이루어지지 않았습니다.");
    }
  });
}
