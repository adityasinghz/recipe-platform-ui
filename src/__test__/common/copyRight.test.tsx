import { render, screen } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import Copyright from "../../components/common/copyRight"; // Adjust the import path

describe("Copyright", () => {
  test("should render a link with correct text", () => {
    render(<Copyright />);

    const linkElement = screen.getByRole("link", { name: /Kailash/i });
    expect(linkElement).toHaveTextContent("Kailash");
  });
  test("should apply additional props to Typography component", () => {
    render(<Copyright data-testid="copyright-text" />);

    const typographyElement = screen.getByTestId("copyright-text");
    expect(typographyElement).toBeInTheDocument();
  });
  test("should render a link with correct text", () => {
    render(<Copyright />);

    const linkElement = screen.getByRole("link", { name: /Kailash/i });
    expect(linkElement).toHaveTextContent("Kailash");
  });
  test("should apply additional props to Typography component", () => {
    render(<Copyright data-testid="copyright-text" />);

    const typographyElement = screen.getByTestId("copyright-text");
    expect(typographyElement).toBeInTheDocument();
  });
  test("should render a link with correct text", () => {
    render(<Copyright />);

    const linkElement = screen.getByRole("link", { name: /Kailash/i });
    expect(linkElement).toHaveTextContent("Kailash");
  });
});
