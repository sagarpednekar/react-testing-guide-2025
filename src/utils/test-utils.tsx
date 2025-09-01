import { render } from "@testing-library/react";
import { TodosContext } from "../components/todos/contexts/todos";
import type { ReactElement } from "react";

export const customRender = (ui: ReactElement, { providerProps }: any) => {
    return render(
        <TodosContext.Provider value={providerProps}>{ui}</TodosContext.Provider>
    );
}