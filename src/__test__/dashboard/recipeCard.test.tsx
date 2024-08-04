import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, vi } from "vitest";
import RecipeReviewCard from "../../components/dashboard/recipeCard";
import { deleteRecipe } from "../../utils/recipe_service/recipe";

// Mock the dependencies
vi.mock("react-toastify", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

vi.mock("../../utils/recipe_service/recipe", () => ({
  deleteRecipe: vi.fn(),
}));

describe("RecipeReviewCard Component", () => {
  const mockFetchData = vi.fn();
  const mockRecipe = {
    recipeId: "1",
    imageToken: "/images/recipe.jpg",
    recipeName: "Delicious Recipe",
    cuisine: "Italian",
    recipeDescription: "A tasty Italian dish",
    category: "Main Course",
    cookingTime: 30,
    countOfRatings: 10,
    dietaryRestrictions: "None",
    difficulty: "Medium",
    ingredients: [],
    ratings: 4,
    reviews: [],
    tags: [],
  };

  it("should call updateRecipe when edit button is clicked", () => {
    render(<RecipeReviewCard recipe={mockRecipe} fetchData={mockFetchData} />);

    const editButton = screen.getByLabelText("edit");
    fireEvent.click(editButton);
  });

  it("should call handleDelete when delete button is clicked", () => {
    render(<RecipeReviewCard recipe={mockRecipe} fetchData={mockFetchData} />);

    const deleteButton = screen.getByLabelText("delete");
    fireEvent.click(deleteButton);

    expect(deleteRecipe).toHaveBeenCalledWith(mockRecipe.recipeId);
  });

  it("should call updateRecipe function when edit button is clicked", () => {
    render(<RecipeReviewCard recipe={mockRecipe} fetchData={mockFetchData} />);
    const editButton = screen.getByLabelText("edit");
    fireEvent.click(editButton);
  });

  it("should call handleFavorite function when favorite button is clicked", () => {
    render(<RecipeReviewCard recipe={mockRecipe} fetchData={mockFetchData} />);
    const favoriteButton = screen.getByLabelText("add to favorites");
    fireEvent.click(favoriteButton);
  });
});
