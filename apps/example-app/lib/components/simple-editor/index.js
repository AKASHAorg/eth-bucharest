import React, { useLayoutEffect } from 'react';
import Button from '@akashaorg/design-system-core/lib/components/Button';
import Card from '@akashaorg/design-system-core/lib/components/Card';
import { EditorBlockExtension } from '@akashaorg/ui-lib-extensions/lib/react/content-block/editor-block-extension';
import { useRootComponentProps } from '@akashaorg/ui-awf-hooks';
/**
 * A simplified editor example. For a more complete version see:
 * https://github.com/AKASHAorg/akasha-core/blob/next/ui/apps/akasha/src/extensions/beam-editor/beam-editor.tsx
 */
const SimpleEditor = () => {
    const { getExtensionsPlugin } = useRootComponentProps();
    const DEFAULT_BLOCK_TYPE = 'text-block';
    const availableBlocks = React.useMemo(() => getExtensionsPlugin().contentBlockStore.getInfos(), [getExtensionsPlugin]);
    const [blocksInUse, setBlocksInUse] = React.useState([]);
    useLayoutEffect(() => {
        const defaultTextBlock = availableBlocks.find(bl => bl.propertyType === DEFAULT_BLOCK_TYPE);
        if (availableBlocks.length && !blocksInUse.length) {
            setBlocksInUse([
                {
                    ...defaultTextBlock,
                    order: 0,
                    mode: "edit-mode" /* ContentBlockModes.EDIT */,
                    blockRef: React.createRef(),
                    key: 0,
                },
            ]);
        }
    }, [availableBlocks, blocksInUse.length]);
    const handleSubmit = () => {
        // create the beam
        console.log('create the beam');
    };
    const setFocusedBlock = (blockId) => {
        return;
    };
    return (React.createElement(Card, null,
        !availableBlocks.length && React.createElement("div", null, "No available blocks."),
        blocksInUse.map((blockData, idx) => (React.createElement(Card, { key: blockData.key, id: `${blockData.propertyType}-${idx}`, type: "plain", onClick: () => setFocusedBlock(blockData.key) },
            React.createElement(EditorBlockExtension, { propertyType: blockData.propertyType, appName: blockData.appName, blockRef: blockData.blockRef })))),
        React.createElement(React.Fragment, null,
            React.createElement(Button, { variant: "primary", customStyle: "flex place-self-end", label: 'Beam it', onClick: handleSubmit }))));
};
export default SimpleEditor;
//# sourceMappingURL=index.js.map