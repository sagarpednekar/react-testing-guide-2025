import axios from "axios";
import { addTodo, initialState, reducer, TodosContext, TodosProvider, updateTodo, type Action, type Todo } from "./todos";
import { useContext } from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

vi.mock("axios"); // mock axios globally

// Test component to interact with TodosContext
function TestComponent() {
    const [state, , { addTodo }] = useContext(TodosContext);

    return (
        <div>
            {/* Button to trigger addTodo */}
            <button
                data-testid="add-todo"
                onClick={() =>
                    addTodo({ text: "Learn Vitest", isCompleted: false })
                }
            >
                Add
            </button>
            {/* Render todos list */}
            <ul data-testid="todos">
                {state.todos.map((t) => (
                    <li key={t.id}>{t.text}</li>
                ))}
            </ul>
        </div>
    );
}

describe("addTodo", () => {
    // Unit test for addTodo action creator
    it("should call axios.post and dispatch addTodo action", async () => {
        const mockDispatch = vi.fn<(action: Action) => void>();
        const newTodo = { text: "Learn Vitest", isCompleted: false };

        const mockResponse: Todo = {
            id: 1,
            text: "Learn Vitest",
            isCompleted: false,
        };

        // Mock axios.post and axios.get responses
        vi.spyOn(axios, "post").mockResolvedValueOnce({ data: mockResponse });
        vi.spyOn(axios, "get").mockResolvedValueOnce({ data: [] });

        // Call addTodo and check dispatch
        await addTodo(mockDispatch, newTodo);

        expect(mockDispatch).toHaveBeenCalledWith({
            type: "addTodo",
            payload: mockResponse,
        });
    });

    // Integration test: add todo via UI interaction
    it("should add a new todo when button is clicked", async () => {
        const user = userEvent.setup();
        const mockResponse: Todo = {
            id: 1,
            text: "Learn Vitest",
            isCompleted: false,
        };

        // Mock axios.post response
        (axios.post as any).mockResolvedValue({ data: mockResponse });

        // Render provider and test component
        render(
            <TodosProvider>
                <TestComponent />
            </TodosProvider>
        );

        // Simulate user clicking add button
        const button = screen.getByTestId("add-todo");
        await user.click(button);

        // Wait for UI to update and check todo is rendered
        await waitFor(() => {
            screen.debug();
            expect(screen.getByTestId("todos").children[0]).toHaveTextContent(mockResponse.text);
        });
    });
});

describe("TodosContext Reducer", () => {
    // Test default action returns initial state
    it("should handle default action", () => {
        const newState = reducer(initialState, { type: "unknown" });
        expect(newState).toEqual({
            todos: [],
            filter: "all",
        });
    });

    // Test addTodo action adds a todo
    it("should handle addTodo action", () => {
        const newState = reducer(initialState, {
            type: "addTodo",
            payload: { id: 1, text: "Test Todo", isCompleted: false },
        });
        expect(newState).toEqual({
            todos: [{ id: 1, text: "Test Todo", isCompleted: false }],
            filter: "all",
        });
    });

    // Test updateTodo action updates a todo
    it("should handle updateTodo action", () => {
        const newState = reducer({
            todos: [{ id: 1, text: "Test Todo", isCompleted: false }],
            filter: "all",
        }, {
            type: "updateTodo",
            payload: { id: 1, text: "Updated Todo", isCompleted: false },
        });

        expect(newState).toEqual({
            todos: [{ id: 1, text: "Updated Todo", isCompleted: false }],
            filter: "all",
        });
    });
});

describe("Todos Actions", () => {
    const mockDispatch = vi.fn<(action: Action) => void>();


    // Unit test for addTodo async action
    it("should add a todo", async () => {
        const newTodo = { text: "Test Todo", isCompleted: false };

        const mockResponse: Todo = {
            id: 1,
            text: "Test Todo",
            isCompleted: false,
        };


        // Mock axios.post response
        (axios.post as any).mockResolvedValue({ data: mockResponse });

        // Call addTodo and check dispatch
        await addTodo(mockDispatch, newTodo);
        expect(mockDispatch).toHaveBeenCalledWith({
            type: "addTodo",
            payload: mockResponse,
        });
    });

    it("should update todo", async () => {
        const updatedTodo = { id: 1, text: "Updated Todo", isCompleted: true };

        // Mock axios.put response
        (axios.put as any).mockResolvedValue({ data: updatedTodo });

        const mockResponse: Todo = { id: 1, text: "Updated Todo", isCompleted: true }

        await updateTodo(mockDispatch, 1, { text: "Updated Todo ", isCompleted: true });
        expect(mockDispatch).toHaveBeenCalledWith({
            type: "updateTodo",
            payload: mockResponse,
        });

    })
});
