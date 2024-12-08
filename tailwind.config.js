/** @type {import('tailwindcss').Config} */
module.exports = {
  // Specify the paths to all of your template files
  content: [
    './views/**/*.ejs',   // Include all EJS templates in the views folder
    './public/**/*.js',   // Include any client-side JavaScript files in the public folder
    './public/**/*.html', // If you have any HTML files in the public folder
  ],

  // Extend your theme if necessary
  theme: {
    extend: {},
  },

  // Enable JIT (Just-in-Time) mode for faster build times in production
  mode: 'jit',

  // Plugins (if needed)
  plugins: [],

  // Tailwind's purge mechanism removes unused CSS
  // This is automatically enabled in production with the `mode: 'jit'` configuration.
}
