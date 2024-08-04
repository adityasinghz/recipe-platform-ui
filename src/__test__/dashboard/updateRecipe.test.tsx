import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import UpdateRecipe from "../../components/dashboard/updateRecipe";

// Mocking the necessary props
const mockSetItem = vi.fn();
const mockFetchData = vi.fn();
const mockRecipe = {
  recipeId: "1",
  imageToken: "http://example.com/image.jpg",
  recipeName: "Test Recipe",
  cuisine: "Italian",
  recipeDescription: "This is a test recipe.",
  category: "Main Course",
  cookingTime: 30,
  dietaryRestrictions: "None",
  difficulty: "Easy",
  ingredients: ["Flour", "Sugar"],
  tags: ["Vegan", "Healthy"],
};

it("should render the Update Recipe dialog", () => {
  render(
    <UpdateRecipe
      addItem={true}
      setItem={mockSetItem}
      recipe={mockRecipe}
      fetchData={mockFetchData}
    />
  );

  // Check if the dialog is open and title is rendered
  expect(screen.getByText("Update Your Recipe")).toBeInTheDocument();
});

it("should render the Update button", () => {
  render(
    <UpdateRecipe
      addItem={true}
      setItem={mockSetItem}
      recipe={mockRecipe}
      fetchData={mockFetchData}
    />
  );

  // Check if the Update button is rendered
  expect(screen.getByText("Update")).toBeInTheDocument();
});

it("should render the Cancel button", () => {
  render(
    <UpdateRecipe
      addItem={true}
      setItem={mockSetItem}
      recipe={mockRecipe}
      fetchData={mockFetchData}
    />
  );

  // Check if the Cancel button is rendered
  expect(screen.getByLabelText("close")).toBeInTheDocument();
});

it("should render the Cancel button", () => {
  render(
    <UpdateRecipe
      addItem={true}
      setItem={mockSetItem}
      recipe={mockRecipe}
      fetchData={mockFetchData}
    />
  );

  // Check if the Cancel button is rendered
  expect(screen.getByLabelText("close")).toBeInTheDocument();
});

it("should render image preview when image is provided", async () => {
  render(
    <UpdateRecipe
      addItem={true}
      setItem={mockSetItem}
      recipe={mockRecipe}
      fetchData={mockFetchData}
    />
  );

  // Check if image preview is rendered
  const image = await screen.findByAltText("Uploaded Preview");
  expect(image).toBeInTheDocument();
});

it("should render the ingredients select field", () => {
  render(
    <UpdateRecipe
      addItem={true}
      setItem={mockSetItem}
      recipe={mockRecipe}
      fetchData={mockFetchData}
    />
  );

  // Check if the ingredients select field is rendered
  expect(screen.getByLabelText("Ingredients")).toBeInTheDocument();
});

it("should disable the Update button when the form is invalid", () => {
  render(
    <UpdateRecipe
      addItem={true}
      setItem={mockSetItem}
      recipe={mockRecipe}
      fetchData={mockFetchData}
    />
  );

  // Ensure the Update button is disabled initially
  expect(screen.getByText("Update")).toBeDisabled();
});
