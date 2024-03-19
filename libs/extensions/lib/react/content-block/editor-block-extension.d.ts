import React from 'react';
import { BlockInstanceMethods } from '@akashaorg/typings/lib/ui';
export type EditorBlockExtensionProps = {
    blockRef?: React.RefObject<BlockInstanceMethods>;
    propertyType: string;
    appName: string;
    onError?: (error: Error) => void;
    externalHandler?: (value: never) => void;
};
export declare const EditorBlockExtension: React.FC<EditorBlockExtensionProps>;
