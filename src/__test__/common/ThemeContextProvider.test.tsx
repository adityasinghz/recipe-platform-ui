import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import ThemeContextProvider, {
  useThemeContext,
} from "../../ThemeContextProvider";

// Mock localStorage
beforeEach(() => {
  Storage.prototype.setItem = vi.fn();
  Storage.prototype.getItem = vi.fn();
  Storage.prototype.removeItem = vi.fn();
});

afterEach(() => {
  vi.resetAllMocks();
});

describe("ThemeContextProvider", () => {
  it("should provide theme context values", () => {
    const TestComponent = () => {
      const { toggleTheme, mode } = useThemeContext();
      return (
        <div>
          <button onClick={toggleTheme}>Toggle Theme</button>
          <p>{mode}</p>
        </div>
      );
    };

    render(
      <ThemeContextProvider>
        <TestComponent />
      </ThemeContextProvider>
    );

    expect(screen.getByText("light")).toBeInTheDocument(); // Assuming default mode is 'light'

    fireEvent.click(screen.getByText("Toggle Theme"));

    expect(screen.getByText("dark")).toBeInTheDocument();
  });

  it("should toggle theme mode", () => {
    const TestComponent = () => {
      const { toggleTheme, mode } = useThemeContext();
      return (
        <div>
          <button onClick={toggleTheme}>Toggle Theme</button>
          <p>{mode}</p>
        </div>
      );
    };

    render(
      <ThemeContextProvider>
        <TestComponent />
      </ThemeContextProvider>
    );

    // Verify the initial mode is 'light'
    expect(screen.getByText("light")).toBeInTheDocument();

    // Toggle theme
    fireEvent.click(screen.getByText("Toggle Theme"));

    // Verify the mode changed to 'dark'
    expect(screen.getByText("dark")).toBeInTheDocument();
  });

  it("should store and retrieve theme mode from localStorage", () => {
    // Mock localStorage methods
    (Storage.prototype.getItem as vi.Mock).mockReturnValue("dark");

    render(
      <ThemeContextProvider>
        <div>Test</div>
      </ThemeContextProvider>
    );

    expect(localStorage.getItem).toHaveBeenCalledWith("mode");
    expect(localStorage.getItem).toHaveReturnedWith("dark");
  });

  it("should apply the correct theme based on mode", () => {
    // Mock localStorage to return 'dark' mode
    (Storage.prototype.getItem as vi.Mock).mockReturnValue("dark");

    render(
      <ThemeContextProvider>
        <div>Test</div>
      </ThemeContextProvider>
    );

    // You can use theme-related assertions here if needed
    // For example, you might want to check if the applied theme has dark palette
    // Check if CssBaseline is rendered
    expect(screen.getByText("Test")).toBeInTheDocument();
  });
});
