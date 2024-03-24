### Content Blocks
The content beamed (posted) into the apps is composed of one or more blocks.
For example, a [beam](./GLOSSARY.md#beam) (post) can contain a rich text format block, an image block, 
a code block etc.
All of these blocks can be `injected` into the editor by different apps.

To register a content-block an app should define an optional param into 
it's [register](../apps/example-app/src/index.tsx) function, called `contentBlocks`.

#### Interface

Registering content-blocks will require the following properties:

```
{
   propertyType: 'text-block',
   displayName: 'Text Block',
   icon: <GlobeAltIcon />,
   loadingFn: () => () => import('./content-blocks/text-with-title'),
}
```

**[loadingFn](./loading-fn.md)**

**propertyType** will be used to match the content published through this content.

**displayName** is used in the editor's menu

**icon** is used also in the editor's menu

> Note: in this example the editor is stripped down so the 'displayName' and 'icon' 
> properties are not used.
> 
> A more advanced editor can be found [here](https://github.com/AKASHAorg/akasha-core/blob/next/ui/apps/akasha/src/extensions/beam-editor/beam-editor.tsx)
> 


#### Content Block Modes
A content block should handle 2 modes:

### **"editor-mode"**
This mode is displayed when the block is mounted inside the editor.
All the logic for data input and validation is handled internally by the block.

In edit mode the content block must expose a simple api using React's 
`useImperativeHandle` to allow editor to use it for publishing. The ref is passed 
as prop so there is no need to use forwardRef.

```ts
React.useImperativeHandle(props.blockRef, () => ({
  async createBlock() {},
  async retryBlockCreation() {},
}))
```

For an implementation example see 
[src/content-blocks/text-with-title/text-block-editor.tsx](../apps/example-app/src/content-blocks/text-with-title/text-block-editor.tsx)

### **"read-only-mode"**
The content block in `readonly` mode is used to render the saved data and provide 
the required interaction logic. For example, a voting block can contain the voting 
interaction logic in readonly mode and the question editing part in the 
edit-mode block.

The content-block is matched against both the application's name and the 
`propertyType` param when rendering the content.

### Content Block Data Model

@todo: explain the model behind a content block.
