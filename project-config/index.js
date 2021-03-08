const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const SystemJSPublicPathPlugin = require('systemjs-webpack-interop/SystemJSPublicPathWebpackPlugin');
const cssnano = require('cssnano');

module.exports = ({ port, isRoot, rootDirectoryLevel }) => (
  env,
  { mode = 'production' }
) => {
  const isProduction = mode === 'production';
  process.env.NODE_ENV = isProduction ? 'production' : 'development';
  const moduleName = require(path.resolve(process.cwd(), 'package.json')).name;
  const {
    groups: { orgName, projectName },
  } = /@(?<orgName>.+)\/(?<projectName>.+)/.exec(moduleName);
  return {
    mode,
    context: path.resolve(process.cwd()),
    entry: path.resolve(process.cwd(), `src/${orgName}-${projectName}.js`),
    output: {
      filename: `${orgName}-${projectName}.js`,
      libraryTarget: 'system',
      path: path.resolve(process.cwd(), 'dist'),
      uniqueName: projectName,
      devtoolNamespace: `${projectName}`,
      publicPath: '',
    },
    module: {
      rules: [
        {
          test: /\.(js|ts)x?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
        },
        {
          test: /\.css$/i,
          include: [/src/],
          use: [
            {
              loader: 'style-loader',
              options: {
                injectType: 'lazyStyleTag',
                attributes: { 'data-module': `${orgName}-${projectName}` },
              },
            },
            {
              loader: 'css-loader',
              options: {
                modules: false,
                importLoaders: 1,
              },
            },
            isProduction && {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: [
                    ['postcss-preset-env', {}],
                    cssnano({
                      preset: [
                        'default',
                        { discardComments: { removeAll: true } },
                      ],
                    }),
                  ],
                },
              },
            },
          ].filter(Boolean),
        },
      ],
    },
    devtool: 'source-map',
    devServer: {
      port,
      compress: true,
      historyApiFallback: true,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      firewall: false,
      client: {
        host: 'localhost',
      },
    },
    externals: [
      'react',
      'react-dom',
      'react-router',
      'react-router-dom',
      isRoot && new RegExp(`^@${orgName}/(?!front-project-config)`),
    ].filter(Boolean),
    plugins: [
      new SystemJSPublicPathPlugin({
        systemjsModuleName: moduleName,
        rootDirectoryLevel,
      }),
      isRoot &&
        new HtmlWebpackPlugin({
          template: path.resolve(process.cwd(), 'src/index.ejs'),
          inject: false,
          templateParameters: {
            isLocal: env.WEBPACK_SERVE,
            port: port,
            moduleName,
            versions: [
              'systemjs',
              'import-map-overrides',
              'react',
              'react-dom',
              'react-router',
              'react-router-dom',
            ].reduce(
              (acc, packageName) =>
                Object.assign(acc, {
                  [packageName]: require(path.resolve(
                    process.cwd(),
                    'node_modules',
                    packageName,
                    'package.json'
                  )).version,
                }),
              {}
            ),
          },
        }),
    ].filter(Boolean),
    resolve: {
      extensions: ['.mjs', '.js', '.jsx', '.wasm', '.json'],
    },
  };
};
