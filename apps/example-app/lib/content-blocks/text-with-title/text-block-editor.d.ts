import React from 'react';
import type { RefObject } from 'react';
import type { BlockInstanceMethods, ContentBlockRootProps } from '@akashaorg/typings/lib/ui';
/**
 * This component is used in the editor.
 */
declare const TextBlockEditor: React.FC<ContentBlockRootProps & {
    blockRef?: RefObject<BlockInstanceMethods>;
}>;
export default TextBlockEditor;
