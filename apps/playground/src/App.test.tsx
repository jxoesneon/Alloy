import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";
import * as playgroundHook from "./hooks/usePlaygroundStream";

// Mock the renderer package
vi.mock("@ferroui/renderer", () => ({
  FerroUIRenderer: ({ layout }: any) => (
    <div data-testid="renderer">{JSON.stringify(layout)}</div>
  ),
}));

// Mock the hook
vi.mock("./hooks/usePlaygroundStream", () => ({
  usePlaygroundStream: vi.fn(),
}));

// Mock Monaco Editor
vi.mock("@monaco-editor/react", () => ({
  default: ({ value }: any) => <div data-testid="monaco-editor">{value}</div>,
}));

describe("Playground App", () => {
  const mockGenerate = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (playgroundHook.usePlaygroundStream as any).mockReturnValue({
      layout: null,
      status: "Ready",
      isGenerating: false,
      error: null,
      generate: mockGenerate,
    });
  });

  it("renders the playground header and initial state", () => {
    render(<App />);
    expect(screen.getByText("FerroUI Playground")).toBeDefined();
    expect(
      screen.getByPlaceholderText(/Describe the UI layout/i),
    ).toBeDefined();
    expect(screen.getByText("Ready")).toBeDefined();
  });

  it("submits a prompt and calls generate", async () => {
    render(<App />);
    const input = screen.getByPlaceholderText(/Describe the UI layout/i);
    const button = screen.getByRole("button", { name: /generate layout/i });

    fireEvent.change(input, { target: { value: "Create a login form" } });
    fireEvent.click(button);

    expect(mockGenerate).toHaveBeenCalledWith("Create a login form");
  });

  it("does not submit an empty prompt", async () => {
    render(<App />);
    const button = screen.getByRole("button", { name: /generate layout/i });

    fireEvent.click(button);
    expect(mockGenerate).not.toHaveBeenCalled();
  });

  it("displays generating state", () => {
    (playgroundHook.usePlaygroundStream as any).mockReturnValue({
      layout: null,
      status: "Phase 1: Drafting...",
      isGenerating: true,
      error: null,
      generate: mockGenerate,
    });

    render(<App />);
    expect(screen.getByText("Generating...")).toBeDefined();
    expect(screen.getByText("Phase 1: Drafting...")).toBeDefined();
  });

  it("displays error message", () => {
    (playgroundHook.usePlaygroundStream as any).mockReturnValue({
      layout: null,
      status: "Error",
      isGenerating: false,
      error: "Engine connection failed",
      generate: mockGenerate,
    });

    render(<App />);
    expect(screen.getByText("Engine connection failed")).toBeDefined();
  });

  it("renders the layout and monaco editor when available", () => {
    const mockLayout = { type: "Dashboard", children: [] };
    (playgroundHook.usePlaygroundStream as any).mockReturnValue({
      layout: mockLayout,
      status: "Generation complete",
      isGenerating: false,
      error: null,
      generate: mockGenerate,
    });

    render(<App />);
    expect(screen.getByTestId("renderer")).toBeDefined();
    expect(screen.getByTestId("monaco-editor")).toBeDefined();

    // Use a flexible matcher for JSON text to avoid whitespace issues
    const jsonContent = JSON.stringify(mockLayout, null, 2);
    expect(screen.getByTestId("monaco-editor").textContent?.trim()).toBe(
      jsonContent,
    );
  });
});
