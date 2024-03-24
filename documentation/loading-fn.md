#### The loading function

The `loadingFn` is the primary function for mounting the view.
It is required to be defined for each of the AKASHA Core's
micro-frontend type:

- application
- widget
- extension-point
- content-block

Single-spa library (which is used under the hood) handles these micro-frontends
through some lifecycle methods:

- bootstrap
- mount
- unmount
- (optional) update -> this is not currently used

The loading function should return a Promise that, when resolved, should return
these lifecycle hooks.

> For React, and other popular ui libraries, single-spa provides adapter libraries
> to automatically call the rendering functions of these ui libs. For React, it's called single-spa-react.
> if you are interested to dive deeper (although not required) you can check their [docs](https://single-spa.js.org/docs/getting-started-overview)
