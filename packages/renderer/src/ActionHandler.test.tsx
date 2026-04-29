import { describe, it, expect, vi, beforeEach } from "vitest";
import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { ActionHandler } from "./ActionHandler.js";

// Mock ActionSchema from @ferroui/schema
vi.mock("@ferroui/schema", () => ({
  ActionSchema: {
    parse: vi.fn((val) => val),
  },
}));

describe("ActionHandler", () => {
  const onNavigate = vi.fn();
  const onToast = vi.fn();
  const onRefresh = vi.fn();
  const onToolCall = vi.fn();
  const onStateUpdate = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderWithActions = (children: React.ReactNode) => {
    return render(
      <ActionHandler
        onNavigate={onNavigate}
        onToast={onToast}
        onRefresh={onRefresh}
        onToolCall={onToolCall}
        onStateUpdate={onStateUpdate}
      >
        {children}
      </ActionHandler>,
    );
  };

  it("renders children correctly", () => {
    renderWithActions(<div data-testid="child">Child</div>);
    expect(screen.getByTestId("child")).toBeDefined();
  });

  it("handles NAVIGATE action", () => {
    const action = {
      type: "NAVIGATE",
      payload: { path: "/home", params: { id: 1 } },
    };
    renderWithActions(
      <button data-testid="btn" data-ferroui-action={JSON.stringify(action)}>
        Click me
      </button>,
    );

    fireEvent.click(screen.getByTestId("btn"));
    expect(onNavigate).toHaveBeenCalledWith("/home", { id: 1 });
  });

  it("handles SHOW_TOAST action", () => {
    const action = {
      type: "SHOW_TOAST",
      payload: { message: "Success", variant: "success", duration: 3000 },
    };
    renderWithActions(
      <button data-testid="btn" data-ferroui-action={JSON.stringify(action)}>
        Click me
      </button>,
    );

    fireEvent.click(screen.getByTestId("btn"));
    expect(onToast).toHaveBeenCalledWith("Success", "success", 3000);
  });

  it("handles REFRESH action", () => {
    const action = { type: "REFRESH", payload: { force: true } };
    renderWithActions(
      <button data-testid="btn" data-ferroui-action={JSON.stringify(action)}>
        Click me
      </button>,
    );

    fireEvent.click(screen.getByTestId("btn"));
    expect(onRefresh).toHaveBeenCalledWith({ force: true });
  });

  it("handles TOOL_CALL action", () => {
    const action = {
      type: "TOOL_CALL",
      payload: { tool: "calculator", args: { x: 1, y: 2 } },
    };
    renderWithActions(
      <button data-testid="btn" data-ferroui-action={JSON.stringify(action)}>
        Click me
      </button>,
    );

    fireEvent.click(screen.getByTestId("btn"));
    expect(onToolCall).toHaveBeenCalledWith("calculator", { x: 1, y: 2 });
  });

  it("handles STATE_UPDATE action", () => {
    const action = {
      type: "STATE_UPDATE",
      payload: { id: "comp-1", state: { active: true } },
    };
    renderWithActions(
      <button data-testid="btn" data-ferroui-action={JSON.stringify(action)}>
        Click me
      </button>,
    );

    fireEvent.click(screen.getByTestId("btn"));
    expect(onStateUpdate).toHaveBeenCalledWith(
      "comp-1",
      JSON.stringify({ active: true }),
    );
  });

  it("ignores clicks without data-ferroui-action", () => {
    renderWithActions(<button data-testid="btn">No action</button>);

    fireEvent.click(screen.getByTestId("btn"));
    expect(onNavigate).not.toHaveBeenCalled();
  });

  it("handles invalid JSON in data-ferroui-action", () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    renderWithActions(
      <button data-testid="btn" data-ferroui-action="invalid-json">
        Click me
      </button>,
    );

    fireEvent.click(screen.getByTestId("btn"));
    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining("Invalid action schema"),
      expect.anything(),
    );
    consoleSpy.mockRestore();
  });

  it("handles empty data-ferroui-action attribute", () => {
    renderWithActions(
      <button data-testid="btn" data-ferroui-action="">
        Click me
      </button>,
    );

    fireEvent.click(screen.getByTestId("btn"));
    expect(onNavigate).not.toHaveBeenCalled();
  });

  it("traverses up to find data-ferroui-action", () => {
    const action = { type: "NAVIGATE", payload: { path: "/nested" } };
    renderWithActions(
      <div data-ferroui-action={JSON.stringify(action)}>
        <button data-testid="btn">Nested click</button>
      </div>,
    );

    fireEvent.click(screen.getByTestId("btn"));
    expect(onNavigate).toHaveBeenCalledWith("/nested", undefined);
  });
});
