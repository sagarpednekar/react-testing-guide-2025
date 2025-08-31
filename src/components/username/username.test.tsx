import { render, screen } from "@testing-library/react";
import Username from "./username";
import userEvent from "@testing-library/user-event";

describe("Username Component", () => {
    it("should render default username", () => {
        render(<Username />);
        const username = screen.getByTestId("username")
        expect(username).toHaveTextContent("")
    })

    it("should render changed username on button click", async () => {
        const user = userEvent.setup()
        render(<Username />);
        const button = screen.getByTestId("button")
        await user.click(button)
        const username = screen.getByTestId("username")
        expect(username).toHaveTextContent("bar")
    })

    it("should render changed username on input change", async () => {
        const user = userEvent.setup();
        render(<Username />);
        const input = screen.getByTestId("usernameInput")
        const username = screen.getByTestId("username")
        await user.type(input, "Sagar")
        expect(username).toHaveTextContent("Sagar")
    })
});