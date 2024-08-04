import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import SubmitRecipe from "../../components/dashboard/submitRecipe";
// Mock dependencies
vi.mock("react-toastify", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

vi.mock("../../utils/recipe_service/recipe", () => ({
  createRecipe: vi.fn(),
}));

describe("SubmitRecipe Component", () => {
  const mockFetchData = vi.fn();
  const mockSetItem = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render the component and show initial elements", () => {
    render(
      <SubmitRecipe
        fetchData={mockFetchData}
        addItem={true}
        setItem={mockSetItem}
      />
    );

    // Check if the title and close button are rendered
    expect(screen.getByText("Add Your Recipe")).toBeInTheDocument();
    expect(screen.getByLabelText("close")).toBeInTheDocument();
  });

  it("should close the dialog and reset form on cancel", () => {
    render(
      <SubmitRecipe
        fetchData={mockFetchData}
        addItem={true}
        setItem={mockSetItem}
      />
    );

    // Click on close button
    fireEvent.click(screen.getByLabelText("close"));

    // Ensure setItem is called to close the dialog
    expect(mockSetItem).toHaveBeenCalledWith(false);
  });

  it("should handle close button click", () => {
    render(
      <SubmitRecipe
        fetchData={mockFetchData}
        addItem={true}
        setItem={mockSetItem}
      />
    );

    // Click on the close button
    fireEvent.click(screen.getByLabelText("close"));

    // Ensure setItem is called to close the dialog
    expect(mockSetItem).toHaveBeenCalledWith(false);
  });

  it("should handle close button click", () => {
    render(
      <SubmitRecipe
        fetchData={mockFetchData}
        addItem={true}
        setItem={mockSetItem}
      />
    );

    // Click on the close button
    fireEvent.click(screen.getByLabelText("close"));

    // Ensure setItem is called to close the dialog
    expect(mockSetItem).toHaveBeenCalledWith(false);
  });
  it("should close the dialog and reset form on cancel", () => {
    render(
      <SubmitRecipe
        fetchData={mockFetchData}
        addItem={true}
        setItem={mockSetItem}
      />
    );

    // Click on close button
    fireEvent.click(screen.getByLabelText("close"));

    // Ensure setItem is called to close the dialog
    expect(mockSetItem).toHaveBeenCalledWith(false);
  });

  it("should render the component and show initial elements", () => {
    render(
      <SubmitRecipe
        fetchData={mockFetchData}
        addItem={true}
        setItem={mockSetItem}
      />
    );

    // Check if the title and close button are rendered
    expect(screen.getByText("Add Your Recipe")).toBeInTheDocument();
    expect(screen.getByLabelText("close")).toBeInTheDocument();
  });
  it("should render the ingredients input field", () => {
    render(
      <SubmitRecipe
        fetchData={mockFetchData}
        addItem={true}
        setItem={mockSetItem}
      />
    );

    // Check if the ingredients input field is rendered
    expect(screen.getByLabelText("Ingredients")).toBeInTheDocument();
  });
  it("should render the ingredients input field", () => {
    render(
      <SubmitRecipe
        fetchData={mockFetchData}
        addItem={true}
        setItem={mockSetItem}
      />
    );

    // Check if the ingredients input field is rendered
    expect(screen.getByLabelText("Ingredients")).toBeInTheDocument();
  });
  it("should render the Save button", () => {
    render(
      <SubmitRecipe
        fetchData={mockFetchData}
        addItem={true}
        setItem={mockSetItem}
      />
    );

    // Check if the Save button is rendered
    expect(screen.getByText("Save")).toBeInTheDocument();
  });

  it("should disable the Save button when the recipe name is empty", () => {
    render(
      <SubmitRecipe
        fetchData={mockFetchData}
        addItem={true}
        setItem={mockSetItem}
      />
    );

    // Ensure the Save button is disabled initially
    expect(screen.getByText("Save")).toBeDisabled();
  });
});
