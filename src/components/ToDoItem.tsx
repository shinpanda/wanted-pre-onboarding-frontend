import React, { useState } from "react";
import { fetchDeleteTodo, fetchUpdateTodo } from "../api";
import { ITodo } from "../atoms";

interface ITodoParam {
  id: number;
  todo: string;
  isCompleted: boolean;
  userId: number;
  modifyToDoList: Function;
  deleteTodoList: Function;
}

function ToDoItem({
  id,
  todo,
  isCompleted,
  modifyToDoList,
  deleteTodoList,
}: ITodoParam) {
  const [mode, setMode] = useState("read");
  const [newTodo, setTodo] = useState(todo);
  const [newIsCompleted, setNewIsCompleted] = useState(isCompleted);
  const changeMode = () => {
    if (mode === "modify" && newIsCompleted !== isCompleted) {
      setNewIsCompleted(isCompleted);
    }
    setMode(() => (mode === "read" ? "modify" : "read"));
  };

  const modifyTodo = () => {
    (async () => {
      const modifiedTodo: ITodo = await fetchUpdateTodo(
        id,
        newTodo,
        newIsCompleted
      );
      modifyToDoList(modifiedTodo);
    })();
    if (mode === "modify") {
      changeMode();
    }
  };

  const deleteTodo = () => {
    (async () => {
      await fetchDeleteTodo(id);
      deleteTodoList(id);
    })();
  };

  const onInputChange = (event: React.FormEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setTodo(value);
  };

  const toggleTodoComplete = () => {
    setNewIsCompleted((value) => !value);
    (async () => {
      const modifiedTodo: ITodo = await fetchUpdateTodo(
        id,
        newTodo,
        !newIsCompleted
      );
      modifyToDoList(modifiedTodo);
    })();
  };

  return (
    <li>
      {mode === "modify" ? (
        <>
          <label>
            <input
              type="checkbox"
              defaultChecked={isCompleted}
              onChange={() => setNewIsCompleted((value) => !value)}
            />
            <input
              data-testid="modify-input"
              defaultValue={newTodo}
              onChange={onInputChange}
            />
          </label>
          <button data-testid="submit-button" onClick={modifyTodo}>
            제출
          </button>
          <button data-testid="cancel-button" onClick={changeMode}>
            취소
          </button>
        </>
      ) : (
        <>
          <label>
            <input
              type="checkbox"
              defaultChecked={isCompleted}
              onChange={toggleTodoComplete}
            />
            <span>{newTodo}</span>
          </label>
          <button data-testid="modify-button" onClick={changeMode}>
            수정
          </button>
          <button data-testid="delete-button" onClick={deleteTodo}>
            삭제
          </button>
        </>
      )}
    </li>
  );
}

export default ToDoItem;
