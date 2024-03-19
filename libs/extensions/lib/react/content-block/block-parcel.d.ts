import React from 'react';
import { MatchingBlock } from './common.types';
import { BlockInstanceMethods, ContentBlockModes } from '@akashaorg/typings/lib/ui';
import { ParcelConfigObject } from 'single-spa';
type BlockParcelProps = {
    matchingBlock: MatchingBlock & {
        config: ParcelConfigObject;
    };
    blockId: string;
    index: number;
    blockRef?: React.RefObject<BlockInstanceMethods>;
    onError?: (error: Error) => void;
} & ({
    mode: ContentBlockModes.READONLY;
} | {
    mode: ContentBlockModes.EDIT;
    externalHandler?: (value: never) => void;
});
export declare const BlockParcel: React.FC<BlockParcelProps>;
export {};
