import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import NavLinks from "../NavLinks";
import { NavItem } from "@/types";

// next/link renders an <a> tag in test environments
vi.mock("next/link", () => ({
  default: ({
    href,
    children,
    onClick,
  }: {
    href: string;
    children: React.ReactNode;
    onClick?: () => void;
  }) => (
    <a href={href} onClick={onClick}>
      {children}
    </a>
  ),
}));

const mockNavItems: NavItem[] = [
  { title: "Home", href: "/" },
  { title: "Events", href: "/events" },
  { title: "Music", href: "/music" },
  { title: "About", href: "/about" },
];

describe("NavLinks", () => {
  it("renders without crashing", () => {
    const { container } = render(<NavLinks items={mockNavItems} />);
    expect(container).toBeTruthy();
  });

  it("renders the correct number of child links", () => {
    render(<NavLinks items={mockNavItems} />);
    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(mockNavItems.length);
  });

  it("renders each nav item title as link text", () => {
    render(<NavLinks items={mockNavItems} />);
    for (const item of mockNavItems) {
      expect(screen.getByText(item.title)).toBeTruthy();
    }
  });

  it("renders each nav item with the correct href", () => {
    render(<NavLinks items={mockNavItems} />);
    for (const item of mockNavItems) {
      const link = screen.getByText(item.title).closest("a");
      expect(link?.getAttribute("href")).toBe(item.href);
    }
  });

  it("renders as a horizontal row by default (desktop layout)", () => {
    const { container } = render(<NavLinks items={mockNavItems} />);
    const ul = container.querySelector("ul");
    expect(ul?.className).toContain("flex-row");
  });

  it("renders as a vertical column when mobile=true", () => {
    const { container } = render(
      <NavLinks items={mockNavItems} mobile={true} />,
    );
    const ul = container.querySelector("ul");
    expect(ul?.className).toContain("flex-col");
  });

  it("renders zero links when given an empty items array", () => {
    render(<NavLinks items={[]} />);
    const links = screen.queryAllByRole("link");
    expect(links).toHaveLength(0);
  });
});
