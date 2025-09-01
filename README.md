
Libraries to install 
    "vitest": "^3.2.4"
    "@testing-library/dom": "^10.4.1",
    "@testing-library/jest-dom": "^6.8.0",
    "@testing-library/react": "^16.3.0",
    "@testing-library/user-event": "^14.6.1",
    "@vitest/ui": "3.2.4",
    "jsdom": "^26.1.0",
    "msw": "^2.11.0"

add config in vite.config.ts
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './tests/setup.ts',
    }
Add scripts in package.json
    "test": "vitest",
    "test:ui": "vitest --ui"


- create /tests/setup.ts
    import "@testing-library/jest-dom"
- How to Render a component and check for presence of text
    - using describe , it ,toHaveTextContent
- How to test Utility e.g range function    
    - using describe,it,expect, toEqual
- How to mock utility functions
    - using vi.mock and vi.spyOn
- How to test components with context
    - inject test component from outside by mocking action dispatch
    - using waitFor for async UI updates
   - userEvent.setup()
- How to mock api response
    - using vi.mock
    - using vi.spyOn and mockResolvedValueOnce
- How to test components with useEffect
    - using waitFor for async UI updates
- how to test hooks
    - using renderHook from @testing-library/react
    - using act for state updates
- how to test custom hooks
    - using renderHook from @testing-library/react

- How to test user events
    - using userEvent from @testing-library/user-event
    - using methods like userEvent.click, userEvent.type
- How to test context
    - using custom render function that wraps component with context provider
    - using screen to query elements
- How to test components with props
    - using render to render component with different props
    - using screen to query elements and check for props effects
- How to mock child component
- Testing setTimeout
    methods
        - useFakeTimer({shouldAdvanceTime: true})
        - useRealTimers()
        - advanceTimersByTime(2000) // time in ms
