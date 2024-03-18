import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import TextLine from '@akashaorg/design-system-core/lib/components/TextLine';
import Stack from '@akashaorg/design-system-core/lib/components/Stack';
import { useRootComponentProps } from '@akashaorg/ui-awf-hooks';
import { BlockParcel } from './block-parcel';
import { resolveConfigs } from './resolve-configs';
export const EditorBlockExtension = props => {
    const { blockRef, propertyType, appName, onError, externalHandler } = props;
    const { logger, getExtensionsPlugin } = useRootComponentProps();
    const contentBlockStoreRef = useRef(getExtensionsPlugin()?.contentBlockStore);
    const [state, setState] = useState({
        parcels: [],
        isMatched: false,
    });
    const matchingBlocks = useMemo(() => {
        if (!contentBlockStoreRef.current)
            return [];
        return contentBlockStoreRef.current.getMatchingBlocks({
            appName: appName,
            propertyType: propertyType,
        });
    }, [appName, propertyType]);
    useLayoutEffect(() => {
        if (matchingBlocks &&
            matchingBlocks.length &&
            matchingBlocks.length !== state.parcels.length &&
            !state.isMatched) {
            resolveConfigs({ matchingBlocks, mode: "edit-mode" /* ContentBlockModes.EDIT */ })
                .then(newBlocks => {
                setState({
                    parcels: newBlocks,
                    isMatched: true,
                });
            })
                .catch(err => logger.error(`failed to load content blocks in edit mode: ${JSON.stringify(err)}`));
        }
        else if (matchingBlocks && !matchingBlocks.length && !state.isMatched) {
            setState({
                parcels: [],
                isMatched: true,
            });
        }
    }, [logger, matchingBlocks, state]);
    useEffect(() => {
        return () => {
            setState({
                isMatched: false,
                parcels: [],
            });
        };
    }, []);
    return (React.createElement(React.Fragment, null,
        !state.parcels.length && !state.isMatched && (React.createElement(Stack, { fullWidth: true, spacing: "gap-y-1", customStyle: "mb-2" },
            React.createElement(TextLine, { animated: true, width: "w-full" }),
            React.createElement(TextLine, { animated: true, width: "w-2/3" }))),
        state.parcels.map((matchingBlock, index) => {
            return (React.createElement(BlockParcel, { key: index, mode: "edit-mode" /* ContentBlockModes.EDIT */, matchingBlock: matchingBlock, blockId: "0", index: index, blockRef: blockRef, externalHandler: externalHandler, onError: onError }));
        })));
};
//# sourceMappingURL=editor-block-extension.js.map