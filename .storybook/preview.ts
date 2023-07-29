import type { Preview } from "@storybook/react";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    // nextjs: {
    //   appDirectory: true,
    //   navigation: {
    //     pathname: "/profile",
    //     query: {
    //       user: "santa",
    //     },
    //   },
    //   // router: {
    //   //   basePath: '/profile'
    //   // }
    // },
  },
};

export default preview;
