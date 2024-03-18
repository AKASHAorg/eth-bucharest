import React from 'react';
export type BlockError = {
    errorTitle: string;
    errorDescription: string;
};
type BlockErrorCardProps = BlockError & {
    refreshLabel?: string;
    onRefresh?: () => void;
};
export declare const BlockErrorCard: React.FC<BlockErrorCardProps>;
export {};
