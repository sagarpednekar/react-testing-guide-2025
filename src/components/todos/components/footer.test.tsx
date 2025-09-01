import { screen } from "@testing-library/react";
import Footer from "./footer";
import { customRender } from "../../../utils/test-utils";

describe("Footer", () => {
    it("should render footer component", () => {
        const mockDispatch = vi.fn();
        customRender(
            <Footer />,
            {
                providerProps: [
                    {
                        todos: [{ id: 1, text: "Test Todo", isCompleted: false }], filter: "all"
                    },
                    mockDispatch,
                    {
                        addTodo: vi.fn(),
                        updateTodo: vi.fn(),
                        removeTodo: vi.fn(),
                        changeFilter: vi.fn(),
                        toggleAll: vi.fn()
                    }
                ]
            }
        )

        const footer = screen.getByTestId('footer');
        expect(footer).not.toHaveClass('hidden');
    })
})