import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import App from "./App.js";
import React from "react";
import { useFerroUIStream } from "@ferroui/renderer";
import { actionRouter } from "../../web/src/services/ActionRouter.js";

// Mock dependencies
vi.mock("@ferroui/renderer", () => ({
  useFerroUIStream: vi.fn(),
  FerroUIRenderer: ({ layout }: any) => (
    <div data-testid="ferro-ui-renderer">{JSON.stringify(layout.layout)}</div>
  ),
}));

vi.mock("../../web/src/services/ActionRouter.js", () => ({
  actionRouter: {
    setContext: vi.fn(),
  },
}));

describe("Desktop App", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders loading state", () => {
    vi.mocked(useFerroUIStream).mockReturnValue({
      layout: null,
      loading: true,
      error: null,
      send: vi.fn(),
    } as any);

    render(<App />);
    expect(screen.getByText("Streaming Layout...")).toBeDefined();
  });

  it("renders error state and handles refresh", () => {
    const sendMock = vi.fn();
    vi.mocked(useFerroUIStream).mockReturnValue({
      layout: null,
      loading: false,
      error: new Error("Failed to connect"),
      send: sendMock,
    } as any);

    render(<App />);
    expect(screen.getByText("Engine Connection Error")).toBeDefined();
    expect(screen.getByText("Failed to connect")).toBeDefined();

    fireEvent.click(screen.getByText("Retry Connection"));
    expect(sendMock).toHaveBeenCalled();
  });

  it("renders layout and sets actionRouter context", () => {
    vi.mocked(useFerroUIStream).mockReturnValue({
      layout: { layout: { type: "button", props: { label: "Click Me" } } },
      loading: false,
      error: null,
      send: vi.fn(),
    } as any);

    render(<App />);

    expect(screen.getByTestId("ferro-ui-renderer")).toBeDefined();
    expect(screen.getByTestId("ferro-ui-renderer").textContent).toContain(
      "Click Me",
    );

    expect(actionRouter.setContext).toHaveBeenCalled();
  });

  it("handles toasts and navigation through actionRouter context", () => {
    vi.useFakeTimers();
    vi.mocked(useFerroUIStream).mockReturnValue({
      layout: { layout: { type: "button" } },
      loading: false,
      error: null,
      send: vi.fn(),
    } as any);

    render(<App />);

    // Get the context that was passed to actionRouter
    const setContextCall = vi.mocked(actionRouter.setContext).mock.calls[0][0];

    // Test navigation
    const pushStateSpy = vi.spyOn(window.history, "pushState");
    setContextCall.navigate("/new-path", { param: 1 });
    expect(pushStateSpy).toHaveBeenCalledWith({ param: 1 }, "", "/new-path");

    // Test toast
    act(() => {
      setContextCall.showToast("Success Toast", "success");
    });

    expect(screen.getByText("Success Toast")).toBeDefined();
    expect(screen.getByText("Success Toast").className).toContain(
      "bg-green-600",
    );

    // Test different toast variants
    act(() => {
      setContextCall.showToast("Error Toast", "error");
      setContextCall.showToast("Warning Toast", "warning");
      setContextCall.showToast("Info Toast", "info");
    });

    expect(screen.getByText("Error Toast").className).toContain("bg-red-600");
    expect(screen.getByText("Warning Toast").className).toContain(
      "bg-yellow-600",
    );
    expect(screen.getByText("Info Toast").className).toContain("bg-blue-600");

    // Fast-forward timers to check toast removal
    act(() => {
      vi.advanceTimersByTime(3500);
    });

    expect(screen.queryByText("Success Toast")).toBeNull();

    vi.useRealTimers();
  });

  it("handles string errors", () => {
    vi.mocked(useFerroUIStream).mockReturnValue({
      layout: null,
      loading: false,
      error: "String Error Message",
      send: vi.fn(),
    } as any);

    render(<App />);
    expect(screen.getByText("String Error Message")).toBeDefined();
  });

  it("handles empty error object (Unknown error)", () => {
    vi.mocked(useFerroUIStream).mockReturnValue({
      layout: null,
      loading: false,
      error: {},
      send: vi.fn(),
    } as any);

    render(<App />);
    expect(screen.getByText("Unknown error")).toBeDefined();
  });
});
