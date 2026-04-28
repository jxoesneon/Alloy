import { registerComponent } from "../registry.js";
import { ComponentTier } from "@ferroui/schema";
import React from "react";

// SSO Login Component for Enterprise (E.1)
export const SSOLogin = ({ providers = ["okta", "google", "azure"] }) => {
  return React.createElement(
    "div",
    { className: "ferroui-sso-login" },
    providers.map((p) =>
      React.createElement(
        "button",
        { key: p, className: `sso-button sso-button--${p}` },
        `Login with ${p}`,
      ),
    ),
  );
};

registerComponent({
  name: "SSOLogin",
  version: 1,
  tier: ComponentTier.MOLECULE,
  component: SSOLogin,
  schema: {
    type: "object",
    properties: { providers: { type: "array", items: { type: "string" } } },
  },
});
