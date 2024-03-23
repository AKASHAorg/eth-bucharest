import React, { useCallback, useEffect, useState } from 'react';
import Button from '@akashaorg/design-system-core/lib/components/Button';
import Card from '@akashaorg/design-system-core/lib/components/Card';
import Text from '@akashaorg/design-system-core/lib/components/Text';
import { EditorBlockExtension } from '@akashaorg/ui-lib-extensions/lib/react/content-block/editor-block-extension';
import { useEditorBlocks } from './use-editor-blocks';
import { CreateBeamMutation } from '@akashaorg/typings/lib/sdk/graphql-operation-types-new';
import { useRootComponentProps, useGetLogin } from '@akashaorg/ui-awf-hooks';

type SimpleEditorProps = {
  onPublish?: (
    beamData: CreateBeamMutation['createAkashaBeam']['document']
  ) => void;
};

/**
 * A simplified editor example. For a more complete version see:
 * https://github.com/AKASHAorg/akasha-core/blob/next/ui/apps/akasha/src/extensions/beam-editor/beam-editor.tsx
 */

const SimpleEditor: React.FC<SimpleEditorProps> = ({ onPublish }) => {
  const { createBeam, errors, availableBlocks, blocksInUse } =
    useEditorBlocks();
  const [isPublishing, setIsPublishing] = useState(false);
  const [isPublished, setIsPublished] = useState(false);

  const { data } = useGetLogin();
  const authenticatedDID = data?.id;

  const { navigateToModal } = useRootComponentProps();
  const showLoginModal = (title?: string, message?: string) => {
    navigateToModal({
      name: 'login',
      title,
      message,
    });
  };

  const handleSubmit = useCallback(async () => {
    if (!authenticatedDID) {
      return showLoginModal(
        'Member Only Feature',
        'You need to connect first to be able to use this feature.'
      );
    }
    if (isPublishing) return;
    setIsPublishing(true);
    const beamData = await createBeam();
    setTimeout(() => {
      setIsPublished(true);
      onPublish?.(beamData);
    }, 250);
  }, [createBeam, isPublishing, authenticatedDID]);

  useEffect(() => {
    if (isPublishing && isPublished && !errors.length) {
      setTimeout(() => {
        setIsPublishing(false);
        setIsPublished(false);
      }, 1000);
    }
  }, [isPublished, isPublishing, errors]);

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
        {isPublishing && isPublished && errors.length == 0 && (
          <Text
            variant={'body2'}
            align={'start'}
            customStyle="flex place-self-start"
          >
            Beam created!
          </Text>
        )}
        <Button
          variant="primary"
          disabled={isPublishing}
          customStyle="flex place-self-end"
          label={isPublishing ? 'Beaming...' : 'Beam it'}
          onClick={handleSubmit}
        />
      </>
    </Card>
  );
};

export default SimpleEditor;
