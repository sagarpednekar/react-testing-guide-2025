import { act, renderHook } from "@testing-library/react";
import useFetch from "./use-fetch";
const mockResponse = {
    data: [
        { id: 1, name: "tag1" },
        { id: 2, name: "tag2" },
        { id: 3, name: "tag3" },
    ],
};
describe("Use Fetch Hook", () => {
    it("should render intial value ", () => {
        const { result } = renderHook(() => useFetch("/tags"));
        const [{ response, isLoading, error }] = result.current as [
            { response: any; isLoading: boolean; error: any },
            (options?: {}) => void
        ];
        expect(response).toBe(null);
        expect(isLoading).toBe(false);
        expect(error).toBe(null);
    });

    it("should update isLoading when doFetch is called", async () => {
        vi.spyOn(globalThis, "fetch").mockResolvedValue({
            json: async () => mockResponse,
        } as Response);

        const { result } = renderHook(() => useFetch("/tags"));
        const [, doFetch] = result.current as [
            { response: any; isLoading: boolean; error: any },
            (options?: {}) => void
        ];
        await act(async () => {
            doFetch();
        });
        const [{ response, isLoading, error }] = result.current as [
            { response: any; isLoading: boolean; error: any },
            (options?: {}) => void
        ];
        expect(isLoading).toBe(false);
        expect(response).toBe(mockResponse.data);
        expect(error).toBe(null);
    });

    it("should handle error", async () => {
        const mockError = { data: "Server Error" };
        vi.spyOn(globalThis, "fetch").mockRejectedValue(mockError);

        const { result } = renderHook(() => useFetch("/tags"));
        const [, doFetch] = result.current as [
            { response: any; isLoading: boolean; error: any },
            (options?: {}) => void
        ];
        await act(async () => {
            doFetch();
        });
        const [{ response, isLoading, error }] = result.current as [
            { response: any; isLoading: boolean; error: any },
            (options?: {}) => void
        ];
        expect(isLoading).toBe(false);
        expect(response).toBe(null);
        expect(error).toBe(mockError);
    });
});
