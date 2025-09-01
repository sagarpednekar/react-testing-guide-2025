import { useContext, useState } from "react";

import { TodosContext } from "../contexts/todos";
import Todo from "./todo";

const Main = () => {
  const [todosState, , { toggleAll }] = useContext(TodosContext);
  const [editingId, setEditingId] = useState(null);
  console.log("Todos State in Main:", todosState);
  const noTodosClass = todosState.todos.length === 0 ? "hidden" : "";
  if (todosState.todos.length === 0) {
    return null; // Don't render anything if there are no todos
  }
  const isAllTodosSelected = todosState.todos.every((todo) => todo.isCompleted);
  const getVisibleTodos = () => {
    if (todosState.filter === "active") {
      return todosState.todos.filter((todo) => !todo.isCompleted);
    } else if (todosState.filter === "completed") {
      return todosState.todos.filter((todo) => todo.isCompleted);
    }
    return todosState.todos;
  };
  const visibleTodos = getVisibleTodos();

  return (
    <section className={`main ${noTodosClass}`} data-testid="main">
      <input
        id="toggle-all"
        className="toggle-all"
        type="checkbox"
        data-testid="toggleAll"
        data-cy="toggleAll"
        checked={isAllTodosSelected}
        onChange={(e) => toggleAll(e.target.checked)}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>
      <ul className="todo-list">
        {visibleTodos.map((todo) => (
          <Todo
            key={todo.id}
            todo={todo}
            isEditing={editingId === todo.id}
            setEditingId={setEditingId}
          />
        ))}
      </ul>
    </section>
  );
};
export default Main;
