describe("Todos App", () => {
    beforeEach(() => {
        cy.intercept("GET", "http://localhost:3004/todos", {
            data: [
                { id: 1, text: "Test Todo 1", isCompleted: false },
                { id: 2, text: "Test Todo 2", isCompleted: true },
                { id: 3, text: "Test Todo 3", isCompleted: false },
            ],
        })
    });
    it("visits the app", () => {
        cy.visit("/");
    });
});
