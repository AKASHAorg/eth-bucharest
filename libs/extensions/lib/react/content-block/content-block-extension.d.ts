import React from 'react';
import { BlockInstanceMethods } from '@akashaorg/typings/lib/ui';
import { GetContentBlockByIdQuery } from '@akashaorg/typings/lib/sdk/graphql-operation-types-new';
import { MatchingBlock } from './common.types';
import { BlockError } from './block-error-card';
export type ContentBlockExtensionProps = {
    blockRef?: React.RefObject<BlockInstanceMethods>;
    fetchError?: BlockError;
    contentLoadError?: BlockError;
    notInstalledTitle: string;
    notInstalledDescription1: string;
    notInstalledDescription2: string;
    onError?: (error: Error) => void;
} & ({
    blockID: string;
} | {
    blockData: GetContentBlockByIdQuery['node'];
    matchingBlocks?: MatchingBlock[];
    error?: string;
    refreshLabel?: string;
    onRefresh?: () => void;
});
export declare const ContentBlockExtension: React.FC<ContentBlockExtensionProps>;
