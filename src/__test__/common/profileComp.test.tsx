import { render, screen } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import Profile from "../../components/common/profileComp"; // Adjust the import path

describe("Profile", () => {
  test("should render profile cards for each profile", () => {
    render(<Profile />);

    // Check if the number of profile cards matches the length of the profiles array
    const profileCards = screen.getAllByRole("img"); // Assuming images are used in the cards
    expect(profileCards).toHaveLength(8); // Based on the number of profiles
  });
  test("should render the correct name and title in each profile card", () => {
    render(<Profile />);

    // Verify that profile names and titles are displayed correctly
    expect(screen.getByText("Srinivas Basha")).toBeInTheDocument();
    expect(screen.getByText("Team Lead (Full Stack)")).toBeInTheDocument();

    expect(screen.getByText("Anish Roshan")).toBeInTheDocument();
  });
});
