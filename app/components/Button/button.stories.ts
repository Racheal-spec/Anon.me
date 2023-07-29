import type { Meta, StoryObj } from "@storybook/react";
import Button from "./button";

const meta = {
  title: "app/components/Button",
  component: Button,
  parameters: {
    // Optional parameter to center the component in the Canvas.
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "color",
    },
    onClick: {
      action: "handleclick",
    },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

// const Template = (args) => <typeof Button {...args} />

export const Primary: Story = {
  args: {
    primary: true,
    title: "Primary Button",
  },
};

export const Outline: Story = {
  args: {
    outline: true,
    title: "Button",
  },
};

export const Large: Story = {
  args: {
    size: "large",
    title: "Button",
  },
};

export const Small: Story = {
  args: {
    size: "small",
    title: "Button",
  },
};
