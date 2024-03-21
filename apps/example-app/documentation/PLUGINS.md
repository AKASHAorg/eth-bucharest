### Plugins
@TODO provide description.

#### Creating plugins
@TODO how can we create plugins

#### Accessing plugins
To access a plugin in the register function you should use the function's param:
Example:
```ts
export const register = (opts) => {
  const plugin = opts.plugins[appNameHere]

  plugin.saveLocalData(someData);

  return {
    // ...
  }
}
```
In the same way you can access the plugins from your root React component through props.
Example:
```tsx
const MyRootComponent = (props: RootComponentProps) => {

  const examplePlugin = props.plugins[appNameHere];
  examplePlugin.saveLocalData(someData);

  return <>Hello World!</>
}
```
>  ℹ️ Tip: In React you can use the already provided `useRootComponentProps` to avoid prop-drilling:
>
> Example:
> ```tsx
> import {useRootComponentProps} from '@akashaorg/ui-awf-hooks';
> 
> const MyReactComponent = () => {
>   const {plugins} = useRootComponentProps();
>   const examplePlugin = plugins[appNameHere];
>   examplePlugin.saveLocalData(someData);
>   return <>Hello Plugins!</>
> }
> ```
