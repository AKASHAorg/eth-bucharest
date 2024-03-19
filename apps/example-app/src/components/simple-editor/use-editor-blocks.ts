import React, { useLayoutEffect } from 'react';
import {BlockInstanceMethods, ContentBlockModes, ContentBlockRootProps} from '@akashaorg/typings/lib/ui';
import {useRootComponentProps} from '@akashaorg/ui-awf-hooks';

const DEFAULT_BLOCK_TYPE = 'text-block';

export const useEditorBlocks = () => {
  const { getExtensionsPlugin } = useRootComponentProps();

  const availableBlocks = React.useMemo(
    () => getExtensionsPlugin().contentBlockStore.getInfos(),
    [getExtensionsPlugin],
  );

  const [blocksInUse, setBlocksInUse] = React.useState<
    (ContentBlockRootProps['blockInfo'] & {
      appName: string;
      blockRef: React.RefObject<BlockInstanceMethods>;
      key: number;
      status?: 'success' | 'pending' | 'error';
      response?: { blockID: string; error?: string };
      disablePublish?: boolean;
    })[]
  >([]);

  useLayoutEffect(() => {
    const defaultTextBlock = availableBlocks.find(bl => bl.propertyType === DEFAULT_BLOCK_TYPE);
    if (availableBlocks.length && !blocksInUse.length) {
      setBlocksInUse([
        {
          ...defaultTextBlock,
          order: 0,
          mode: ContentBlockModes.EDIT,
          blockRef: React.createRef<BlockInstanceMethods>(),
          key: 0,
        },
      ]);
    }
  }, [availableBlocks, blocksInUse.length]);

  return {
    availableBlocks,
    blocksInUse
  }
}
