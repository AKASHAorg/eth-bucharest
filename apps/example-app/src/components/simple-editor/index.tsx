import React, { useLayoutEffect } from 'react';
import Button from '@akashaorg/design-system-core/lib/components/Button';
import Card from '@akashaorg/design-system-core/lib/components/Card';
import { EditorBlockExtension } from '@akashaorg/ui-lib-extensions/lib/react/content-block/editor-block-extension';
import { useRootComponentProps } from '@akashaorg/ui-awf-hooks';
import {
  type BlockInstanceMethods,
  ContentBlockModes,
  type ContentBlockRootProps,
} from '@akashaorg/typings/lib/ui';
import getSdk from '@akashaorg/awf-sdk';

type SimpleEditorProps = {};

/**
 * A simplified editor example. For a more complete version see:
 * https://github.com/AKASHAorg/akasha-core/blob/next/ui/apps/akasha/src/extensions/beam-editor/beam-editor.tsx
 */

const SimpleEditor: React.FC<SimpleEditorProps> = () => {
  const { getExtensionsPlugin } = useRootComponentProps();
  const DEFAULT_BLOCK_TYPE = 'text-block';
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

  const handleSubmit = async () => {
    const sdk = getSdk();
   if(blocksInUse.length) {
     const blk = await blocksInUse[0].blockRef.current?.createBlock({ nsfw: false });
     const beam = await sdk.services.gql.client.CreateBeam({
       i: {
         content: {
           content: [{blockID: blk.response.blockID, order: 0}],
           active: true,
           createdAt: new Date().toISOString(),
         }
       }
     })
     console.log(beam);
   }
  };

  return (
    <Card>
      {!availableBlocks.length && <div>No available blocks.</div>}
      {blocksInUse.map((blockData, idx) => (
        <Card
          key={blockData.key}
          id={`${blockData.propertyType}-${idx}`}
          type="plain"
        >
          <EditorBlockExtension
            propertyType={blockData.propertyType}
            appName={blockData.appName}
            blockRef={blockData.blockRef}
          />
        </Card>
      ))}
      <>
        <Button
          variant="primary"
          customStyle="flex place-self-end"
          label={'Beam it'}
          onClick={handleSubmit}
        />
      </>
    </Card>
  );
};

export default SimpleEditor;
