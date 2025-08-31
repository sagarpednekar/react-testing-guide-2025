import { render, screen } from "@testing-library/react";
import ErrorMessage from "./error-message";

describe("ErrorMessage Component", () => {
    it("should render the default error message", () => {
        render(<ErrorMessage />);
        expect(screen.getByTestId("message-container")).toHaveTextContent(
            "Something went wrong"
        );
    });

    it("should render a custom error message when provided", () => {
        const customMessage = "501 Internal Server Error";;
        render(<ErrorMessage message={customMessage} />);
        expect(screen.getByTestId("message-container")).toHaveTextContent(customMessage)
    })
});
