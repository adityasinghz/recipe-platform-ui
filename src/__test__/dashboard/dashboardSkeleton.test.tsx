import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import DashboardSkeleton from "../../components/dashboard/dashboardSkeleton";

describe("DashboardSkeleton Component", () => {
  it("renders all skeleton components", () => {
    render(<DashboardSkeleton />);

    // Check if Skeleton for Drawer is rendered
    expect(screen.getByTestId("drawer-skeleton")).toBeInTheDocument();

    // Check if Skeleton for AppBar is rendered
    expect(screen.getByTestId("appbar-skeleton")).toBeInTheDocument();

    // Check if skeletons for circular items are rendered
    const circularSkeletons = screen.getAllByTestId(/^circular-skeleton-/);
    expect(circularSkeletons).toHaveLength(6);

    // Check if skeletons for rectangular items are rendered
    const rectangularSkeletons = screen.getAllByTestId(
      /^rectangular-skeleton-/
    );
    expect(rectangularSkeletons).toHaveLength(8);
  });

  it("renders skeletons with correct number of items", () => {
    render(<DashboardSkeleton />);

    // Check for the number of circular and rectangular skeletons
    expect(screen.getAllByTestId(/^circular-skeleton-/)).toHaveLength(6);
    expect(screen.getAllByTestId(/^rectangular-skeleton-/)).toHaveLength(8);
  });
});
