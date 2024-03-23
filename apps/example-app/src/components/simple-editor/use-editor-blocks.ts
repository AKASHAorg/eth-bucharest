import React, { useCallback, useLayoutEffect, useState } from 'react';
import {
  BlockInstanceMethods,
  ContentBlockModes,
  ContentBlockRootProps,
} from '@akashaorg/typings/lib/ui';
import { useRootComponentProps } from '@akashaorg/ui-awf-hooks';
import getSDK from '@akashaorg/awf-sdk';

const DEFAULT_BLOCK_TYPE = 'text-block';

export const useEditorBlocks = () => {
  const { getExtensionsPlugin } = useRootComponentProps();
  const [errors, setErrors] = useState<string[]>([]);

  const availableBlocks = React.useMemo(
    () => getExtensionsPlugin().contentBlockStore.getInfos(),
    [getExtensionsPlugin]
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
    const defaultTextBlock = availableBlocks.find(
      (bl) => bl.propertyType === DEFAULT_BLOCK_TYPE
    );
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

  const createBeam = useCallback(async () => {
    const sdk = getSDK();
    if (blocksInUse.length) {
      try {
        const blk = await blocksInUse[0].blockRef.current?.createBlock({
          nsfw: false,
        });
        const response = await sdk.services.gql.client.CreateBeam({
          i: {
            content: {
              content: [{ blockID: blk.response.blockID, order: 0 }],
              active: true,
              createdAt: new Date().toISOString(),
            },
          },
        });
        setBlocksInUse([]);
        return response.createAkashaBeam.document;
      } catch (err) {
        setErrors([err.message]);
      }
    }
  }, [blocksInUse, setBlocksInUse, setErrors]);

  return {
    availableBlocks,
    blocksInUse,
    createBeam,
    errors,
  };
};
