import axios from "axios";
import {
  createContext,
  useEffect,
  useReducer,
  type ReactNode,
  type Dispatch,
} from "react";

// Types
export type Todo = {
  id: number;
  text: string;
  isCompleted: boolean;
};

export type State = {
  todos: Todo[];
  filter: "all" | "active" | "completed";
};

export type Action =
  | { type: "getTodos"; payload: Todo[] }
  | { type: "addTodo"; payload: Todo }
  | { type: "toggleAll"; payload: boolean }
  | { type: "updateTodo"; payload: Todo }
  | { type: "removeTodo"; payload: number }
  | { type: "changeFilter"; payload: State["filter"] }
  | { type: "unknown" };

export const initialState: State = {
  todos: [],
  filter: "all",
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "getTodos": {
      return {
        ...state,
        todos: action.payload,
      };
    }
    case "addTodo": {
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };
    }
    case "toggleAll": {
      const updatedTodos = state.todos.map((todo) => ({
        ...todo,
        isCompleted: action.payload,
      }));
      return {
        ...state,
        todos: updatedTodos,
      };
    }
    case "updateTodo": {
      const updatedTodos = state.todos.map((todo) => {
        if (todo.id === action.payload.id) {
          return { ...todo, ...action.payload };
        }
        return todo;
      });
      return {
        ...state,
        todos: updatedTodos,
      };
    }
    case "removeTodo": {
      const updatedTodos = state.todos.filter(
        (todo) => todo.id !== action.payload
      );
      return {
        ...state,
        todos: updatedTodos,
      };
    }
    case "changeFilter": {
      return {
        ...state,
        filter: action.payload,
      };
    }
    default:
      return state;
  }
};

export const changeFilter = async (
  dispatch: Dispatch<Action>,
  filter: State["filter"]
) => {
  dispatch({
    type: "changeFilter",
    payload: filter,
  });
};

export const getTodos = async (dispatch: Dispatch<Action>) => {
  const response = await axios.get<Todo[]>("http://localhost:3004/todos");
  dispatch({
    type: "getTodos",
    payload: response.data,
  });
};

export const addTodo = async (
  dispatch: Dispatch<Action>,
  todoToCreate: Omit<Todo, "id">
) => {
  const response = await axios.post<Todo>(
    "http://localhost:3004/todos",
    todoToCreate
  );

  console.log("addTodo response", response.data); // <-- Add this

  dispatch({
    type: "addTodo",
    payload: response.data,
  });
};

export const updateTodo = async (
  dispatch: Dispatch<Action>,
  todoId: number,
  fieldsToUpdate: Partial<Todo>
) => {
  const response = await axios.put<Todo>(
    `http://localhost:3004/todos/${todoId}`,
    fieldsToUpdate
  );
  dispatch({
    type: "updateTodo",
    payload: response.data,
  });
};

export const removeTodo = async (
  dispatch: Dispatch<Action>,
  todoId: number
) => {
  await axios.delete(`http://localhost:3004/todos/${todoId}`);
  dispatch({
    type: "removeTodo",
    payload: todoId,
  });
};

export const toggleAll = async (
  dispatch: Dispatch<Action>,
  isCompleted: boolean,
  todos: Todo[]
) => {
  const promises = todos.map((todo) => {
    return axios.put(`http://localhost:3004/todos/${todo.id}`, {
      text: todo.text,
      isCompleted,
    });
  });
  await Promise.all(promises);
  dispatch({
    type: "toggleAll",
    payload: isCompleted,
  });
};

type TodosContextType = [
  State,
  Dispatch<Action>,
  {
    addTodo: (todoToCreate: Omit<Todo, "id">) => Promise<void>;
    updateTodo: (
      todoId: number,
      fieldsToUpdate: Partial<Todo>
    ) => Promise<void>;
    removeTodo: (todoId: number) => Promise<void>;
    changeFilter: (filter: State["filter"]) => Promise<void>;
    toggleAll: (isCompleted: boolean) => Promise<void>;
  }
];

export const TodosContext = createContext<TodosContextType>(
  {} as TodosContextType
);

export const TodosProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    getTodos(dispatch);
  }, []);

  return (
    <TodosContext.Provider
      value={[
        state,
        dispatch,
        {
          addTodo: (todoToCreate) => addTodo(dispatch, todoToCreate),
          updateTodo: (todoId, fieldsToUpdate) =>
            updateTodo(dispatch, todoId, fieldsToUpdate),
          removeTodo: (todoId) => removeTodo(dispatch, todoId),
          changeFilter: (filter) => changeFilter(dispatch, filter),
          toggleAll: (isCompleted) =>
            toggleAll(dispatch, isCompleted, state.todos),
        },
      ]}
    >
      {children}
    </TodosContext.Provider>
  );
};
