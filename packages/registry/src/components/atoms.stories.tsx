import type { Meta, StoryObj } from "@storybook/react";
import { Text, Icon, Badge, Button } from "./atoms.js";

const meta: Meta<typeof Text> = {
  title: "Atoms/Text",
  component: Text,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["heading1", "heading2", "heading3", "body", "caption"],
    },
    color: {
      control: "select",
      options: ["default", "muted", "primary", "danger", "success"],
    },
  },
};

export default meta;

type Story = StoryObj<typeof Text>;

export const Body: Story = {
  args: {
    content: "This is a body text.",
    variant: "body",
    color: "default",
  },
};

export const Heading1: Story = {
  args: {
    content: "Heading 1",
    variant: "heading1",
    color: "primary",
  },
};

export const MutedCaption: Story = {
  args: {
    content: "This is a muted caption.",
    variant: "caption",
    color: "muted",
  },
};

// --- Icon Stories ---

export const IconMeta: Meta<typeof Icon> = {
  title: "Atoms/Icon",
  component: Icon,
  argTypes: {
    size: {
      control: "radio",
      options: ["sm", "md", "lg"],
    },
  },
};

export const StandardIcon: StoryObj<typeof Icon> = {
  args: {
    name: "user",
    size: "md",
  },
};

// --- Badge Stories ---

export const BadgeMeta: Meta<typeof Badge> = {
  title: "Atoms/Badge",
  component: Badge,
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "primary", "success", "warning", "danger"],
    },
  },
};

export const PrimaryBadge: StoryObj<typeof Badge> = {
  args: {
    content: "Active",
    variant: "primary",
  },
};

export const SuccessBadge: StoryObj<typeof Badge> = {
  args: {
    content: "Success",
    variant: "success",
  },
};
