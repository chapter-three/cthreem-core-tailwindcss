[![NPM](https://nodei.co/npm/cthreem-core-tailwindcss.png)](https://nodei.co/npm/cthreem-core-tailwindcss/)

# CThreem Core plugin for Tailwind CSS

This is a plugin for [CThreem Core](https://github.com/chapter-three/cthreem-core) to enable use of the Tailwind CSS framework.

## Installation

[Install](https://github.com/chapter-three/cthreem-core#installation) CThreem Core if it is not already installed.

```bash
npm install cthreem-core-tailwindcss --save
# -- or --
yarn add cthreem-core-tailwindcss
```

Edit your `gulp-config.js` file, and merge the [example gulp-config.js](examples/gulp-config.js) with yours so that is looks similar to the following:

```js
module.exports = {
  tasks: {
    ...
    tailwind: {
      ...
    },
    js: {}
    ...
  },
  browserSync: {}
};
```

Create config files (if they don't already exist):

```bash
cp node_modules/cthreem-core-tailwindcss/examples/.browserslistrc .browserslistrc
cp node_modules/cthreem-core-tailwindcss/examples/.stylelintrc .stylelintrc
```

Make sure your `.stylelintrc` file contains the following:

```json
"rules" {
  ...
  "at-rule-no-unknown": [ true, {
    "ignoreAtRules": [
      ...
      "tailwind",
      "responsive",
      "variants",
      "screen",
      ...
    ]
  }],
  ...
}
```
