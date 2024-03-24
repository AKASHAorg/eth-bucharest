### What is an application?
An application is a standalone micro-frontend that complement and extend your web3 
social network experience. Applications are the main building blocks of a world 
and it can be seen as a standalone SPA's (Single Page Application) except that they 
are loaded, mounted and unmounted by the underlying system (`app-loader`) which is 
a thin layer on top of the [single-spa](https://single-spa.js.org/) microfrontends 
library.

### Example app
The `example-app` provided is a stripped down version of an [Antenna](./GLOSSARY.md#antenna).

#### Interface

To ensure compatibility with AKASHA Core and out loading system applications are 
required to export a register function. In the `example-app` the main 
[index](../apps/example-app/src/index.tsx) there is already a named export `register` added which
can be modified for your own needs.

> Note: The register function should be synchronous and defined as a named export.

The register function takes only one argument which is an object of the type
[IntegrationRegistrationProps](../libs/typings/src/ui/app-loader.ts)
The returned value of the `register` function should be an object with the [IAppConfig](../libs/typings/src/ui/apps.ts) type
The required parameters are:

**[loadingFn](./loading-fn.md)**

**mountsIn** The slot id of the layout widget in which this app mounts.

**menuItems** This parameter is used by sidebar to construct the menu. 

Optionally apps (and widgets) can also define
[extensions](./EXTENSIONS.MD) and 
[contentBlocks](./CONTENT_BLOCKS.md) properties which are explained in their own docs.

#### Application's layout and the mounting point.
Applications have a specific mounting area that is defined by the layout widget. 
This configuration is then passed down to app register function's `opts` parameter 
as `layoutConfig`. The layout used in this World defines the application's mount point
in the central area, right below the topbar. (More detailed docs about the 
layout [here](./layout-widget.md))

Only one app can be loaded at any given time based on the URL's pathname.
Example:
- url: `https://localhost:8181/example-app` 
  - -> will load the `example-app`
- url: `https://localhost:8181/@akashaorg/app-settings-ewa` 
  - -> will load 
  the `@akashaorg/app-settings-ewa` app

#### Plugins
Apps and Widgets can also provide additional functionalities 
through [plugins](./PLUGINS.md). Plugins are not rendered 
into the view and their purpose is to allow other apps to implement additional 
(domain specific) logic provided.
Some examples of plugins:
- a custom profile app can expose an api to fetch or update a profile
- a plugin that saved data locally

#### Initialization and order of loading

Initialization and registration is done by the `app-loader` in the following order:
- initialize plugins (calls the `getPlugin` function of every app)
- register `layout-widget` (calls the `register` method on the layout-widget)
- initialize apps and widgets (calls the `initialize` method on the apps and widgets - if provided)
- register apps and widgets (calls the `register` method on the apps and widgets)

> Note: The plugins are initialized first so they are already available in the opts 
> param of the register function and in the root component of the apps and widgets.
>
> However, the plugin you are trying to access can be provided by an app that is not 
> installed so additional fallback logic should be added to avoid breaking your app.

### See [Widgets](./WIDGETS.md) next.
