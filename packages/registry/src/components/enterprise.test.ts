import { describe, it, expect, vi } from "vitest";
import { SSOLogin } from "./enterprise.js";
import React from "react";
import { render, screen } from "@testing-library/react";

describe("Enterprise Components", () => {
  describe("SSOLogin", () => {
    it("renders with default providers", () => {
      const { container } = render(React.createElement(SSOLogin as any));
      expect(container.querySelector(".ferroui-sso-login")).toBeDefined();
      expect(screen.getByText("Login with okta")).toBeDefined();
      expect(screen.getByText("Login with google")).toBeDefined();
      expect(screen.getByText("Login with azure")).toBeDefined();
    });

    it("renders with custom providers", () => {
      render(
        React.createElement(SSOLogin as any, {
          providers: ["github", "slack"],
        }),
      );
      expect(screen.getByText("Login with github")).toBeDefined();
      expect(screen.getByText("Login with slack")).toBeDefined();
      expect(screen.queryByText("Login with okta")).toBeNull();
    });
  });
});
