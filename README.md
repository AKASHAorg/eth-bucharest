# Initial Setup Guide

> This is a Github template, use it to start your own project.

## Pre-requisites
This project requires these packages before setup;

- Node -> `>=20.9.0` (from v20.9.0 upwards)
- Yarn -> `v4.1.1`

> If any or both of the packages above do not meet the requirements, continue to next section for steps to get them ready.

## Getting started

1. Click on the `Use this template` button at top right hand corner and choose `Create a new repository`. Fill out the details and click on the button to continue.

2. Clone your newly created repository on your local machine using `git clone ...`. The command to use depends on whether you are using SSH or HTTPS or Github CLI.

3. On the root directory, create an `.env` file, copy the variables from the [env.example](.env.example) and update the values accordingly in your .env file.

> This project runs on a specific version of yarn - @4.1.1. If you are already on this version of yarn, and your node version meets the minimum requirement, you may skip directly to next section.

4. If you are using a different version, consider using **nvm** to handle different versions of node and yarn on your computer.

5. If you already have nvm, please skip to next step. If you do not already have nvm installed, you can follow a more detailed instructions here on [nvm github repo](https://github.com/nvm-sh/nvm).

6. Once you have installed and verified your nvm installation, you can now install the specified versions of `node` and `yarn`.

> If you are already on the minimum node version (v20.9.0), you may skip to step 8

> For the purpose of this docs, we are using version 21.7.1, however you may replace this with any version that meets the minimum node version specified above.

7.  Run `nvm install 21.7.1` to install the specified version - 21.7.1 and `nvm use 21.7.1` to use this installed version. Verify the currently active node installation on your nvm by running `nvm which node`. You should see value like `{user_path}/.nvm/versions/node/v21.7.1/bin/node`


8. Enable corepack using `corepack enable`

9. Add the specific version of yarn using `corepack install -g yarn@4.1.1`. For more instructions, check the [yarn docs](https://yarnpkg.com/getting-started/install)

> **Note:** Yarn will be installed globally so make sure it doesn't affect other projects which require a different version of yarn. By using nvm, each node version you install will have it's own global packages so you can change to different versions of yarn.

10. Restart your terminal and verify you are on the correct versions of node and yarn

## Install dependencies and start app
> To finalize the setup, run these commands in this order

1. `yarn install` - install the project's dependencies
2. `./node_modules/.bin/nx prepare @akashaorg/typings` - using nx, runs prepare command using nx for [typings](./libs/typings/package.json) package
3. `yarn prepare` - using nx, runs prepare command for other packages
4. `yarn serve` - to start the example app.

You can view the deployment on your browser here `https://localhost:8181`
