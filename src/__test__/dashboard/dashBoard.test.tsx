import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { BrowserRouter as Router } from "react-router-dom";
import DashBoard from "../../components/dashboard/dashBoard";
// Mock components
vi.mock("../../components/dashboard/dashboardSkeleton", () => ({
  default: () => <div>Loading...</div>,
}));

vi.mock("../../components/dashboard/recipeCard", () => ({
  default: ({ onEdit, onDelete }: any) => (
    <div>
      <div>Recipe Card</div>
      <button onClick={onEdit}>Edit</button>
      <button onClick={onDelete}>Delete</button>
    </div>
  ),
}));

vi.mock("../../components/dashboard/submitRecipe", () => ({
  default: (props: any) => (
    <div>{props.addItem && <div>SubmitRecipe</div>}</div>
  ),
}));

// Mock data fetching function
vi.mock("../../utils/recipe_service/recipe", () => ({
  getRecipes: vi.fn().mockResolvedValue({
    data: [1, 2, 3], // Simulate some recipe data
  }),
}));

describe("DashBoard", () => {
  it("renders without crashing and shows the loading state initially", () => {
    render(
      <Router>
        <DashBoard />
      </Router>
    );
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders recipe cards when data is available", async () => {
    render(
      <Router>
        <DashBoard />
      </Router>
    );

    // Wait for the recipe cards to be rendered
    await waitFor(() => {
      expect(screen.getAllByText("Recipe Card")).toHaveLength(3); // Adjust based on the number of recipe cards
    });
  });

  it("triggers dialog open when adding a recipe", async () => {
    render(
      <Router>
        <DashBoard />
      </Router>
    );

    // Open dialog
    const addRecipeButton = await screen.findByText("Add Your Recipe");
    fireEvent.click(addRecipeButton);
    expect(await screen.findByText("SubmitRecipe")).toBeInTheDocument(); // Assumes dialog is rendered
  });
  it("renders recipe cards when data is available", async () => {
    render(
      <Router>
        <DashBoard />
      </Router>
    );

    // Wait for the recipe cards to be rendered
    await waitFor(() => {
      expect(screen.getAllByText("Recipe Card")).toHaveLength(3); // Adjust based on the number of recipe cards
    });
  });
  it("renders without crashing and shows the loading state initially", () => {
    render(
      <Router>
        <DashBoard />
      </Router>
    );
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });
});
