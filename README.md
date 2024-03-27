### DEVELOPMENT

---

#### _Initial Setup Guide_

1. [Pre-requisites](#pre-requisites)
2. [Installing/Updating required packages](#installingupdating-required-packages)
3. [Getting started with the repo](#getting-started-with-the-repo)
4. [Installing deps and starting the app](#install-dependencies-and-start-app)

#### _Build_

1. [Applications](./documentation/APPS.md)
2. [Widgets](./documentation/WIDGETS.md)
3. [Plugins](./documentation/PLUGINS.md)
4. [Extension-points](./documentation/EXTENSIONS.MD)
5. [Editor](./documentation/EDITOR.md)
6. [Content Blocks](./documentation/CONTENT_BLOCKS.md)
7. [The layout widget](./documentation/layout-widget.md)
8. [React hooks](./documentation/custom-hooks.md)
9. [Design system](./documentation/design-system.md)

# Initial Setup Guide - (for Linux/MacOS)

> This is a GitHub template, use it to start your own project.

## Pre-requisites

This project requires these packages before setup;

- Node -> `>=20.9.0` (from v20.9.0 upwards)
- Yarn -> `v4.1.1`
- Operating System - Linux/MacOS

> This project runs on a specific version of yarn - @4.1.1. If you are already on this version of yarn, and your node version meets the minimum requirement, you may skip to the **Getting Started** section.

### Installing/Updating required packages

1. If you are using different versions of **node** and **yarn**, consider using **nvm** and **corepack** respectively to handle the versions on your computer.

2. If you already have nvm, please skip to next step. If you do not already have nvm installed, you can follow a more detailed instructions here on [nvm github repo](https://github.com/nvm-sh/nvm).

3. Once you have installed and verified your nvm installation, you can now install the specified versions of `node` and `yarn`.

   > If you are already on the minimum node version (v20.9.0), you may skip to step 5

4. Run `nvm install 21.7.1` to install the specified version - 21.7.1 and `nvm use 21.7.1` to use this installed version.

> For the purpose of this documentation, we are using node version 21.7.1, however you may replace this with any version that meets the minimum node version, as specified above.

- Verify the currently active node installation on your nvm by running `nvm which node`. You should see value like `{user_path}/.nvm/versions/node/v21.7.1/bin/node`

> corepack should already be installed globally, verify this with `npm list -g`

5. Enable corepack using `corepack enable`

6. Add the specific version of yarn using `corepack install -g yarn@4.1.1`. For more details, check the [yarn docs](https://yarnpkg.com/getting-started/install)

> **Note:** Yarn will be installed globally so make sure it doesn't affect other projects which require a different version of yarn. By using nvm, each node version you install will have it's own global packages so you can change to different versions of yarn.

10. Restart your terminal and verify you are on the correct versions of node and yarn

## Getting started with the repo

1. Click on the `Use this template` button at top right hand corner and choose `Create a new repository`. Fill out the details and click on the button to continue.

2. Clone your newly created repository on your local machine using `git clone ...`. The command to use depends on whether you are using SSH or HTTPS or Github CLI.

3. On the root directory, create an `.env` file, copy the variables from the [env.example](.env.example) and update the values accordingly in your .env file.

- for WALLETCONNECT_PROJECT_ID visit `https://cloud.walletconnect.com/app`, create an account, set up a project to get your project id.

## Install dependencies and start app

> To finalize the setup, run these commands in this order

1. `yarn install`
   - install the project's dependencies
2. `./node_modules/.bin/nx prepare @akashaorg/typings`
   - using nx, runs prepare command using nx for [typings](./libs/typings/package.json) package
3. `yarn ceramic:create-config`
   - used to generate basic configuration for the ceramic node;
   - add the printed env values to your .env file;
   - this command should be run only for the initial setup;
4. `yarn ceramic:start`
   - to start Ceramic node(in a separate terminal window)
5. `yarn composedb:deploy`
   - to deploy ceramic models
6. `yarn composedb:generate-data`
   - to deploy example-app and save generated data to the models;
   - add the printed env values to your .env file;
7. `yarn serve`
   - to start the example app.

You can view the deployment on your browser here `https://localhost:8181`

This example works on `sepolia` network by default.
If you need to change to a different network then update the [sdk web3 module](./libs/sdk/src/common/web3.connector.ts) and restart from step #7

To clean the cache, run:

- `yarn clean` for ts compiled files
- `yarn cache clean` for the yarn cache

#### Next, explore the docs for [Applications](./documentation/APPS.md)
