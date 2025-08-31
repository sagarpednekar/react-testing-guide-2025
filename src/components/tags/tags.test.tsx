import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";
import Tags from "./tags";
import { render, screen } from "@testing-library/react";


describe("Tags Component", () => {
    const mockResponse = {
        data: [
            { id: 1, name: "tag1" },
            { id: 2, name: "tag2" },
            { id: 3, name: "tag3" },
        ]
    }
    /**
     * Approach 1: Mock server to handle API requests using msw
     */

    /** Uncomment this section to enable MSW server
      const server = setupServer(
          http.get("http://localhost:3004/tags", () => {
              return HttpResponse.json(mockResponse);
  
          })
      )
      beforeAll(() => server.listen())
      afterAll(() => server.close())
      afterEach(() => server.resetHandlers());
  */
    it("renders tags fetched from API", async () => {
        /**
         * Approach 2: Mocking fetch directly using spyOn
         */
        vi.spyOn(globalThis, "fetch").mockResolvedValue({
            json: async () => mockResponse
        } as Response);
        // Test implementation here
        render(<Tags />);
        const tags = await screen.findAllByTestId("tag");
        expect(tags).toHaveLength(3);
        expect(tags[0]).toHaveTextContent("tag1");
    });
});
