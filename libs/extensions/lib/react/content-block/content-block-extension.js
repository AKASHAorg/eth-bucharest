import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import Text from '@akashaorg/design-system-core/lib/components/Text';
import TextLine from '@akashaorg/design-system-core/lib/components/TextLine';
import Stack from '@akashaorg/design-system-core/lib/components/Stack';
import Button from '@akashaorg/design-system-core/lib/components/Button';
import { hasOwn, useRootComponentProps } from '@akashaorg/ui-awf-hooks';
import { useGetContentBlockByIdLazyQuery } from '@akashaorg/ui-awf-hooks/lib/generated/apollo';
import { BlockParcel } from './block-parcel';
import { resolveConfigs } from './resolve-configs';
import { BlockErrorCard } from './block-error-card';
export const ContentBlockExtension = props => {
    const { blockRef, fetchError, contentLoadError, notInstalledTitle, notInstalledDescription1, notInstalledDescription2, onError, ...remainingProps } = props;
    const { logger, getExtensionsPlugin } = useRootComponentProps();
    const contentBlockStoreRef = useRef(getExtensionsPlugin()?.contentBlockStore);
    const [hasContentLoadError, setHasContentLoadError] = useState(false);
    const [state, setState] = useState({
        parcels: [],
        isMatched: false,
    });
    const [fetchBlockInfo, blockInfoQuery] = useGetContentBlockByIdLazyQuery();
    const fetchDataError = useMemo(() => {
        return hasOwn(remainingProps, 'blockData')
            ? remainingProps?.error
            : blockInfoQuery.error?.message;
    }, [remainingProps, blockInfoQuery]);
    const blockData = useMemo(() => {
        if (hasOwn(remainingProps, 'blockData')) {
            if (remainingProps.blockData && hasOwn(remainingProps.blockData, 'id')) {
                return remainingProps.blockData;
            }
        }
        if (blockInfoQuery.data?.node && hasOwn(blockInfoQuery.data?.node, 'id')) {
            return blockInfoQuery.data?.node;
        }
        return null;
    }, [remainingProps, blockInfoQuery]);
    const matchingBlocks = useMemo(() => {
        if (hasOwn(remainingProps, 'blockData') && remainingProps?.matchingBlocks)
            return remainingProps.matchingBlocks;
        return !blockData ? [] : contentBlockStoreRef.current.getMatchingBlocks(blockData);
    }, [blockData, remainingProps]);
    useLayoutEffect(() => {
        if (matchingBlocks &&
            matchingBlocks.length &&
            matchingBlocks.length !== state.parcels.length &&
            !state.isMatched) {
            resolveConfigs({ matchingBlocks, mode: "read-only-mode" /* ContentBlockModes.READONLY */ })
                .then(newBlocks => {
                setState({
                    parcels: newBlocks,
                    isMatched: true,
                });
            })
                .catch(err => {
                setHasContentLoadError(true);
                logger.error('failed to load content blocks', err);
            });
        }
        else if (matchingBlocks &&
            !matchingBlocks.length &&
            !state.isMatched &&
            blockInfoQuery.called &&
            !blockInfoQuery.loading) {
            setState({
                parcels: [],
                isMatched: true,
            });
        }
    }, [logger, blockInfoQuery.called, blockInfoQuery.loading, matchingBlocks, state]);
    useEffect(() => {
        if (hasOwn(remainingProps, 'blockID')) {
            fetchBlockInfo({
                variables: {
                    id: remainingProps.blockID,
                },
            }).catch(err => logger.error(`failed to fetch content block: ${JSON.stringify(err)}`));
        }
    }, [logger, fetchBlockInfo, remainingProps]);
    useEffect(() => {
        return () => {
            setState({
                isMatched: false,
                parcels: [],
            });
        };
    }, []);
    const appInfo = useMemo(() => {
        if (blockData) {
            return blockData.appVersion?.application;
        }
    }, [blockData]);
    if (hasContentLoadError || fetchDataError) {
        return (React.createElement(Stack, { spacing: "gap-y-2" },
            hasContentLoadError && (React.createElement(BlockErrorCard, { errorTitle: contentLoadError.errorTitle, errorDescription: contentLoadError.errorDescription })),
            fetchDataError && (React.createElement(BlockErrorCard, { errorTitle: fetchError.errorTitle, errorDescription: fetchError.errorDescription, refreshLabel: hasOwn(remainingProps, 'blockData') ? remainingProps.refreshLabel : '', onRefresh: () => {
                    if (hasOwn(remainingProps, 'blockID')) {
                        blockInfoQuery.refetch({
                            id: remainingProps?.blockID,
                        });
                    }
                    if (hasOwn(remainingProps, 'blockData')) {
                        remainingProps.onRefresh?.();
                    }
                } }))));
    }
    return (React.createElement(React.Fragment, null,
        !state.parcels.length && !state.isMatched && (React.createElement(Stack, { fullWidth: true, spacing: "gap-y-1", customStyle: "mb-2" },
            React.createElement(TextLine, { width: "w-full", animated: true }),
            React.createElement(TextLine, { width: "w-2/3", animated: true }))),
        !state.parcels.length && state.isMatched && appInfo && (React.createElement(Stack, { spacing: "gap-y-2", padding: "p-4", background: { light: 'grey9', dark: 'grey1' }, customStyle: "rounded-[20px]" },
            React.createElement(Stack, { direction: "row", spacing: "gap-x-1" },
                React.createElement(Text, { variant: "button-sm" },
                    appInfo.displayName,
                    " ",
                    notInstalledTitle),
                React.createElement(Button, { variant: "text", label: 'Install', customStyle: "ml-auto" })),
            React.createElement(Text, { variant: "footnotes2", weight: "normal" },
                notInstalledDescription1,
                " ",
                appInfo.displayName,
                " ",
                notInstalledDescription2))),
        state.parcels.map((matchingBlock, index) => {
            return (React.createElement(BlockParcel, { key: index, mode: "read-only-mode" /* ContentBlockModes.READONLY */, matchingBlock: matchingBlock, blockId: blockData?.id, index: index, blockRef: blockRef, onError: onError }));
        })));
};
//# sourceMappingURL=content-block-extension.js.map