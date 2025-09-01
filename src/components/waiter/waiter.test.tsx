import { act, render, screen } from "@testing-library/react";
import Waiter from "./waiter";

describe("Waiter Component", () => {
    beforeEach(() => {
        vi.useFakeTimers({shouldAdvanceTime: true});
    });
    afterEach(() => {
        vi.useRealTimers();
    });

    it("renders waiter text after timeout", async () => {
        render(<Waiter />);
        act(() => {
            vi.advanceTimersByTime(2000);
        });
        const waiter = await screen.findByTestId("waiter");
        expect(waiter).toHaveTextContent("passed");
    })
});