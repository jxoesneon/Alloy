import type { Meta, StoryObj } from "@storybook/react";
import { StatBadge, UserAvatar, MetricRow, ActionButton } from "./molecules.js";

const meta: Meta<typeof StatBadge> = {
  title: "Molecules/StatBadge",
  component: StatBadge,
  tags: ["autodocs"],
};

export default meta;

export const UpTrend: StoryObj<typeof StatBadge> = {
  args: {
    title: "Revenue",
    value: "$12,450",
    trend: "up",
    aria: { label: "Revenue up" },
  },
};

export const DownTrend: StoryObj<typeof StatBadge> = {
  args: {
    title: "Churn",
    value: "2.4%",
    trend: "down",
    aria: { label: "Churn down" },
  },
};

// --- UserAvatar Stories ---

export const UserAvatarMeta: Meta<typeof UserAvatar> = {
  title: "Molecules/UserAvatar",
  component: UserAvatar,
};

export const LargeAvatar: StoryObj<typeof UserAvatar> = {
  args: {
    name: "Jane Doe",
    src: "https://i.pravatar.cc/150?u=jane",
    subtitle: "Project Manager",
    size: "lg",
    aria: { label: "Jane Doe, PM" },
  },
};

// --- MetricRow Stories ---

export const MetricRowMeta: Meta<typeof MetricRow> = {
  title: "Molecules/MetricRow",
  component: MetricRow,
};

export const StandardMetric: StoryObj<typeof MetricRow> = {
  args: {
    title: "Uptime",
    value: "99.9",
    unit: "%",
    aria: { label: "99.9% uptime" },
  },
};

// --- ActionButton Stories ---

export const ActionButtonMeta: Meta<typeof ActionButton> = {
  title: "Molecules/ActionButton",
  component: ActionButton,
};

export const GhostAction: StoryObj<typeof ActionButton> = {
  args: {
    content: "Settings",
    variant: "ghost",
    icon: "settings",
    aria: { label: "Settings" },
  },
};
