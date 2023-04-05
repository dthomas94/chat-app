# Web Socket Chat App

## Running the app

To start the boilerplate(s):

1. Ensure `NODE_ENV` is NOT set to `prod` or `production` in your shell (otherwise dev dependencies won't be installed)
1. Either use [nvm](https://github.com/nvm-sh/nvm) to make sure you're using the correct node version or reference the `.nvmrc` file to see which version the project expects and set this however else you might be setting it
1. **If you are on a Windows machine,** change the `linebreak-style` rule in the `.eslintrc.js` files to be `['error', 'windows']` to ensure everything compiles
1. Run `yarn` from the project root (installs [concurrently](https://www.npmjs.com/package/concurrently))
1. Run either `yarn ts` from the project root
