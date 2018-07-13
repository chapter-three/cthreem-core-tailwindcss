module.exports = {
  tasks: {
    tailwind: {
      enabled: true,
      name: 'cthreem-core-tailwind',
      type: 'plugin',
      twConfig: './css/tailwind.js',
      src: './css/tailwind.css',
      dest: './assets/css',
      destName: 'style.css',
      outputStyle: 'compact', // see https://github.com/ben-eb/perfectionist#format
      removeComments: true,
      lint: true,
      lintSrc: [
        './css/**/*.css'
      ]
    }
  }
};
