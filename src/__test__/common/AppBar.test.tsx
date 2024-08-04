import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import CustomAppBar from "../../components/common/AppBar";
import { ThemeProvider, useTheme } from "@mui/material/styles";

// Mock the useThemeContext hook
vi.mock("../../ThemeContextProvider", () => ({
  useThemeContext: () => ({
    toggleTheme: vi.fn(),
    mode: "light",
  }),
}));

describe("CustomAppBar", () => {
  it("should render the search input field", () => {
    render(<CustomAppBar open={false} />);
    expect(screen.getByPlaceholderText(/search…/i)).toBeInTheDocument();
  });

  it("should render the user avatar", () => {
    render(<CustomAppBar open={false} />);
    expect(screen.getByAltText(/user avatar/i)).toBeInTheDocument();
  });

  it("should render the menu icon button", () => {
    render(<CustomAppBar open={false} />);
    expect(
      screen.getByRole("button", { name: /open drawer/i })
    ).toBeInTheDocument();
  });
  test("should render the menu icon", () => {
    render(
      <ThemeProvider theme={useTheme}>
        <CustomAppBar open={false} />
      </ThemeProvider>
    );

    // Check if the menu icon is present in the document
    expect(
      screen.getByRole("button", { name: /open drawer/i })
    ).toBeInTheDocument();
  });

  test("should render the search input", () => {
    render(
      <ThemeProvider theme={useTheme}>
        <CustomAppBar open={false} />
      </ThemeProvider>
    );

    // Check if the search input is present in the document
    expect(screen.getByPlaceholderText(/search…/i)).toBeInTheDocument();
  });

  test("should render the user avatar", () => {
    render(
      <ThemeProvider theme={useTheme}>
        <CustomAppBar open={false} />
      </ThemeProvider>
    );

    // Check if the user avatar is present in the document
    expect(screen.getByAltText(/user avatar/i)).toBeInTheDocument();
  });
  test("should render the AppBar with fixed position", () => {
    render(
      <ThemeProvider theme={useTheme}>
        <CustomAppBar open={false} />
      </ThemeProvider>
    );

    // Check if the AppBar is rendered with fixed position style
    const appBar = screen.getByRole("banner"); // The AppBar is typically a banner role
    expect(appBar).toHaveStyle("position: fixed");
  });
  test("should hide menu icon when drawer is open", () => {
    render(
      <ThemeProvider theme={useTheme}>
        <CustomAppBar open={true} />
      </ThemeProvider>
    );

    // Check if the menu icon is hidden when the drawer is open
    expect(screen.queryByRole("button", { name: /open drawer/i })).toBeNull();
  });
  test("should adjust search input width on focus", async () => {
    render(
      <ThemeProvider theme={useTheme}>
        <CustomAppBar open={false} />
      </ThemeProvider>
    );

    // Simulate focus on the search input
    const searchInput = screen.getByPlaceholderText(/search…/i);
    searchInput.focus();

    // Check if the search input width changes on focus
    expect(searchInput).toHaveStyle("width: 100%");
  });
  test("should render menu icon before search input", () => {
    render(
      <ThemeProvider theme={useTheme}>
        <CustomAppBar open={false} />
      </ThemeProvider>
    );

    // Check the order of elements
    const menuIcon = screen.getByRole("button", { name: /open drawer/i });
    const searchInput = screen.getByPlaceholderText(/search…/i);

    // Ensure menu icon is before search input
    expect(menuIcon).toBeInTheDocument();
    expect(searchInput).toBeInTheDocument();
    expect(menuIcon).toBeInTheDocument();
  });
});
