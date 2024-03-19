import React from 'react';
import type { RootComponentProps } from '@akashaorg/typings/lib/ui';
import SimpleEditor from './simple-editor';
import { CreateBeamMutation } from '@akashaorg/typings/lib/sdk/graphql-operation-types-new';

const ExampleAppRoot: React.FC<RootComponentProps> = props => {

  const handleNewBeamPublished = (beamData: CreateBeamMutation['createAkashaBeam']['document']) => {
    console.log('new beam published:', beamData);
  }

  return (
    <div>
      <SimpleEditor onPublish={handleNewBeamPublished} />
    </div>
  );
};

export default ExampleAppRoot;
