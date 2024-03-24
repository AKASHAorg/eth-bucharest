import React from 'react';
import Stack from '@akashaorg/design-system-core/lib/components/Stack';
import BeamResolver from './beam-resolver';
import useIntersectionObserver from '@akashaorg/design-system-core/lib/utils/intersection-observer';
import Spinner from '@akashaorg/design-system-core/lib/components/Spinner';
import { GetBeamsQuery } from '@akashaorg/typings/lib/sdk/graphql-operation-types-new';

export type SimpleAntennaProps = {
  beams?: GetBeamsQuery['akashaBeamIndex']['edges'];
  loading?: boolean;
  handleFetchMore?: () => void;
};

const SimpleAntenna: React.FC<SimpleAntennaProps> = (props) => {
  const { beams, loading, handleFetchMore } = props;

  const loadMoreRef = React.createRef<HTMLDivElement>();
  useIntersectionObserver({
    target: loadMoreRef,
    onIntersect: handleFetchMore,
    threshold: 0,
  });

  return (
    <Stack direction="column" spacing="gap-4">
      {beams?.length > 0 &&
        beams?.map((edge, idx) => (
          <BeamResolver key={idx} beamId={edge.node?.id} />
        ))}
      <Stack padding="p-2" ref={loadMoreRef} />
      {loading && <Spinner />}
    </Stack>
  );
};

export default SimpleAntenna;
