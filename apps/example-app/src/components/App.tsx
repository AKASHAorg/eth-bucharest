import React from 'react';
import type { RootComponentProps } from '@akashaorg/typings/lib/ui';
import SimpleEditor from './simple-editor';
import { CreateBeamMutation } from '@akashaorg/typings/lib/sdk/graphql-operation-types-new';
import { useGetBeamsQuery } from '@akashaorg/ui-awf-hooks/lib/generated/apollo';
import SimpleAntenna from './simple-antenna';
import Stack from '@akashaorg/design-system-core/lib/components/Stack';
import { SortOrder } from '@akashaorg/typings/lib/sdk/graphql-types-new';

const ExampleAppRoot: React.FC<RootComponentProps> = (props) => {
  const handleNewBeamPublished = (
    beamData: CreateBeamMutation['createAkashaBeam']['document']
  ) => {
    console.log('new beam published:', beamData);
    handleFetchLatestPublished();
  };

  const { data, loading, error, fetchMore } = useGetBeamsQuery({
    variables: { first: 5, sorting: { createdAt: SortOrder.Desc } },
  });

  const beams = React.useMemo(() => {
    return data?.akashaBeamIndex?.edges || [];
  }, [data]);

  const handleFetchLatestPublished = () => {
    fetchMore({
      variables: {
        before: beams[0]?.cursor,
        first: 1,
      },
    });
  };

  const handleFetchMore = () => {
    fetchMore({
      variables: {
        after: data?.akashaBeamIndex?.pageInfo?.endCursor,
      },
    });
  };

  return (
    <Stack direction="column" spacing="gap-4">
      <SimpleEditor onPublish={handleNewBeamPublished} />
      <SimpleAntenna
        beams={beams}
        loading={loading}
        handleFetchMore={handleFetchMore}
      />
    </Stack>
  );
};

export default ExampleAppRoot;
