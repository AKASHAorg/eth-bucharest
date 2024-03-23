### Content Blocks
The content beamed (posted) into the apps is composed of one or more blocks.
For example, a beam (post) can contain a rich text format block, an image block, 
a code block etc.
All of these blocks can be `injected` into the editor by different apps.

To register a content-block an app should define an optional param into 
it's [register](../apps/example-app/src/index.tsx) function, called `contentBlocks`.

#### Content Block registering interface

Registering content-blocks will require the following properties:

```jsx
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
A content block should handle 2 modes which is controlled through 
the `props.blockInfo.mode` param passed to the root's react component:

### **"editor-mode"**
This mode is displayed when the block is mounted inside the editor.
All the logic for data input and validation is handled internally by the block.

In edit mode the content block must expose a simple api using React's 
`useImperativeHandle` to allow editor to use it for publishing. The ref is passed 
as prop so there is no need to use forwardRef.

```
React.useImperativeHandle(props.blockRef, () => ({
  async createBlock() {},
  async retryBlockCreation() {},
}))
```

For an implementation example see 
`src/content-blocks/text-with-title/text-block-editor.tsx`

### **"read-only-mode"**
The content block in `readonly` mode is used to render the saved data and provide 
the required interaction logic. For example, a voting block can contain the voting 
interaction logic in readonly mode and the question editing part in the 
edit-mode block.

The content-block is matched against both the application's name and the 
`propertyType` param when rendering the content.

### Creating/Storing content block data
Creating the content block should only happen when the block is 
in [ContentBlockModes.EDIT](../libs/typings/src/ui/editor-blocks.ts) mode and it should 
be done through a call on `CreateBlock`, available in the composeDB API.

You can explore existing methods for your models using `yarn composedb:graphql`.

Please check the [documentation](https://developers.ceramic.network/docs/composedb/getting-started) for ComposeDB.

You can also find an example [here](../apps/example-app/src/content-blocks/text-with-title/text-block-editor.tsx).

The interface of a content-block model is:

```
contentBlock = {
    // controls the visiblity of this block
    // true when visible
    active: boolean, 
    // the version of the app that this 
    // block was published with
    appVersionID: string,
    // the content-nodes of this block, these are 
    // the actual values that were inserted by the user 
    content: [titleNode, bodyNode],
    // the creation date of this content-block
    createdAt: new Date().toISOString(),
    // must be one of: 'FORM', 'OTHER' or 'TEXT'
    kind: string,
}
```

### Content Nodes
A content block can contain one or more content-nodes which are stored in the content-blocks `content` property.
The properties of a content node are as follows:
```
const titleNode = {
  // this propertyType will be matched against the propertyType defined in the
  // block's registration params
  propertyType: string,
  // each content-node should have different label to be recognizable
  // when rendering this content-node
  label: string,
  // the value of the content-node. Added by the user,
  value: string,
}
```

### Displaying content block's data

Displaying the data stored by a content block happens when the `props.blockInfo.mode` 
param is set to [ContentBlockModes.READONLY](../libs/typings/src/ui/editor-blocks.ts).

In `readonly-mode` the component will receive the actual content-node that 
needs to be rendered through the React's `props.content` parameter.

**Note** the component will also receive the whole content-block's data as `props.blockData` 
but the properties that need to be rendered are in the `props.content`.
