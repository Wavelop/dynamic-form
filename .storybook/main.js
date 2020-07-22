module.exports = {
  stories: ["../src/**/*.stories.([tj]s|mdx)"],
  addons: [
    
    // First box
    "@storybook/preset-create-react-app",
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
    "@storybook/addon-jest/register",
    "@storybook/addon-actions/register",
  ]
};
