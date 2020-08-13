module.exports = {
  stories: ["../packages/**/src/**/*.stories.@([tj]s|mdx)"],
  webpackFinal: async config => {
    config.performance = { hints: false };
    return config;
  },
  addons: [
    
    // First box
    {
      name: '@storybook/addon-docs',
      options: {
        configureJSX: true,
        babelOptions: {},
        sourceLoaderOptions: null,
      },
    },
    "@storybook/addon-viewport/register",
    
    // Second box
    "@storybook/addon-knobs/register",
    "@storybook/addon-actions/register",
  ]
};
