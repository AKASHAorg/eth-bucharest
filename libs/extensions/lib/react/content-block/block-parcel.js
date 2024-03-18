import React from 'react';
import Stack from '@akashaorg/design-system-core/lib/components/Stack';
import { RootParcel } from '../root-parcel';
import { useRootComponentProps } from '@akashaorg/ui-awf-hooks';
export const BlockParcel = props => {
    const { matchingBlock, blockId, index, blockRef, onError, ...rest } = props;
    const { getContext, logger } = useRootComponentProps();
    const handleParcelError = React.useCallback((parcelName) => {
        return error => {
            if (logger)
                logger.error(`error in parcel ${parcelName}: ${error}`);
            onError?.(error);
        };
    }, [logger, onError]);
    return (React.createElement(Stack, { fullWidth: true, id: `${rest.mode}_${matchingBlock.blockInfo.propertyType}_${blockId}_${index}`, key: `${rest.mode}_${matchingBlock.blockInfo.propertyType}_${blockId}_${index}` },
        React.createElement(RootParcel, { config: {
                ...matchingBlock.config,
                name: `${matchingBlock.blockInfo.appName}_${matchingBlock.blockInfo.propertyType}_${blockId}_${index}`,
            }, ...getContext(), blockInfo: {
                ...matchingBlock.blockInfo,
                mode: rest.mode,
                externalHandler: rest.mode === "edit-mode" /* ContentBlockModes.EDIT */ ? rest?.externalHandler : null,
            }, blockData: matchingBlock.blockData, blockRef: blockRef, content: matchingBlock.content, handleError: handleParcelError(`${matchingBlock.blockInfo.appName}_${matchingBlock.blockInfo.propertyType}_${blockId}_${index}`) })));
};
//# sourceMappingURL=block-parcel.js.map