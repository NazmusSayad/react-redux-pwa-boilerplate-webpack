# Minimal React Boilerplate

Checkout [demo](https://react-setup.vercel.app) site.

## Features

- 5x lighter than `create-react-app`
- CSS module enabled
- Babel && PostCSS && SASS preinstalled
- Hot module replacement during local development
- SEO optimized(Just Kidding...), don't forget to edit `src/index.html`

---

## Requirements

- [Node.js](https://nodejs.org/) v16+
- Optionally [VS Code](https://code.visualstudio.com)
- Optionally [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi) and [Reactime](https://chrome.google.com/webstore/detail/reactime/cgibknllccemdnfhfpmjhffpjfeidjga) browser extensions

## Getting Started

[Generate](https://github.com/NazmusSayad/react-redux-minimal-boilerplate/generate) a new project from this template and clone it.

```
$ git clone https://github.com/NazmusSayad/react-redux-minimal-boilerplate
$ cd react-redux-minimal-boilerplate
```

## Install & Start

- Initialize your project with some details
  `$ npm init`

- Install dependencies and save the versions
  `$ npm install --save`

- Remove `<InitialApp />` from **[src/App.jsx](/src/App.jsx)** and write your own code. [Don't forget to delete **[src/#InitialApp](/src/#InitialApp)** folder (:]

- Launches the app in development mode on [`http://localhost:80`](http://localhost:80)
  `$ npm start`

- Compiles and bundles the app for deployment
  `$ npm run build`

---

## Configuring

- For basic configurations [config.js](/webpack/config.js)

  ```
  module.exports = {
    build: __dirname + '/../build',
    publicDir: __dirname + '/../public',
    mainJS: __dirname + '/../src/index.js',
    template: __dirname + '/../src/index.html',

    publicPath: '/',
    assestPath: 'static',

    cssRegex: /\.(c|sc|sa)ss$/i,
    cssModuleRegex: /\.module\.\w+$/i,
  }
  ```

- Change assest types from [webpack.common.js](/webpack/webpack.common.js)

  ```
    loaders: [
      {
        test: /\.(htm|html)$/i,
        loader: 'html-loader',
      },
      {
        type: 'asset/resource',
        resourceQuery: /file/i,
      },
      {
        type: 'asset/source',
        resourceQuery: /raw/i,
      },
      {
        type: 'asset/inline',
        resourceQuery: /url/i,
      },
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/i,
        use: ['@svgr/webpack'],
      },
    ]
  ```

- To change CSS module regex add `cssModuleRegex` property inside the default export object [config.js](/webpack/config.js)

  ```
   // cssModuleRegex: /\.module\.\w+$/i,
  ```

- Configure development server from [webpack.dev.js](/webpack/webpack.dev.js)

  ```
  devServer: {
     host: 'localhost',
     port: 80,
     hot: true,
     compress: false,
     historyApiFallback: true,

     client: {
        logging: 'none',
        overlay: false,
        progress: false,
     },
  }
  ```

- Read from [Webpack Docs](https://webpack/webpack.js.org/configuration) if you want more customization.

---

## How to Update

- `npm update --save` --- Update npm modules (dependencies)

<br/>

---

<sup>Made with ♥ by [Nazmus Sayad](https://github.com/NazmusSayad).
