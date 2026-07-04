import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Accordion from "../Accordion";
import { AccordionGroup } from "@/types";

vi.mock("next/image", () => ({
  default: ({ alt }: { alt: string }) => <img alt={alt} />,
}));

vi.mock("next/font/google", () => ({
  Noto_Sans: () => ({ className: "mock-noto-sans" }),
  Noto_Sans_Display: () => ({ className: "mock-noto-sans-display" }),
  Teko: () => ({ className: "mock-teko" }),
}));

const groups: Array<AccordionGroup<string, string>> = [
  {
    id: "group-1",
    title: "Group One",
    subtext: "First group",
    options: [
      {
        id: "option-1",
        title: "Option One",
        subtext: "First option",
        data: "a",
      },
      {
        id: "option-2",
        title: "Option Two",
        subtext: "Second option",
        data: "b",
      },
    ],
  },
  {
    id: "group-2",
    title: "Group Two",
    subtext: "Second group",
    options: [
      {
        id: "option-3",
        title: "Option Three",
        subtext: "Third option",
        data: "c",
      },
    ],
  },
];

describe("Accordion", () => {
  it("renders without crashing when no selection props are given", () => {
    const { container } = render(<Accordion groups={groups} />);
    expect(container).toBeTruthy();
  });

  it("does not render any group's options when selectedGroupId is not provided", () => {
    render(<Accordion groups={groups} />);
    expect(screen.queryByText("Option One")).toBeNull();
  });

  it("renders only the options of the group matching selectedGroupId", () => {
    render(<Accordion groups={groups} selectedGroupId="group-1" />);
    expect(screen.getByText("Option One")).toBeTruthy();
    expect(screen.getByText("Option Two")).toBeTruthy();
    expect(screen.queryByText("Option Three")).toBeNull();
  });

  it("calls onGroupClick with the clicked group", () => {
    const onGroupClick = vi.fn();
    render(<Accordion groups={groups} onGroupClick={onGroupClick} />);
    fireEvent.click(screen.getByText("Group Two"));
    expect(onGroupClick).toHaveBeenCalledWith(groups[1]);
  });

  it("calls onOptionClick with the clicked option", () => {
    const onOptionClick = vi.fn();
    render(
      <Accordion
        groups={groups}
        selectedGroupId="group-1"
        onOptionClick={onOptionClick}
      />,
    );
    fireEvent.click(screen.getByText("Option Two"));
    expect(onOptionClick).toHaveBeenCalledWith(groups[0].options[1]);
  });

  it("marks the option matching selectedOptionId as selected", () => {
    render(
      <Accordion
        groups={groups}
        selectedGroupId="group-1"
        selectedOptionId="option-2"
      />,
    );
    const optionEl = screen.getByText("Option Two").closest("li");
    expect(optionEl?.className).toContain("border-y-yellow");
    const otherOptionEl = screen.getByText("Option One").closest("li");
    expect(otherOptionEl?.className).not.toContain("border-y-yellow");
  });

  it("does not throw when onGroupClick/onOptionClick are omitted", () => {
    render(<Accordion groups={groups} selectedGroupId="group-1" />);
    expect(() => {
      fireEvent.click(screen.getByText("Group One"));
      fireEvent.click(screen.getByText("Option One"));
    }).not.toThrow();
  });
});
