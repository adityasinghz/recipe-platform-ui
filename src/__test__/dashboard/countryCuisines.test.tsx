import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Cuisines from "../../components/dashboard/countryCuisines";

describe("Cuisines Component", () => {
  it("applies correct styles to the circular buttons", () => {
    render(<Cuisines />);

    const buttons = screen.getAllByRole("button");
    buttons.forEach((button) => {
      expect(button).toHaveStyle("border-radius: 50%");
      expect(button).toHaveStyle("width: 200px");
      expect(button).toHaveStyle("height: 200px");
    });
  });

  it("shows hover effects correctly", () => {
    render(<Cuisines />);

    const buttons = screen.getAllByRole("button");
    buttons.forEach((button) => {
      fireEvent.mouseOver(button);
      expect(button).toHaveStyle("z-index: 1");
    });
  });

  it("shows correct overlay text and styles", () => {
    render(<Cuisines />);

    const overlays = screen.getAllByText(/Indian|American|Chinese/i);
    overlays.forEach((overlay) => {
      expect(overlay).toHaveStyle("color: #fff");
      expect(overlay).toHaveStyle("border: 4px solid currentColor");
    });
  });
});
