import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import React, { act } from "react";
import { render, screen, waitFor, cleanup } from "@testing-library/react";
import { FerroUIRenderer } from "./FerroUIRenderer.js";
import { registry } from "@ferroui/registry";

// Mock registry
vi.mock("@ferroui/registry", () => ({
  registry: {
    getComponentEntry: vi
      .fn()
      .mockReturnValue({ component: (props: any) => <div {...props} /> }),
  },
}));

// Mock TextEncoder
globalThis.TextEncoder = class {
  encode(s: string) {
    return new Uint8Array([...s].map((c) => c.charCodeAt(0)));
  }
} as any;

// Mock atob (simple mock for tests)
globalThis.atob = vi.fn((s: string) => s);

describe("FerroUIRenderer (C2PA)", () => {
  const mockLayout = {
    schemaVersion: "1.1.0",
    requestId: "123",
    locale: "en-US",
    layout: { type: "Box", props: { "data-testid": "box" } },
    metadata: {
      signature: "bW9jay1zaWduYXR1cmU=", // 'mock-signature' in b64
      publicKey:
        "-----BEGIN PUBLIC KEY-----bW9jay1wdWJsaWMta2V5-----END PUBLIC KEY-----", // 'mock-public-key' in b64
    },
  };

  beforeEach(() => {
    vi.resetAllMocks();

    // Default registry behavior: return a simple div component
    vi.mocked(registry.getComponentEntry).mockReturnValue({
      component: (props: any) => <div {...props} />,
    } as any);

    // Mock window.crypto
    const mockCrypto = {
      subtle: {
        importKey: vi.fn().mockResolvedValue({}),
        verify: vi.fn().mockResolvedValue(true),
      },
    };

    // Stub global crypto
    vi.stubGlobal("crypto", mockCrypto);

    // If in JSDOM, ensure window.crypto is also mocked
    if (typeof window !== "undefined") {
      Object.defineProperty(window, "crypto", {
        value: mockCrypto,
        configurable: true,
      });
    }
  });

  afterEach(() => {
    cleanup();
  });

  it("displays the verified badge when strictProvenance is true and signature is valid", async () => {
    await act(async () => {
      render(<FerroUIRenderer layout={mockLayout as any} strictProvenance />);
    });

    await waitFor(() => {
      expect(screen.getByText("Provenance Verified")).toBeDefined();
    });
  });

  it("displays the unverified badge when signature is invalid", async () => {
    // @ts-expect-error - mocking global
    crypto.subtle.verify.mockResolvedValue(false);

    await act(async () => {
      render(<FerroUIRenderer layout={mockLayout as any} strictProvenance />);
    });

    await waitFor(() => {
      expect(screen.getByText("Provenance Unverified")).toBeDefined();
    });
  });

  it("does not display the badge when strictProvenance is false", async () => {
    await act(async () => {
      render(
        <FerroUIRenderer layout={mockLayout as any} strictProvenance={false} />,
      );
    });

    expect(screen.queryByText(/Provenance/)).toBeNull();
  });

  it("displays unverified when signature or public key is missing and strictProvenance is true", async () => {
    const layoutNoSig = { ...mockLayout, metadata: {} };
    await act(async () => {
      render(<FerroUIRenderer layout={layoutNoSig as any} strictProvenance />);
    });

    expect(screen.getByText("Provenance Unverified")).toBeDefined();
  });

  describe("Comprehensive Rendering", () => {
    it("renders a direct component tree (not full layout)", () => {
      const componentTree = { type: "Button", props: { "data-testid": "btn" } };
      render(<FerroUIRenderer layout={componentTree as any} />);
      expect(screen.getByTestId("btn")).toBeDefined();
    });

    it("maps ARIA props correctly", () => {
      const layoutWithAria = {
        type: "Box",
        aria: {
          label: "Test Label",
          role: "region",
          live: "polite" as const,
          hidden: true,
          labelledBy: "id1",
          describedBy: "id2",
        },
      };
      render(<FerroUIRenderer layout={layoutWithAria as any} />);
      const box = screen.getByRole("region", { hidden: true });
      expect(box.getAttribute("aria-label")).toBe("Test Label");
      expect(box.getAttribute("aria-live")).toBe("polite");
      expect(box.getAttribute("aria-hidden")).toBe("true");
      expect(box.getAttribute("aria-labelledby")).toBe("id1");
      expect(box.getAttribute("aria-describedby")).toBe("id2");
    });

    it("uses custom fallback component when type is unknown", () => {
      vi.mocked(registry.getComponentEntry).mockReturnValue(undefined as any);
      const Fallback = ({ type }: { type: string }) => (
        <div data-testid="custom-fallback">{type}</div>
      );

      render(
        <FerroUIRenderer
          layout={{ type: "Unknown" } as any}
          fallback={Fallback}
        />,
      );
      expect(screen.getByTestId("custom-fallback")).toBeDefined();
      expect(screen.getByText("Unknown")).toBeDefined();
    });

    it("applies overrides with priority", () => {
      const Override = () => <div data-testid="override">Override</div>;
      const overrides = { Box: Override };

      render(
        <FerroUIRenderer
          layout={{ type: "Box" } as any}
          overrides={overrides}
        />,
      );
      expect(screen.getByTestId("override")).toBeDefined();
    });

    it("handles state machine updates", async () => {
      const layoutWithSM = {
        id: "sm-node",
        type: "Box",
        stateMachine: {
          initial: "idle",
          states: {
            idle: {
              render: { type: "Box", props: { "data-testid": "idle-state" } },
            },
            active: {
              render: { type: "Box", props: { "data-testid": "active-state" } },
            },
          },
        },
      };

      render(<FerroUIRenderer layout={layoutWithSM as any} />);
      expect(screen.getByTestId("idle-state")).toBeDefined();

      // Dispatch state update event
      await act(async () => {
        window.dispatchEvent(
          new CustomEvent("ferroui-state-update", {
            detail: { componentId: "sm-node", newState: "active" },
          }),
        );
      });

      expect(screen.getByTestId("active-state")).toBeDefined();
    });

    it("renders recursively", () => {
      const recursiveLayout = {
        type: "Box",
        props: { "data-testid": "parent" },
        children: [
          { type: "Box", props: { "data-testid": "child-1" } },
          { type: "Box", props: { "data-testid": "child-2" } },
        ],
      };
      render(<FerroUIRenderer layout={recursiveLayout as any} />);
      expect(screen.getByTestId("parent")).toBeDefined();
      expect(screen.getByTestId("child-1")).toBeDefined();
      expect(screen.getByTestId("child-2")).toBeDefined();
    });

    it("passes action to data-ferroui-action attribute", () => {
      const action = { type: "NAVIGATE", payload: { path: "/" } };
      const layoutWithAction = {
        type: "Box",
        props: { "data-testid": "box" },
        action,
      };

      render(<FerroUIRenderer layout={layoutWithAction as any} />);
      const box = screen.getByTestId("box");
      expect(box.getAttribute("data-ferroui-action")).toBe(
        JSON.stringify(action),
      );
    });
  });
});
