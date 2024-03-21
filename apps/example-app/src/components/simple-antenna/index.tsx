import React from 'react';
import Stack from '@akashaorg/design-system-core/lib/components/Stack';
import BeamResolver from './beam-resolver';
import { useGetBeams } from './use-get-beams';
import useIntersectionObserver from '@akashaorg/design-system-core/lib/utils/intersection-observer';

export type SimpleAntennaProps = {};

const SimpleAntenna: React.FC<SimpleAntennaProps> = () => {
  const { beams, fetchInitialData, fetchNextBatch } = useGetBeams();
  React.useEffect(() => {
    fetchInitialData();
  }, []);

  const loadMoreRef = React.createRef<HTMLDivElement>();

  useIntersectionObserver({
    target: loadMoreRef,
    onIntersect: fetchNextBatch,
    threshold: 0,
  });

  return (
    <Stack direction="column" spacing="gap-4" customStyle="overflow-auto">
      {beams.length > 0 &&
        beams.map((edge, idx) => (
          <BeamResolver key={idx} beamId={edge.node?.id} />
        ))}
      <Stack padding="p-2" ref={loadMoreRef} />
    </Stack>
  );
};

export default SimpleAntenna;
