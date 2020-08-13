module.exports = {
  stories: ["../packages/**/src/**/*.stories.([tj]s|mdx)"],
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
