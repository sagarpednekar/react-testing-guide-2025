import { TodosProvider } from "../contexts/todos";
import Header from "./header";
import Footer from "./footer";
import Main from "./main";
import "../css/todo-mvc-base.css";
import "../css/todo-mvc-app.css";

const Todos = () => {
  return (
    <TodosProvider>
      <div className="todoapp">
        <Header />
        <Main />
        <Footer />
      </div>
    </TodosProvider>
  );
};
export default Todos;
