# Initial setup guide

1. Clone this repo from github
2. On the root directory, create an `.env` file and copy the contents of the [env.example](.env.example). Fill out the necessary variables.

> This project runs on a specific version of yarn - @4.1.1. If you are already on this version of yarn, you may skip directly to next section

3. If you are using a different version, consider using **nvm** to handle different version of node and yarn on your computer.
4. If you already have nvm, please skip to next step. If you do not already have nvm installed, you can follow a more detailed instructions here on [nvm github repo](https://github.com/nvm-sh/nvm).
5. Once you have installed and verified your nvm installation, you can now install `yarn`.

> **Note:** Yarn will be installed globally so make sure it doesn't affect other projects which require a different version of yarn. By using nvm, each node version you install will have it's own global packages so you can change to different versions of yarn.

6. First enable corepack using `corepack enable`
7. Add the specific version of yarn using `corepack install -g yarn@4.1.1`. For more instructions, check the [yarn docs](https://yarnpkg.com/getting-started/install)
8. Restart your terminal and verify you are on the correct versions of node and yarn

To finalize the setup, run these commands in order;

1. `yarn install` - install the project's dependencies
2. `./node_modules/.bin/nx prepare @akashaorg/typings` - using nx, runs prepare command using nx for [typings](./libs/typings/package.json) package
3. `yarn prepare` - using nx, runs prepare command for other packages
4. `yarn serve` - to start the example app.

You can view the deployment on your browser here `https://localhost:8181`
