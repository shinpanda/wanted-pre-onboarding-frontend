import { useEffect, useState } from "react";
import { fetchGetTodos } from "../api";
import { ITodo } from "../atoms";
import CreateToDo from "../components/CreateToDo";
import ToDo from "../components/ToDoItem";

function TodoList() {
  const [toDoList, setToDoList] = useState<ITodo[]>([]);

  useEffect(() => {
    (async () => {
      const toDoData = await fetchGetTodos();
      setToDoList(toDoData);
    })();
  }, []);

  const createTodo = (todo: ITodo) => setToDoList([...toDoList, todo]);
  const modifyTodo = (newTodo: ITodo) => {
    setToDoList(
      toDoList.map((todo) => {
        if (todo.id === newTodo.id) {
          return newTodo;
        }
        return todo;
      })
    );
  };
  const deleteTodo = (id: number) => {
    setToDoList((toDoList) => {
      return toDoList.filter((todo) => todo.id !== id);
    });
  };

  return (
    <>
      <h1>To Do</h1>
      <hr />
      <CreateToDo setToDoList={createTodo} />
      <ul>
        {toDoList?.map((todo) => {
          return (
            <ToDo
              key={todo.id}
              modifyToDoList={modifyTodo}
              deleteTodoList={deleteTodo}
              {...todo}
            />
          );
        })}
      </ul>
    </>
  );
}

export default TodoList;
