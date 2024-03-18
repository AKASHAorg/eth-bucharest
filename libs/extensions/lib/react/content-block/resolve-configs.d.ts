import { ContentBlockModes } from '@akashaorg/typings/lib/ui';
import { MatchingBlock } from './common.types';
interface IResolveConfigs {
    matchingBlocks: MatchingBlock[];
    mode: ContentBlockModes;
}
export declare const resolveConfigs: ({ matchingBlocks, mode }: IResolveConfigs) => Promise<any[]>;
export {};
