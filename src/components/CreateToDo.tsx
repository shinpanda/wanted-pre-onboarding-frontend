import { fetchCreateToDo } from "../api";
import { ITodo } from "../atoms";

interface ICreateToDo {
  setToDoList: Function;
}

function CreateToDo({ setToDoList }: ICreateToDo) {
  const createTodo = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const toDoInput = event.currentTarget.querySelector("input");
    if (toDoInput) {
      const resTodo: ITodo = await fetchCreateToDo(toDoInput.value ?? "");
      setToDoList(resTodo);
      toDoInput.value = "";
    }
  };

  return (
    <form onSubmit={createTodo}>
      <input data-testid="new-todo-input" />
      <button data-testid="new-todo-add-button">추가</button>
    </form>
  );
}

export default CreateToDo;
