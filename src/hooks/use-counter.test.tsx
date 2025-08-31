import { act, renderHook } from "@testing-library/react";
import useCounter from "./use-counter";

describe("Test UseCounter Hook", () => {
    it("should render initial count", () => {
        const { result } = renderHook(() => useCounter(5));
        expect(result.current.count).toBe(5);
    })

    it("should increment the count", () => {
        const { result } = renderHook(() => useCounter());
        act(() => {
            result.current.increment();
            result.current.increment();

        })
        expect(result.current.count).toBe(2);
    })
});