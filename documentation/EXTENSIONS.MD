### Extensions (extension-points)

Extension points are components exposed by an app that can be mounted at any level
inside the same app or other apps or widgets. These components can provide additional
functionalities to the already rendered elements,
for example a like button can be inserted into a beam card,
but also in the profile app, a follow button can be inserted into a user's
profile and in a profiles widget, etc.

#### Interface

Creating an extension requires defining the `extensions` property into the returned
object of the `register` function:

```ts
export const register = () => {
  return {
    //...
    extensions: [{ ...myExtension }],
  };
};
```

To define an extension the following properties must be set:

**[loadingFn](./loading-fn.md)**

**mountsIn** -> the slot in which this extension will be mounted.

It is also possible to control whether the extension should be loaded or not
using the `activeWhen` property.
This mechanism is exactly the same as the one used for [contextual widgets](./WIDGETS.md#contextual-widgets)

#### Using extensions

To enable a smooth usage of these extension, AKASHA Core provides
a small library which is already available under the name `@akashaorg/ui-lib-extensions`

The library comes with a React component [`<Extension />`](../libs/extensions/lib/react/extension.js) which will do the heavy
lifting for mounting/unmounting the extensions by matching the `name` prop with
the `mountsIn` property on the extension's interface.

> Note: Extensions are not namespaced because the idea is to have multiple extensions
> from multiple apps matching into a slot.

Example usage:

```tsx
import { Extension } from '@akashaorg/ui-lib-extensions/lib/react/extension';

const MyReactComponent = () => {
  return (
    <>
      <Extension name="some-extension" {...requiredProps} />
    </>
  );
};
```

> Note: requiredProps may vary according to needs.
> It is highly recommended to limit the use of props when developing
> an extension. (use as less as possible)
