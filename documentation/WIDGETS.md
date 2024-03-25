### Widgets

Beside the central area which is used by the apps, there are other
sections in the layout that can be used by widget.
As an example, the sidebar, the top bar and the card on the right of the screen
are all widgets. The layout which defines the location of the apps and widgets in page
is also a widget.

Widgets are meant to not change or unmount when the route changes however
there is no restriction for this and the interface allows contextual widgets.

#### Creating widgets

The overall structure and interface of the widget is similar to an app.
Widgets should export (named) a `register` function which returns an object with
2 required properties:

```tsx
export const register = () => {
  return {
    loadingFn: () => importPromise,
    mountsIn: string,
  };
};
```

**[loadingFn](./loading-fn.md)** loading function which will import the single-spa-react lifecycle methods

**mountsIn** the mount point for this widget, should be set to one of the sections
defined by the layout

#### Contextual widgets

Route based mounting of a widget is possible using the optional `activeWhen` property

```tsx
export const register = () => {
  return {
    ...
    activeWhen: (location, pathToActiveWhen) => {
      return pathToActiveWhen('/some/path')(location);
    }
  }
}
```

The second parameter of `activeWhen` is a utility function that converts a URL path into an activity function that
when is called with the current Location will return a boolean.
The path that is passed to `pathToActiveWhen` can also contain dynamic values.

Example:

```
// dynamic values
pathToActiveWhen(/users/:userId/profile)
✅ https://app.com/users/123/profile
✅ https://app.com/users/123/profile/sub-profile/
🚫 https://app.com/users//profile/sub-profile/
🚫 https://app.com/users/profile/sub-profile/

// multiple paths
pathToActiveWhen(['/some/path/1', '/app1'])
✅ https://app.com/some/path/1
✅ https://app.com/app1/anything/everything
🚫 https://app.com/other/app1
🚫 https://app.com/some/1
```

### Plugins

Widgets can also expose plugins the same way the apps do.
Please consult the [plugins documentation](./PLUGINS.md) next.

