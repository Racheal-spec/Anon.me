import type { Meta, StoryObj } from "@storybook/react";
import Navbar from "./navbar";

const meta = {
  title: "app/components/Navbar",
  component: Navbar,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof Navbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const dashboard: Story = {
  args: {},
};

export const home: Story = {};
// export const Default: Story = (args) => <SideBar {...args} />
