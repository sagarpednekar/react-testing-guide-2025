import {  screen } from "@testing-library/react"
import { initialState } from "../contexts/todos"
import Header from "./header"
import userEvent from "@testing-library/user-event"
import { customRender } from "../../../utils/test-utils"

describe('Header', () => {
    it('should render header component', () => {
        const mockDispatch = vi.fn();
        const mockAddTodo = vi.fn();

        customRender(
            <Header />,
            {
                providerProps: [
                    initialState,
                    mockDispatch,
                    {
                        addTodo: mockAddTodo,
                        updateTodo: vi.fn(),
                        removeTodo: vi.fn(),
                        changeFilter: vi.fn(),
                        toggleAll: vi.fn()
                    }
                ]
            }
        )

        const header = screen.getByTestId('header');
        expect(header).toBeInTheDocument();

    })

    it('should call addTodo when enter key is pressed', async () => {
        const user = userEvent.setup();
        const mockDispatch = vi.fn();
        const mockAddTodo = vi.fn();

        customRender(
            <Header />,
            {
                providerProps: [
                    initialState,
                    mockDispatch,
                    {
                        addTodo: mockAddTodo,
                        updateTodo: vi.fn(),
                        removeTodo: vi.fn(),
                        changeFilter: vi.fn(),
                        toggleAll: vi.fn()
                    }
                ]
            }
        )

        const input = screen.getByTestId('newTodoInput');
        await user.type(input, 'New Todo{Enter}');
        expect(mockAddTodo).toHaveBeenCalledTimes(1);
        expect(mockAddTodo).toHaveBeenCalledWith({ text: 'New Todo', isCompleted: false });
    })

})