module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
    '@babel/preset-typescript',
  ],
  plugins: [
    "babel-plugin-transform-typescript-metadata",
    ['module-resolver', {
      alias: {
        '@configs': './src/configs',
        '@models': './src/models',
        '@controllers': './src/controllers',
        '@views': './src/views',
        "@middlewares": './src/middlewares',
        "@interfaces": './src/interfaces'
      },
    }],
    ['@babel/plugin-proposal-decorators', {legacy : true }],
    ["@babel/plugin-proposal-class-properties", {loose: true}],
    ["@babel/plugin-transform-typescript", {allowNamespaces: true}],
  ],
  ignore: [
    '**/*.spec.ts',
  ],
};
