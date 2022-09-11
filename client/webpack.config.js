const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const { InjectManifest } = require('workbox-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const path = require('path');

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'Webpack Plugin',
      }),
      // new WorkboxPlugin.GenerateSW({
      //   exclude: [/\.(?:png|jpg|jpeg|svg)$/],
      //   runtimeCaching: [{
      //     urlPattern: /\.(?:png|jpg|jpeg|svg)$/,
      //     handler: 'CacheFirst',
      //     options: {
      //       cacheName: 'images',
      //       expiration: {
      //         maxEntries: 1,
      //       },
      //     },
      //   }],
      // }),
      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'service-worker.js'
      }),
      new WebpackPwaManifest({
        fingerprints: false,
        inject: true,
        name: 'Just Another Text Editor',
        short_name: 'J.A.T.E',
        description: 'Takes notes with JavaScript syntax highlighting!',
        background_color: '#225ca3',
        theme_color: '#225ca3',
        start_url: '/',
        publicPath: '/',
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('assets', 'icons'),
          },
        ],
      }),
    ],
      // new WebpackPwaManifest({
      //   name: 'Just Another Text Editor',
      //   short_name: 'JATE',
      //   description: 'An easy to use text editor.',
      //   background_color: '#000',
      //   theme_color: '#31a9e1',
      //   start_url: './',
      //   publicPath: './',
      //   icons: [
      //     {
      //       src: path.resolve('src/images/logo.png'),
      //       sizes: [96, 128, 192, 256, 384, 512],
      //       destination: path.join('assets', 'icons'),
      //     },
      //     {
      //       src: path.resolve('src/images/logo.png'),
      //       size: '1024x1024',
      //       destination: path.join('assets', 'icons'),
      //       purpose: 'maskable'
      //     }
      //   ],
      // })
    // ],

//     module: {
//       rules: [
//         {
//           test: /\.(png|svg|jpg|jpeg|gif)$/i,
//           type: 'asset/resource',
//         },
//         {
//           test: /\.css$/i,
//           use: ['style-loader', 'css-loader'],
//         },
//         {
//           test: /\.m?js$/,
//           exclude: /node_modules/,
//           use: {
//             loader: 'babel-loader',
//             options: {
//               presets: [
//                 ['@babel/preset-env', { targets: "defaults" }]
//               ]
//             }
//           }
//         }
//       ],
//     },
//   };
// };
module: {
  rules: [
    {
      test: /\.css$/i,
      use: ['style-loader', 'css-loader'],
    },
    {
      test: /\.m?js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
          plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
        },
      },
    },
  ],
},
};
};