import React from 'react';
import type { RootComponentProps } from '@akashaorg/typings/lib/ui';
import SimpleEditor from './simple-editor';
import { CreateBeamMutation } from '@akashaorg/typings/lib/sdk/graphql-operation-types-new';
import SimpleAntenna from './simple-antenna';
import Stack from '@akashaorg/design-system-core/lib/components/Stack';

const ExampleAppRoot: React.FC<RootComponentProps> = (props) => {
  const handleNewBeamPublished = (
    beamData: CreateBeamMutation['createAkashaBeam']['document']
  ) => {
    console.log('new beam published:', beamData);
  };

  return (
    <Stack direction="column" spacing="gap-4">
      <SimpleEditor onPublish={handleNewBeamPublished} />
      <SimpleAntenna />
    </Stack>
  );
};

export default ExampleAppRoot;
