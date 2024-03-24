### Editor
Adding contents to an [Antenna](./GLOSSARY.md#antenna) app is made through an editor.

The editor is a list of content blocks, each content block being
added/provided by an application. In order to use a specific content block,
for example an `image` block, the application that provides it must be installed.

For this example-app we have included a
[simple block](../apps/example-app/src/content-blocks/text-with-title/text-block-editor.tsx)
which is loading only one content block, that will save two content nodes: a text field (title) and a textarea element (body).
Please refer to [content-blocks](./CONTENT_BLOCKS.md) docs for more info

#### Loading and mounting blocks

When the editor mounts a content block, it will pass down a property `mode`
which will always be equal to `"edit-mode"`. You can use this property to display
the editor version of the content block.

> Note: in typescript you can make use of the ContentBlockModes enum

#### Publishing, Retry and error handling

In the publishing phase, the editor will call an instance method on the
content-block (`createBlock`). If it fails, or the returned response contains
an error, the editor will display an option to retry. Retrying a block creation
is made through an instance method on the content-block called `retryBlockCreation`.
