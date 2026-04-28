import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Dashboard, KPIBoard, DataTable } from "./organisms.js";
import { StatBadge } from "./molecules.js";

const meta: Meta<typeof Dashboard> = {
  title: "Organisms/Dashboard",
  component: Dashboard,
  tags: ["autodocs"],
};

export default meta;

export const EmptyDashboard: StoryObj<typeof Dashboard> = {
  args: {
    title: "System Overview",
    aria: { label: "System Dashboard", role: "main" },
  },
};

// --- KPIBoard Stories ---

export const KPIBoardMeta: Meta<typeof KPIBoard> = {
  title: "Organisms/KPIBoard",
  component: KPIBoard,
};

export const StandardKPIBoard: StoryObj<typeof KPIBoard> = {
  args: {
    title: "Quick Stats",
    columns: 3,
    aria: { label: "KPI Board" },
  },
  render: (args) => (
    <KPIBoard {...args}>
      <StatBadge
        title="Users"
        value="1,240"
        trend="up"
        aria={{ label: "Users up" }}
      />
      <StatBadge
        title="Latency"
        value="45ms"
        trend="flat"
        aria={{ label: "Latency stable" }}
      />
      <StatBadge
        title="Errors"
        value="0.01%"
        trend="down"
        aria={{ label: "Errors down" }}
      />
    </KPIBoard>
  ),
};

// --- DataTable Stories ---

export const DataTableMeta: Meta<typeof DataTable> = {
  title: "Organisms/DataTable",
  component: DataTable,
};

export const UserTable: StoryObj<typeof DataTable> = {
  args: {
    caption: "Recent User Signups",
    aria: { label: "User Table" },
    columns: [
      { key: "name", header: "Full Name", isSortable: false },
      { key: "email", header: "Email Address", isSortable: false },
      { key: "status", header: "Account Status", isSortable: false },
    ],
    rows: [
      { name: "John Doe", email: "john@example.com", status: "Active" },
      { name: "Jane Smith", email: "jane@example.com", status: "Pending" },
      { name: "Bob Johnson", email: "bob@example.com", status: "Disabled" },
    ],
  },
};
