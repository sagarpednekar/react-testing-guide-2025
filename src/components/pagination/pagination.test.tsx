import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Pagination from "./pagination"
import * as utils from "../../utils/utils"

/**  ### To mock range function.  */

/**
 * Mocking the range function to return a fixed array [1, 2, 3, 4, 5] for testing purposes.
 */
vi.mock("../utils/utils", () => {
    return {
        range: () => [1, 2, 3, 4, 5]
    }
})

describe("Test Pagination", () => {
    it("should render correct number of pages", () => {
        render(<Pagination total={30} limit={10} currentPage={1} />)
        const query = screen.getAllByTestId("page-container")
        expect(query).toHaveLength(3)
        expect(query[0]).toHaveTextContent("1")
    })

    it("should emit selected page number", async () => {
        const user = userEvent.setup()
        const handleClick = vi.fn(); // spy function
        render(<Pagination total={30} limit={10} currentPage={1} selectPage={handleClick} />)
        const page1 = screen.getAllByTestId("page-container")[0]
        await user.click(page1)
        expect(handleClick).toHaveBeenCalledWith(1)
    })

    it("should spy on utils range function", () => {
        vi.spyOn(utils, "range") // spying on range function
        render(<Pagination total={50} limit={10} currentPage={1} />)
        expect(utils.range).toHaveBeenCalledWith(1, 6)
    })
})